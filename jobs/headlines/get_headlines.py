"""Celery task for fetching news highlights."""

import json
import os

from newsapi.newsapi_client import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
from celery import Celery
from celery import Task
from celery.utils.log import get_task_logger


logger = get_task_logger(__name__)


class GetHeadlinesTask(Task):
  """Celery task to get headlines and save in the database."""

  name = 'get-headlines-task'

  def __init__(self):
    if os.getenv('ENVIRONMENT') == 'DEV':
      self.api_key = os.getenv('NEWS_API_KEY_DEV')
    else:
      self.api_key = os.getenv('NEWS_API_KEY_PROD')
    self.configure_news_api()
  
  def configure_news_api(self):
    """Configures the News API."""
    self.news_api = NewsApiClient(self.api_key)

  def run(self):
    headlines = self.get_headlines()
    print('Saving a copy of headlines...')
    return headlines

  def get_headlines(self, retry=False):
    """Celery task to get headlines and save in the database."""
    top_headlines_res = None
    try:
      top_headlines_res = self.news_api.get_top_headlines(
        country='in', page_size=100)
    except NewsAPIException as err:
      print('NewsAPI Exception==', err)
      if not retry:
        print('Retrying with another key...')
        self.api_key = os.getenv('NEWS_API_KEY_BACKUP')
        self.configure_news_api()
        top_headlines_res = self.get_headlines(retry=True)
      else:
        return None
    except Exception as err:
      print('Exception occurred==', err)
      return None
    headlines = {}
    if top_headlines_res and top_headlines_res['status'] == 'ok':
      headlines = top_headlines_res
    else:
      headlines = None
    return headlines

app = Celery('headlines.get_headlines', broker='amqp://')
app.config_from_object('jobs.headlines.celeryconfig')
headlines_task = app.register_task(GetHeadlinesTask())
headlines_task.delay()

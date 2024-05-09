"""Module for scheduling celery task to get headlines."""

from get_headlines import app
from get_headlines import GetHeadlinesTask


headlines_task = app.register_task(GetHeadlinesTask())
headlines_task.delay()

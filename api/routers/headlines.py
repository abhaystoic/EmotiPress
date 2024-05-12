import json
import os

from fastapi import APIRouter, Depends, HTTPException
from ..config.logger_config import logger
from ..dependencies import get_token_header

from pymongo import MongoClient


MONGO_USER = os.getenv('MONGO_USER')
MONGO_PWD = os.getenv('MONGO_PWD')
MONGODB_PORT = os.getenv('MONGODB_PORT')
MONGO_CONNECTION_STRING = (
  f'mongodb://{MONGO_USER}:{MONGO_PWD}@localhost:{MONGODB_PORT}')

router = APIRouter(
    prefix="/headlines",
    tags=["headlines"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get(
        "/",
        tags=["custom"],
        responses={403: {"description": "Operation forbidden"}})
async def read_headlines(page_num: int = 1):

  logger.info("Dummy Info")
  logger.error("Dummy Error")
  logger.debug("Dummy Debug")
  logger.warning("Dummy Warning")
  mongo_client = MongoClient(MONGO_CONNECTION_STRING)
  db = mongo_client.news
  collection = db['headline']
  total_docs = collection.count_documents({})
  logger.debug(f"total documents: {total_docs}")
  if (page_num > total_docs):
    results = {
      'records': [],
      'max_pages': total_docs,
    }
    return results
  
  record_index_as_per_page = page_num - 1
  records = [
    document for document in collection.aggregate(
      [
        {'$sort':{'date_done':-1}},
        {'$limit': page_num}
      ],
      allowDiskUse=True)][record_index_as_per_page]
  result = json.loads(records['result'])
  final_results = {
    'articles': result['articles'],
    'max_pages': total_docs,
    'created_time': records['date_done'],
  }
  return final_results
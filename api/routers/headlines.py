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
        "/{page_num}",
        tags=["custom"],
        responses={403: {"description": "Operation forbidden"}})
async def read_headlines(page_num: int = 1):

  logger.info("Dummy Info")
  logger.error("Dummy Error")
  logger.debug("Dummy Debug")
  logger.warning("Dummy Warning")
  mongo_client = MongoClient(MONGO_CONNECTION_STRING)
  db = mongo_client.news
  collection = db['headlines']
  total_docs = collection.count_documents({})
  print(total_docs, ' total documents.')
  print(f'page_num == {page_num}')
  current_page = int(page_num)
  if (current_page > total_docs):
    results = {
      'records': [],
      'max_pages': total_docs,
    }
    return results
  
  record_index_as_per_page = current_page - 1
  records = [
    document for document in collection.aggregate(
      [
        {'$sort':{'created_time':-1}},
        {'$limit': current_page}
      ],
      allowDiskUse=True)][record_index_as_per_page]
  final_results = {
    'created_time': records['created_time'],
    'articles': [],
  }
  for rec in records['news']:
    for article in rec['articles']:
      final_results['articles'].append(article)
  results = {
    'records': final_results,
    'max_pages': total_docs,
  }
  return results
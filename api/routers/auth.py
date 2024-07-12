import requests
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException

from ..config.logger_config import logger

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')

router = APIRouter(
  prefix="/auth",
  tags=["auth"],
  dependencies=[],
  responses={404: {"description": "Not found"}},
)

@router.get(
  "/login/",
  tags=["auth_login"],
  responses={403: {"description": "Operation forbidden"}})
async def auth_login(code:str = ''):
  token_url = "https://accounts.google.com/o/oauth2/token"
  data = {
      "code": code,
      "client_id": GOOGLE_CLIENT_ID,
      "client_secret": GOOGLE_CLIENT_SECRET,
      "redirect_uri": GOOGLE_REDIRECT_URI,
      "grant_type": "authorization_code",
  }
  response = requests.post(token_url, data=data)
  access_token = response.json().get("access_token")
  user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo", headers={"Authorization": f"Bearer {access_token}"})
  return user_info.json()
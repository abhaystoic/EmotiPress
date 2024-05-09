from typing import Annotated

from fastapi import FastAPI, Header, HTTPException

app = FastAPI()

async def get_token_header(x_token: Annotated[str, Header()] = "fake-super-secret-token"):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def get_query_token(token: str = "jessica"):
    if token != "jessica":
        raise HTTPException(status_code=400, detail="No Jessica token provided")

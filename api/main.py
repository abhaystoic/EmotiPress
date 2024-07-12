from asyncio import Queue, Task
import asyncio
import websockets

from contextlib import asynccontextmanager
from broadcaster import Broadcast
from fastapi import Depends, FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_until_first_complete

from .dependencies import get_query_token, get_token_header
from .internal import admin
from .routers import headlines, auth
from .config.logger_config import logger
from .config.web_sock import chatroom_ws_receiver, chatroom_ws_sender, broadcast

app = FastAPI(dependencies=[Depends(get_query_token)],
              on_startup=[broadcast.connect], 
              on_shutdown=[broadcast.disconnect])

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(headlines.router)
app.include_router(auth.router)
app.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_token_header)],
    responses={418: {"description": "I'm a teapot"}},
)


@app.get("/")
async def root():
    return {"message": "Hello FASTAPI APIs server!"}


@app.websocket("/ws/{room_id}")
async def websocket_chat(websocket: WebSocket, room_id: str):
    await websocket.accept()
    await run_until_first_complete(
        (chatroom_ws_receiver, {"websocket": websocket, "room_id": room_id}),
        (chatroom_ws_sender, {"websocket": websocket, "room_id": room_id}),
    )
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
from .routers import headlines
from .config.logger_config import logger
# from .config.web_socket_listener import Listener
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


# global_listener = Listener()


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # On startup of the application.
#     await global_listener.start_listening()
#     yield
#     # On shutdown of the application.
#     await global_listener.stop_listening()

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     '''Front End listens on this end point'''
#     await websocket.accept()
#     q: asyncio.Queue = asyncio.Queue()
#     await global_listener.subscribe(q=q)
#     try:
#         while True:
#             data = await q.get()
#             await websocket.send_text(data)
#     except WebSocketDisconnect:
#         return

# @app.websocket("/send_message")
# async def ws(websocket: WebSocket):
#     '''Send notifications to the subscribers using this end point.'''
#     await websocket.accept()
#     while True:
#         try:
#             data = await websocket.receive_text()
#             logger.debug(f'Received on server: {data}')
#             # await websocket.send_text(f'Server sent: {data}')
#             await global_listener.receive_and_publish_message(data)
#             # await asyncio.sleep(2)
#         except WebSocketDisconnect:
#             pass


@app.websocket("/ws/{room_id}")
async def websocket_chat(websocket: WebSocket, room_id: str):
    await websocket.accept()
    await run_until_first_complete(
        (chatroom_ws_receiver, {"websocket": websocket, "room_id": room_id}),
        (chatroom_ws_sender, {"websocket": websocket, "room_id": room_id}),
    )
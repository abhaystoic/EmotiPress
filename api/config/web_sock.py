from broadcaster import Broadcast
from fastapi import WebSocket

broadcast = Broadcast("redis://localhost:6379")

async def chatroom_ws_receiver(websocket: WebSocket, room_id: str):
  async for message in websocket.iter_text():
    await broadcast.publish(channel=f"chatroom_{room_id}", message=message)


async def chatroom_ws_sender(websocket: WebSocket, room_id: str):
  async with broadcast.subscribe(channel=f"chatroom_{room_id}") as subscriber:
    async for event in subscriber:
      await websocket.send_text(event.message)

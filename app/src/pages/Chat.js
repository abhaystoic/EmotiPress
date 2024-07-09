import { useEffect } from "react";

const Chat = () => {
  var ws = null;
  var ws_message = '';

  const title = 'Chat';

  useEffect(() => {
      document.title = title;
      ws = new WebSocket("ws://localhost:8000/ws");
      ws.onmessage = (event) => {
        console.log(event.data);
        ws_message = event.data;
      };
      ws.onopen = ()=> {
        ws.send("Received this msg from the ReactJS application");
      };
  }, []);
  let element = (
    <>
      <h1>{title}</h1>
      <div>Message: {ws_message}</div>
    </>
  );
  return element;
};

export default Chat;
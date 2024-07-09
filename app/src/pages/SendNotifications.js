import { useState } from "react";

const SendNotifications = () => {
  var room_id = 121;
  const [notifyInputs, setNotifyInputs] = useState({});

  const handleChange = (event) => {
    const notifyMsg = event.target.value;
    setNotifyInputs({'notifyMsg' : notifyMsg});
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Avoid reloading the page.
    
    var ws = new WebSocket(`ws://localhost:8000/ws/${room_id}`);
    ws.onopen = ()=> {
      ws.send(notifyInputs.notifyMsg);
    };
    ws.onmessage = (event) => {
      console.log("We got your message:", event.data);
    };
  }
  
  let element = (
    <>
      <h1>Notify</h1>
      <form onSubmit={handleSubmit}>
          <input type="text" id="messageText" name="messageText" onChange={handleChange} autoComplete="off"/>
          <button>Send</button>
      </form>
      <div>We sent: {notifyInputs.notifyMsg}</div>
    </>
  );
  return element;
};

export default SendNotifications;
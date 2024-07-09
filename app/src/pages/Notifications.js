import { useState, useEffect } from "react";

const Notifications = () => {

  const title = 'Notifications';
  useEffect(() => {
    document.title = title;
  });
  var ws = null;
  const [notifications, setNotifications] = useState([]);
  var room_id = 121;
  
  const webSock = new WebSocket(`ws://localhost:8000/ws/${room_id}`);
  webSock.addEventListener("open", (event) => {
    console.log("Connection established");
  });
  webSock.onmessage = (event) => {
    console.log("Message from server: ", event.data);
    console.log("notifications: ", notifications);
    setNotifications([...notifications, event.data]);
  };
  
  let element = (
    <>
      <h1>{title}</h1>
      <ul>
        {notifications.map((notif) => {
          return <li id="notif">{notif}</li>;
        })}
      </ul>
    </>
  );
  return element;
};

export default Notifications;
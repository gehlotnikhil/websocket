import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
function App() {
  const [socket, setSocket] = useState(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const newsocket = new WebSocket("ws://ws2-production.up.railway.app");
    newsocket.onopen = () => {
      console.log("Connected");
      setSocket(newsocket);
    };
    newsocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage(message.data);
    };
    console.log("socket = ",newsocket);

    return () => {
      // when component is unmounted and new one will make
      newsocket.close(); // we simply close the ws connection.
    };
  }, []);
  useEffect(() => {
    console.log(latestMessage);
  }, [latestMessage]);

  if (!socket) {
    return (
      <>
        <div>Connecting to the socket connection. Loading...</div>
      </>
    );
  }

  return (
    <>
      <h1>hello</h1>
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        Submit
      </button>
      hi- {latestMessage}
    </>
  );
}

export default App;

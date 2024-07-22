import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg" ;
import "./App.css";
function App() {
  const [socket, setSocket] = useState(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const newsocket = new WebSocket("wss://ws2-production.up.railway.app");
    // const newsocket = new WebSocket("ws://localhost:8080");
    newsocket.onopen = () => {
      console.log("Connected");
      setSocket(newsocket);
    };
    newsocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage((latestMessage)=>[...latestMessage,message.data]);
    };
    console.log("socket = ", newsocket);

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
     <div className = "comp1" >
      <div id="c1">
      <input type="text" name="" id="" onChange={(e) => {setMessage(e.target.value); }}  />
      <button onClick={() => { socket.send(message);}}>
        Submit
      </button>
      </div>
      </div>
     <div className = "comp1 para">
      {
      Array.isArray(latestMessage) && latestMessage.map((value)=>{
        return <p>{value}</p>
      })
      }
      </div>
    </>
  );
}

export default App;

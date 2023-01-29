import { useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';
import './App.css'

// const socket = io.connect("http://localhost:3001")
const socket = io.connect("https://chatapp-backend-d235.onrender.com")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showchat, setShowchat] = useState(false)

  const joinRoom = ()=>{
    if(username!=="" && room!==""){
      socket.emit("join_room",room)
      setShowchat(true)
    }
  }

  return (
    <div className='App'>
      {!showchat? <div className="joinChatContainer">

      <h3>Join a Chat</h3>
      <input type="text" placeholder='Name' onChange={(e)=>{setUsername(e.target.value)}}/>
      <input type="text" placeholder='Room Id' onChange={(e)=>{setRoom(e.target.value)}}/>
      <button onClick={joinRoom}>Join a Room</button>

      </div>:
      <Chat socket={socket} username={username} room={room}/>}
    </div>
  );
}

export default App;

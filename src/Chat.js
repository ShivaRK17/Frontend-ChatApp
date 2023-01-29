import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,username,room}) {
  const [currmessage, setCurrmessage] = useState("")
  const [msgList, setMsgList] = useState([])

  const sendMessage = async ()=>{
    if(currmessage!==""){
      const messData = {
        room:room,
        author:username,
        message:currmessage,
        time:new Date(Date.now()).getHours()+':'+((new Date(Date.now()).getMinutes().toString().length===1)?'0'+new Date(Date.now()).getMinutes():new Date(Date.now()).getMinutes())
      }
      await socket.emit("send_message",messData);
      setMsgList((list) => [...list, messData]);
      setCurrmessage("");
    }
  }

  useEffect(() => {
    socket.on("receive_message",(data)=>{
      // console.log(data);
      setMsgList((list) => [...list, data])
    })
  }, [socket])
  

  return (
    <div className='chat-window'>
    <div className="chat-header">
      <p>Live Chat</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className='message-container'>

      {msgList.map((msg)=>{
        return (
          <div className="message" id={username===msg.author?"other":"you"}>
            <div>
              <div className="message-content">
                <p>{msg.message}</p>
              </div>
              <div className="message-meta">
                <p id='author'>{msg.author}</p>
                <p id='time'>{msg.time}</p>
              </div>
            </div>
          </div>
        )
      })}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input type="text" placeholder='Write Something' onChange={(e)=>{setCurrmessage(e.target.value)}}  onKeyDown={(e)=>{e.key==="Enter" && sendMessage()}}/>
      <button onClick={sendMessage}>&rarr;</button>
    </div>
    </div>
  )
}

export default Chat
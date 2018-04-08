import React from 'react'
import Chat from './Chat'
import ActiveChat from './ActiveChat'
import { List, Menu } from 'semantic-ui-react'




const ChatList = (props) => {

  if (props.chats.length < 0) {
    return <div>Loading..</div>
  }
  return(

    <div className="chatList">

        {props.chats.map((chat) => {

          return <div style={{fontFamily:"Avenir", overflow:"auto", maxHeight: "200px", clear:"both", color:"#33475b"}}>

            <Chat chat={chat.chat}
              chatUser={chat.users.find((user) => {
                return user.id != props.user.user.id
              })}

               key={chat.chat.id} onClick={props.onClick} user={props.user} chats={props.chats} title={chat.chat.title} friends={props.friends} activeChat={props.activeChat} activeChatMessages={props.activeChatMessages} activeChatId={props.chatId} messageDraftListener={props.messageDraftListener} handleNewMessageSubmit={props.handleNewMessageSubmit}  />

          </div>

        })}


    </div>
  )
}

export default ChatList

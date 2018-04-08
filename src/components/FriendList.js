import React from 'react'
import Friend from './Friend'
import { Sidebar, Segment, Button, Menu, Icon, Accordian } from 'semantic-ui-react'




const FriendList = (props) => {
  console.log(props.chats)
  if (!props.friends || props.friends == []) {
    return <div>loading..</div>
  }
  return(
    <div className="friendList" style={{fontFamily:"Avenir"}}>


        {props.friends.map((b) => {
          console.log(b.id)
          return <Friend friend={b}

            key={b.id} user={props.user} friends={props.friends} addResponseToState={props.addResponseToState} handleCloseChat={props.handleCloseChat} handleNewMessageSubmit={props.handleNewMessageSubmit} fetchActiveChatInfo={props.fetchActiveChatInfo} updateActiveChat={props.updateActiveChat} activeChatMessages={props.activeChatMessages} activeChat={props.activeChat}/>
        })}

    </div>
  )
}

export default FriendList

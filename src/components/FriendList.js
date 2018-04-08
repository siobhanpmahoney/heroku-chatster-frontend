import React from 'react'
import Friend from './Friend'
import { Sidebar, Segment, Button, Menu, Icon, Accordian } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'



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

function mapStateToProps(state, props) {
  return {
    user: state.user.user,
    friends: state.user.friends,
    chats: state.user.chats,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendList));

import React from "react";
import FriendsContainer from './FriendsContainer';
import ChatsContainer from './ChatsContainer';
import ActiveChatContainer from './ActiveChatContainer'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter, Redirect } from 'react-router';
import { Grid, Header } from 'semantic-ui-react'
import LoginForm from './LoginForm'


//      Removed message form old newChatForm

// <span><button onClick={this.sendNewChat} style={{padding:"0.25em", marginLeft:"0.2em", color:"blue", fontSize:"0.75em", borderRadius:"8px", display:"inlineBlock"}}><i class="material-icons" style={{size:"0.75em"}}>send</i></button>
//
// <textarea type='text' placeholder='Type a message!...' name='messageContent' onChange={this.captureNewChatInfo} style={{width:"90%", minHeight: "80px", padding:"0.25em", borderRadius:"6px", display:"inlineBlock", float:"right"}} /> </span>


class UserPage extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      allUsers: [],
      activeChatMessages: [],
      activeChat: "",
      newChat: {}
    }
  }

  componentDidMount() {

    let allChats = this.props.chats
    this.setState({
      displayedChats: allChats,
      activeChat: "new"
    })
  }

  renderNewChatForm = () => {
    return <div className="newChatForm">
      <h3>Start a new chat!</h3>
      <form onSubmit={this.saveNewChat}>
        <label className="labelChooseFriend">Choose friend: <select name="user2" onChange={this.captureNewChatInfo}>
          <option value=''>Select...</option>
          {this.props.friends.map((friend => {
            return<option value={friend.id}>{friend.username}</option>
          }))}
        </select></label>

      <p><label className="labelChooseChatTitle">Title:
          <span className="newChatTitle"><input type='text' name='title' onChange={this.captureNewChatInfo} style={{  width: "75%"}} /></span>
        </label></p>

      <label>
      <input type="submit" value="Get chatting!" className="startNewChat" />
      </label>

      </form>
    </div>
  }

  captureNewChatInfo = (event) => {
    event.preventDefault()
    let value = event.target.value
    let name = event.target.name
    let user1 = {user1: this.props.user.id}
    let previousState = this.state.newChat
    let newChatState = Object.assign({}, previousState)
    let user1id = this.props.user.user.id.toString()
    newChatState['user1'] = user1id
    newChatState[name] = value
    this.setState({
      newChat: newChatState
    })

  }

///     NEED TO SEPAEATE CREATE NEW AND SEND NEW

// part 1 - save 2 chat

saveNewChat = (event) => {
  event.preventDefault()

  let nc = this.state.newChat

  this.props.createNewChat(nc)
}

//

  // sendNewChat = (event) => {
  //   event.preventDefault()
  //   let nc = this.state.newChat
  //   this.props.createNewChat(nc), this.locateAndRenderNewChat
  //   let allChats = this.props.chats
  //
  // }



  locateAndRenderNewChat = (event) => {
    event.preventDefault()


    console.log("hi")
  }



  //fetching chat archive from backend

  updateActiveChat = (selectChat) => {
    if (selectChat === "new") {
      this.setState({
        activeChat: "new"
      })
    } else {
      this.fetchActiveChatInfo(selectChat)
    }
  }


  fetchActiveChatInfo = (chat) => {
    fetch(`https://chatster-app-api.herokuapp.com/api/v1/chats/${chat.id}`)
    .then(response => response.json())
    .then(json => {

      this.setState({
        activeChatMessages: json.messages,
        activeChat: json.chat,
      })
    })

  }

  //sending new message to backend and returning updated backend data

  handleNewMessageSubmit = (event, chat, message) => {
    event.preventDefault()
    debugger
    let u = this.props.user

    let newMessage = {content: message, chat_id: chat.id, user_id: this.props.user.user.id, chat: chat}

    const url = 'https://chatster-app-api.herokuapp.com/api/v1/chats/' + this.state.activeChat.id +'/messages';

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        messages: {
          content: message,
          chat_id: chat.id,
          user_id: this.props.user.user.id,
          chat: chat
        }
      })
    })
    .then((response) => response.json())
    .then(json => {
      this.addResponseToState(json)
    })
  }

  addResponseToState = (json) => {
    let currentMessageState = this.state.activeChatMessages.slice()

    this.setState({
      activeChatMessages: [...currentMessageState, json[json.length-1]]
    })
  }

  handleCloseChat = (chat) => {
    let setChatState = []
    let messageState = this.state.activeChatMessages

    messageState.splice(0)

    this.setState({
      activeChatMessages: messageState,
      activeChat: setChatState
    })

  }


  render() {
    if (!this.props.user) {
      return (<Redirect to='/login' />)
    }
else
    return (
      <div>

        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>

            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={3} textAlign={"left"} style={{color:"#33475b"}}>
            {!!this.props.friends &&

              <FriendsContainer user={this.props.user} chats={this.props.chats} friends={this.props.friends} addResponseToState={this.addResponseToState} handleCloseChat={this.handleCloseChat} handleNewMessageSubmit={this.handleNewMessageSubmit} fetchActiveChatInfo={this.fetchActiveChatInfo} updateActiveChat={this.updateActiveChat} activeChatMessages={this.state.activeChatMessages} activeChat={this.state.activeChat} />

            }
          </Grid.Column>
          <Grid.Column width={4} style={{color:"#33475b"}}>
            {!!this.props.chats &&


              <div><ChatsContainer user={this.props.user}
                chats={this.props.chats} friends={this.props.friends} renderNewChatForm = {this.renderNewChatForm}
                addResponseToState={this.addResponseToState}
                handleCloseChat={this.handleCloseChat}
                handleNewMessageSubmit={this.handleNewMessageSubmit}
                fetchActiveChatInfo={this.fetchActiveChatInfo}
                updateActiveChat={this.updateActiveChat}
                activeChatMessages={this.state.activeChatMessages}
                activeChat={this.state.activeChat} /></div>

            }
          </Grid.Column>

          <Grid.Column width={9} textAlign={"left"} style={{color:"#33475b"}}>
            <div className="activeChatComponent">
              <ActiveChatContainer user={this.props.user} user={this.props.user} chat={this.state.activeChat} messages={this.state.activeChatMessages}  handleNewMessageSubmit={this.handleNewMessageSubmit} renderNewChatForm={this.renderNewChatForm} updateChat={this.updateActiveChat} handleCloseChat={this.handleCloseChat}/>
            </div>
          </Grid.Column>
        </Grid>
      </div>

    )
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));

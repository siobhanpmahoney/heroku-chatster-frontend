import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { Button, Comment, Form, Header, Label, Segment, Sticky, Icon, Feed, Grid, Select, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import "./lib/avatars/stevie.jpg"
import "./lib/avatars"


class ActiveChat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messageText: ""
    }
  }

  //     START new chat vs. existing chat

  renderChatType = () => {
    if (this.props.chat === "new") {
      return this.props.renderNewChatForm()
    } else {
      return this.renderExistingChat()
    }
  }

  renderExistingChat = () => {
    return (<div className="activeChatWindowContainer">
    <div className="topBar">
      <Sticky>
        <button onClick={this.closeChat} style={{borderRadius:"6px", color:"#33CBC6", borderColor:"#ebeff3"}}> x </button>
        <Header as='h3' dividing style={{margin: "0.5em", padding:"0.25em", fontFamily:"Avenir", fontWeight:"550", color:"#62B1C1"}}>{this.props.chat.title}</Header>
      </Sticky>
    </div>
    <div>
      <Comment.Group>
        <div className="messageHistory" scroll>{this.props.messages.sort((a,b)=> new Date(a.created_at) - new Date(b.created_at)).map((m) => {
            return(<Comment key={m.id} className="messageDisplay" >
            <Comment.Avatar float attached="right" as='a' src= './' + {m.avatar} />
            <Comment.Content>
              <Comment.Author as='a' style={{fontFamily:"Avenir", fontWeight:"550"}}>{m.username}</Comment.Author>
              <Comment.Metadata>{this.formattedDate(m.created_at)}</Comment.Metadata>
              <Comment.Text style={this.renderChat(m)}>{m.content}</Comment.Text>
            </Comment.Content>
          </Comment>)})}
        </div>
        <Comment>
          <Comment.Content>
            <Form inline reply></Form>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
    <Sticky>
      <div>
        <button onClick={this.messageSend} type='submit' style={{padding:"0.25em", marginLeft:"0.2em", color:"#FF5370", fontSize:"0.75em", borderRadius:"8px"}}><i class="material-icons" style={{size:"0.75em"}}>send</i></button>
        <textarea type='text' placeholder='Type a message!...' value={this.state.messageText} onChange={this.messageDraftListener} style={{fontFamily:"Avenir", width:"90%", margin:"0 0.5em 0.5em 0", minHeight: "75px", flexDirection: 'row', float:"right", padding:"0.25em", borderColor:"#BDBECB", borderRadius:"6px"}} />
      </div>
    </Sticky>
  </div>)
}


  //        Message functions

  messageDraftListener = (event) => {
    event.preventDefault()
    let draft = event.target.value
    this.setState({
      messageText: draft
    })
  }

  messageSend = (event) => {
    event.preventDefault()


    let chat = this.props.chat
    let message = this.state.messageText

    this.props.handleNewMessageSubmit(event, chat, message)
    this.setState({
      messageText: ""
    })

  }

  closeChat = (event) => {
    event.preventDefault()
    this.props.handleCloseChat(this.chat), this.renderNoChats
  }



  renderChat = (message) => {

    if (message.username == this.props.user.user.username) {
      return {
        padding:"0.5em",
        overflow:"auto",
        maxHeight: "400px",
        scrollBehavior: "smooth",
        fontFamily:"Avenir",
        borderRadius:"4px",
        background: "linear-gradient( #b3e7ed91, #b3e7ed66)",
        margin: "1em",
        color: "#33475b"
      }
    } else {
      return {
        padding:"0.5em",
        overflow:"auto",
        maxHeight: "400px",
        scrollBehavior: "smooth",
        fontFamily:"Avenir",
        borderRadius:"4px",
        background:"linear-gradient( #EBEFF3, #E8EEF4)",
        margin: "1em",
        color: "#33475b"
      }
    }
  }

  formattedDate = (dateSent) => {
    let today = new Date()
    let dateSaved = new Date(dateSent)
    if (today.toLocaleDateString() == dateSaved.toLocaleDateString()) {
      return `Today at ${dateSaved.toLocaleTimeString()}`
    } else {
      return `${dateSaved.toLocaleDateString()} at ${dateSaved.toLocaleTimeString()}`
    }
  }



render() {
  return (
  <div style={{fontFamily:"Avenir"}}>
    {this.renderChatType()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActiveChat));

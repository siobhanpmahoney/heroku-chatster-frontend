import React from 'react';
import ActiveChat from './ActiveChat'
import { ActionCable } from 'react-actioncable-provider'
import {withRouter} from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'



// (user, chats, friends,  addResponseToState)

class ActiveChatContainer extends React.Component {
  constructor(props) {
    super(props)


    }


  render() {

          return (
            <div className="activeChatContainer">
              <ActionCable channel={{channel: 'FeedChannel'}} onReceived={ () => {
                this.props.updateChat(this.props.chat)
                }
              } />
            { this.props.chat &&
            <ActiveChat chat={this.props.chat} user={this.props.user} chat={this.props.chat} messages={this.props.messages}  handleNewMessageSubmit={this.props.handleNewMessageSubmit} handleCloseChat={this.props.handleCloseChat} renderNewChatForm={this.props.renderNewChatForm}/> }
            </div>
          )
        }
    }


export default withRouter(ActiveChatContainer)

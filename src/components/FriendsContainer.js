import React from "react";
import FriendList from './FriendList';
import { Button, Menu, Header, Icon } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import {withRouter} from 'react-router-dom'


class FriendsContainer extends React.Component {

  render() {
    console.log(this.props.friends)
    return (

      <div className="friendsContainer">
        <Menu fluid vertical tabular="left">

          <Header
            as='h3'
            dividing
            style={{margin: "0.5em", padding:"0.25em", fontFamily:"Avenir", fontWeight:"575", color:"#718CA1"}}
            icon='users'
            content='Friends'
            />

        <FriendList friends={this.props.friends} chats={this.props.chats} user={this.props.user} addResponseToState={this.props.addResponseToState} handleCloseChat={this.props.handleCloseChat} handleNewMessageSubmit={this.props.handleNewMessageSubmit} fetchActiveChatInfo={this.props.fetchActiveChatInfo} updateActiveChat={this.props.updateActiveChat} activeChatMessages={this.props.activeChatMessages} activeChat={this.props.activeChat}/>
        </Menu>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendsContainer));

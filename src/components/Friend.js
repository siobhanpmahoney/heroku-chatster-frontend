import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import Chat from './Chat'
import { Menu, Dropdown } from 'semantic-ui-react'


class Friend extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const chats=this.props.chats.filter((chat) => {
      return chat.users.find((u) => {
        return u.id == this.props.friend.id
      })})
    if (this.props.chats.length > 0) {
    return(
      <div style={{fontFamily:"Avenir"}}>
        <Dropdown item text={this.props.friend.username} as="a" src={this.props.friend.avatar} name='friend' style={{fontFamily:"Avenir", fontWeight:"525", color:"#7590AC"}}>
          <Dropdown.Menu>
            {chats.map((chat) => {

              return <Dropdown.Item onClick={()=>this.props.updateActiveChat(chat.chat)} data-id={chat.chat.id}>
              {chat.chat.title}
              </Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )} else {
      return <div style={{fontFamily:"Avenir"}}>
              <Dropdown item text={this.props.friend.username} as="a" src={this.props.friend.avatar} name='friend' onClick={()=>this.props.updateActiveChat("new")} style={{fontFamily:"Avenir", fontWeight:"525", color:"#7590AC"}}>
              </Dropdown>
            </div>
    }
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

export default (connect(mapStateToProps, mapDispatchToProps)(Friend));

import React from 'react'
import ActiveChat from './ActiveChat.js'
import { List, Menu, Image } from 'semantic-ui-react'

  class Chat extends React.Component {
    constructor(props) {
      super(props)
    }

    style = () => {
      if (this.props.chat.id == this.props.activeChat.id) {
        return {fontSize:"0.9em", margin:"1em 0", color:'#7590AC', float:"left", width:"100%", display:"inlineBlock", background:"linear-gradient(to bottom right, #b3e7ed66, #85C8C5)"}
      } else {
        return {color:'#7590AC', margin:"0.25em 0",fontSize:"0.9em", width:"100%", float:"left", display:"inlineBlock"}
      }
    }

    render() {
      if (!this.props.chatUser) {
        return <div></div>
      }

      return (

        <div style={{fontFamily:"Avenir", width:"100%", display:"inlineBlock", float:"left", color:'#7590AC'}}>
          <Menu.Item size='large' style={this.style()} onClick={()=>this.props.onClick(this.props.chat)} data-id={this.props.key}>
            <List style={{width:"100%"}}>
              <List.Item style={{float:"left"}}>
                <Image avatar src={this.props.chatUser.avatar} style={{float:"left"}}/>
                <List.Content>
                  <List.Header style={{float:"left", color:"#7590AC", fontSize:"13px", fontFamily:"Avenir"}}>{this.props.title}</List.Header><br />
                  <List.Description style={{float:"left"}}>{this.props.chatUser.username}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Menu.Item>






    </div>
  )
}
}
export default Chat

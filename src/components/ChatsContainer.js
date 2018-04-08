import React from "react";
import ChatList from './ChatList'
import ActiveChatContainer from './ActiveChatContainer'
import { Grid, Menu, Input, Header, Label, Icon, Dropdown} from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'


class ChatsContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeChatMessages: [],
      activeChat: [],
      chatSearch: "",
      sortSelection: ""
    }
  }




  searchFieldListener = (event) => {
    console.log(event.target.value)
    let searchV = event.target.value

    this.setState({
      chatSearch: searchV
    })
  }

  filterChats = () => {
    let filteredChats = []

    let workingChats = this.sortChats()

    if (this.state.chatSearch == "") {
      filteredChats = workingChats
    } else {
      let sv = this.state.chatSearch
      workingChats.map((chat) => {
        return chat.messages.map((message) => {
          if (message.content.includes(sv) && !filteredChats.includes(chat)) {
            filteredChats.push(chat)
          }})
      })}
    return filteredChats
  }

  chooseSort = (event, { name, value }) => {
    event.preventDefault()

    this.setState({ sortSelection: value })



    console.log("bye")
    //
    // this.setState({
    //   sortSelection: choice
    // })
  }




  sortChats = () => {
    console.log(this.state)

    let chats = []
    if (this.state.sortSelection == 'friend') {
      this.props.chats.sort((a,b) => {
        if (!!a && !!b) {
          let uNMEa = this.userNotMe(a)
          let uNMEb = this.userNotMe(b)
          console.log(uNMEa)
          console.log(uNMEb)
          return uNMEa.username.localeCompare(uNMEb.username)
        }
      })}
      else if (this.state.sortSelection == 'recentMessage') {
      return this.props.chats.sort((a,b) => {
        let aDate = new Date(a.messages[a.messages.length-1].created_at).valueOf()
        let bDate = new Date(b.messages[b.messages.length-1].created_at).valueOf()
        return bDate - aDate
      })
    } else if (this.state.sortSelection == 'conversationDate') {
      return this.props.chats.sort((a,b) => {

        let aDate = new Date(a.chat.created_at).valueOf()
        let bDate = new Date(b.chat.created_at).valueOf()
        return aDate - bDate
      })
    }
    else {
      return this.props.chats
    }
  }

  //helper methods

  userNotMe = (someChat) => {
    console.log(someChat)
    let correctUser = someChat.users.find((u) => u.id != this.props.user.user.id)
    if (!!correctUser && !!correctUser.username) {
      console.log(correctUser)
      console.log(correctUser.username)

      return correctUser
    }
  }

  render() {

    if (!this.props.user) {
      return<div>loading..</div>
    }

    const chats = this.filterChats()
    const sortOptions = [{text: "Recent Message", value: "recentMessage"}, {text: "Date Created", value: "conversationDate"}]
    return (
      <div className="chatsContainer">
        <Menu compact icon='labeled' fluid vertical tabular='left' align='left' style={{flexDirection:"left", margin:"0.5em", padding:"0.1em"}}>

          <Header
            as='h3'
            dividing
            style={{margin: "0.5em", padding:"0.25em", fontFamily:"Avenir", fontWeight:"550", color:"#718CA1", clear:"both"}}
            icon='conversation'>Chats <button style={{borderRadius:"6px", color:"#33CBC6", borderColor:"#ebeff3"}} onClick={()=>this.props.updateActiveChat("new")}> + </button></Header>



          <Grid>

          <div style={{width:"100%", marginLeft:"-1em", color:"#33475b", fontSize:"15px",fontFamily: "Calibri", display:"inline", flexDirection:"row", padding:"0.75em 0", marginBottom:"0.5em", marginTop:"0.25em", clear:"both", justifyContent: "center", borderLeft:"none", borderRight:"none", background:"linear-gradient( #EBEFF3, #E8EEF4)"}}>

            <Menu.Item style={{margin:"0.5em, 0", padding:"0.25em 0 1.5em 0"}}>
            <Dropdown
              button
              className='icon'
              borderless
              placeholder="Sort by.."
              labeled
              align='left'
              icon='sort content ascending'
              options={sortOptions}
              search
              onChange={this.chooseSort}
              style={{fontSize:"14px", fontWeight: "380", fontFamily:"Avenir", margin:"0.5em, 0", display:"inline", color:"#62B1C1", backgroundColor:"white", flexDirection:"column", float:"left"}}

            />
        </Menu.Item><br />


      <form style={{display:"inline", color:"#33CBC6"}}>
            <label style={{display:"inline", verticalAlign:"text-bottom"}}>
              <i class="material-icons" style={{display:"inline", verticalAlign:"text-bottom", margin:"0.1em", padding:"0.1em", color:"#33CBC6"}}>search</i>
          <input type="text" placeholder="Search Chats..." onChange={this.searchFieldListener} style={{borderRadius:"6px", margin:"0.25em", color:"#33CBC6", border:"0.25em", width:"80%", height:"30px", fontFamily:"Avenir", fontSize:"14px"}} /></label></form>

</div>
</Grid>






            <ChatList chats={chats} user={this.props.user} onClick={this.props.updateActiveChat}  activeChat={this.props.activeChat} activeChatMessages={this.props.activeChatMessages} activeChatId={this.props.chatId} messageDraftListener={this.messageDraftListener} handleNewMessageSubmit={this.props.handleNewMessageSubmit} />


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

  export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Label, Icon } from 'semantic-ui-react'


const link = {
  width: '100px',
  paddingTop: '1em',
  paddingBottom: '1em',
  paddingLeft: '0.75em',
  paddingRight: '0.75em',
  marginTop: '1em',
  marginBottom: '1em',
  marginLeft: '0.75em',
  marginRight: '0.75em',
  color: '#718CA1',
  fontSize: '14px',
  alignText: "right",
  textDecoration: "none",
  borderRadius: "6px"
}

class NavBar extends React.Component {

  renderHTML = () => {
    if (!!this.props.user) {
      console.log(this.props.user)
      return (

        <span style={{padding:"1em", margin:"1em"}}>

          <span style={{float:"right", style:"inline"}}>

            <NavLink to="/" exact style={link} activeStyle={{ color:"white", textDecoration:"none"}}>
              <Label as='a' image style={{background:"#FCFDFD"}}>
                <img src= {this.props.user.user.avatar} style={{fontSize:"14px", padding:"0.1em"}}/>
                <span style={{fontSize:"14px", fontFamily:"Avenir", color:"#FF5370", background:"#FCFDFD"}}>{this.props.user.user.username}</span>

              </Label></NavLink>

            <NavLink to="/find-new-friends" exact style={link} activeStyle={{ color:"white", textDecoration:"none"}}>
                <Label as='a' style={{background:"#FCFDFD"}}>
                   <Icon name='users' style={{fontSize:"14px", padding:"0.1em", color: "#33CBC6"}}/>

                  <span style={{fontSize:"14px", fontFamily:"Avenir", color:"#718ca1", background:"#FCFDFD"}}>Find New Friends</span>

                </Label></NavLink>

              <NavLink onClick={this.props.logOutUser} to="/logout" exact style={link} activeStyle={{color:"white", textDecoration:"none"}}> Log Out </NavLink>
            </span>
          </span>
        )

      } else {
        return (
          <span style={{float:"right", style:"inline", margin:"1em"}}>
          <NavLink
            to="/login"
            exact
            style={link}
            activeStyle={{
              backgroundColor:'#7FE6E1', color:"white", textDecoration:"none"
            }}>Log In</NavLink>
        </span>
        )
      }
    }

  render() {
    return (
      <div className="navbar" style={{padding:"0.75em", height:"120px"}}>
        <div>{this.renderHTML()}</div>
        <div style={{fontSize:"48px", fontWeight:"600", fontFamily:"Avenir", style:"inline", marginTop:"0.5em", padding:"0.25em", alignment:"center", position:"relative"}}>Chatster<span className="logoPeriod">.</span></div>

      </div>)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

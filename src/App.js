import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions'

import UserPage from './components/UserPage'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import NavBar from './components/NavBar'
import FindNewFriendsContainer from './components/FindNewFriends/FindNewFriendsContainer'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: { user: null, loggingIn: true },
      user: {},
      friends: [],
      chats: []
    }
  }

  setLoggedInUser = (user) => {
     localStorage.setItem('token', user.token)
     this.setState({
       auth: {
         user: {
           username: user.username,
           id: user.id
         },
         loggingIn: false
       }
     })
     this.props.loadCurrentUser(this.state.auth.user)

   }

   logOutUser = () => {
     localStorage.removeItem('token')
     this.setState({
       auth: { user: null, loggingIn: false }
     })
     window.location = `/login`
   }

   componentDidMount() {
    const token=localStorage.getItem('token')
    if (token) {
      return fetch("https://chatster-app-api.herokuapp.com/api/v1/current_user", {
        headers:  {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: token
        }})
        .then(response => response.json())
        .then(user => {
          if(user) {
            this.setState({
              auth: {
                user: user
              },
              loggingIn: false
            }); this.props.loadCurrentUser(this.state.auth.user)
          }

          else {
            this.setState({
              auth: {
                user: null,
                loggingIn: false
              }
            })
          }
        })
      }
  }


  // findOrCreateUser = (event) => {
  //   event.preventDefault()
  //   let username = event.target.childNodes[0].value
  //
  //   fetch('https://chatster-app-api.herokuapp.com/api/v1/users',
  //   {
  //     method: 'post',
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Accepts': 'application/json'
  //   },
  //     body: JSON.stringify({username: username})
  //   })
  //   .then(function(response) {
  //     return response.json()
  //   })
  //   .then(json => {
  //     this.addResponseToState(json)
  //   })
  // }
  //
  // addResponseToState = (json) => {
  //   this.setState({
  //     user: json.user,
  //     friends: json.friends,
  //     chats: json.chats
  //   })
  // }

  render() {
    console.log("in app")

    return (
      <Router>
        <div className="App">
          <NavBar loggedIn = {this.state.auth.user} user={this.props.user} logOutUser = {this.logOutUser} />

          <Route exact path="/login" render={() => <LoginForm setLoggedInUser={this.setLoggedInUser} /> } />

          <Route exact path="/logout" render={() => <Logout /> } />

          <Route exact path="/" render={() => <UserPage user={this.props.user} friends={this.props.friends} chats={this.props.chats} addResponseToState={this.addResponseToState} /> } />

        <Route exact path="/find-new-friends" render={() => <FindNewFriendsContainer /> } />
        </div>
      </Router>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter, Redirect } from 'react-router';


class LoginForm extends React.Component {
  static propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    }
  }

  componentDidUpdate(prevProps) {
  }

  formListener = (event) => {
    let value = event.target.value
    let name = event.target.name
    let currentCredState = Object.assign({},this.state.credentials)
    currentCredState[name] = value
    this.setState({
      credentials: currentCredState
    })
    console.log(this.state)
  }

  loginUser = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')

    return fetch("https://chatster-app-api.herokuapp.com/api/v1/login", {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(response => response.json())
    .then(res => {
      if (res.error) {
        alert(res.error)
      }
      else {

        this.props.setLoggedInUser(res)
        this.props.history.push('/')
      }
    })
  }

  signUpUser = (event) => {
  event.preventDefault()
  fetch("https://chatster-app-api.herokuapp.com/api/v1/signup", {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
    },
    body: JSON.stringify({user: this.state.credentials})
  })
    .then(res => res.json())
    .then(resp => {
      if (resp.error) {
        alert(resp.error)
      } else {
        window.location = `/`
        this.props.setLoggedInUser(resp)
      }
    })
    }

  render() {
    console.log(this.props)
    return (
      <div className="login">
        <h2 style={{weight:"750", color:"#718ca1", paddingTop:"0.75em"}}>Log In</h2>
      <form>
      <input type="text" name="username" onChange={this.formListener} placeholder="username"/>
      <input type="password" name="password" onChange={this.formListener} placeholder="password" />
      <button className="buttons" onClick={this.loginUser}>Login</button>
      </form>


      <h2 style={{weight:"750", color:"#718ca1", paddingTop:"0.75em"}}>New User? Sign Up!</h2>
<form>
  <input type="text" name="username" onChange={this.formListener} placeholder="username" />
  <input type="password" name="password" onChange={this.formListener} placeholder="password" />
  <input type="password" name="password_confirmation" onChange={this.formListener} placeholder="password confirmation" />
  <button className="buttons" onClick={this.signUpUser} style={{backgroundColor:"#21d8f8", color:"white", padding:"0.5em", fontFamily: "Avenir", borderRadius:"6px", borderStyle:"none"}}>Sign Up</button>
</form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));

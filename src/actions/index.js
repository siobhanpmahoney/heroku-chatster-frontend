export const CURRENT_USER = 'CURRENT_USER'
export const ADD_NEW_CHAT = 'ADD_NEW_CHAT'
export const ADD_NEW_FRIEND = 'ADD_NEW_FRIEND'


export function loadCurrentUser(user) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/${user.id}`)
    .then(response => response.json())
    .then(json => dispatch({
      type: CURRENT_USER,
      user: json,
      friends: json.friends,
      chats: json.chats,
    }))
  }
}

export function addNewFriend(currentUser, friend) {
  return(dispatch) => {
    fetch('http://localhost:3000/api/v1/friendships', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        current_user_id: currentUser.id,
        friend_id: friend.id
      })
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: ADD_NEW_FRIEND,
      friends: json.friends,
      new_friend: friend
    }))
  }
}

export function createNewChat(newChat) {
  return(dispatch) => {
    fetch('http://localhost:3000/api/v1/chats', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: newChat.title,
        user1: newChat.user1,
        user2: newChat.user2,
        // messageContent: newChat.messageContent
      })
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: ADD_NEW_CHAT,
      newChat: json,
      user: newChat.user1.id
    }))
  }
}

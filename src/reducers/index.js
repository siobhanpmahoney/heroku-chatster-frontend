import { combineReducers } from 'redux';
import { CURRENT_USER, ADD_NEW_FRIEND, ADD_NEW_CHAT } from '../actions'

const user = (state = {user: null, friends: [], chats: [], users: [] }, action) => {
  switch(action.type) {
    case CURRENT_USER:
    state = Object.assign({},
      state,
      {
        user: action.user,
        friends: action.friends,
        chats: action.chats,
      }
    );
      return state;

    case ADD_NEW_FRIEND:
    debugger
      let currentFriends = state.friends
      let addedFriend = action.friends.find((f) => {
        return f.id == action.new_friend.id
      })
      console.log("currentFriends", currentFriends)
      console.log("newFriendList", action.friends)



      state = Object.assign({},
      state,
    {
      friends: [...currentFriends, addedFriend]
    })
      console.log(state)
      return state;

    case ADD_NEW_CHAT:
      let currentChats = state.chats
      state = Object.assign({},
        state,
        {
          chats: [...currentChats, action.newChat]
        }
      )
      console.log(state)
      return state;

    default:
      return state;
  }

}

const rootReducer = combineReducers({
  user,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;

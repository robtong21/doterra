import { ADD_POST, FETCH_POSTS, FETCH_SELECTED_POST } from '../constants'

const initialState = {
  newPost: {},
  posts: [],
  selectedPost: {},
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case ADD_POST:
      newState.newPost = action.post
      break
    case FETCH_POSTS:
      newState.posts = action.posts
      break
    case FETCH_SELECTED_POST:
      newState.selectedPost = action.selectedPost
      break
    default:
      return state
  }
  return newState
}

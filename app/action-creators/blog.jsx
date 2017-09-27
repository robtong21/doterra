import axios from 'axios'

import {browserHistory} from 'react-router'
import { ADD_POST, FETCH_POSTS, FETCH_SELECTED_POST } from '../constants'

export const add = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export const fetch = (posts) => {
  return {
    type: FETCH_POSTS,
    posts
  }
}

export const fetchOne = (selectedPost) => {
  return {
    type: FETCH_SELECTED_POST,
    selectedPost
  }
}

export const addPost = newPost => dispatch => {
  axios.post('/api/blog', newPost)
  .then(res => dispatch(add(res.data)))
  // .catch(err => console.error(`Creating blog post: ${newPost} unsuccessful`, err))
}

export const getPosts = () => dispatch => {
  axios.get('/api/blog')
  .then(res => dispatch(fetch(res.data)))
  .catch(err => console.error('Fetching blog posts unsuccessful', err))
}

export const getPostById = postId => {
  return dispatch => {
    axios.get(`/api/blog/${postId}`)
      .then(res => dispatch(fetchOne(res.data)))
      .catch(err => console.error('Fetching selected blog post unsuccessful', err))
  }
}

// export const getSelectedPost = () => dispatch => {
//   axios.get('/api/blog/:postId')
//   .then(res => dispatch(fetchOne(res.data)))
//   .catch(err => console.error('Fetching selected blog post unsuccessful', err))
// }

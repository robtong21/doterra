import React from 'react'
import { connect } from 'react-redux'
import Blog from '../components/Blog'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    posts: state.blog.posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const BlogContainer = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default BlogContainer

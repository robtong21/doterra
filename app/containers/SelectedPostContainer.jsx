import React from 'react'
import { connect } from 'react-redux'
import SelectedPost from '../components/SelectedPost'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    selectedPost: state.blog.selectedPost,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SelectedPostContainer = connect(mapStateToProps, mapDispatchToProps)(SelectedPost)

export default SelectedPostContainer

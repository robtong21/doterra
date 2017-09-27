import React from 'react'
import axios from 'axios'
import { hashHistory } from 'react-router'

const SelectedPost = (props) => {
  const post = props.selectedPost
  return (
    <div className="container-fluid products-bkg">
      <div className="page">
        <h3>{post.title}</h3>
        <img src={post.imgUrl}/>
        <p>{post.content}</p>
        { /* post.tags ? <p>Tagged under: {post.tags.split(',')}</p> : <p></p> */ }
      </div>
    </div>
  )
}

export default SelectedPost

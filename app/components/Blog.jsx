import React from 'react'
import axios from 'axios'
import { hashHistory, Link } from 'react-router'

export default class Blog extends React.Component {
  render() {
    return (
      <div className="container-fluid products-bkg blog">
        <ul className="list-unstyled">
        <h3 className="text-white script-font">Blog</h3>
        <div className="page">
          <span>
            <form>
            <input type="text" name="search" />
            <button type="submit">Search</button>
            </form>
          </span>
          {
            this.props.posts.map(post => {
              return (
                <li key={post.id} className="group margin-top">
                  <Link to={`/blog/${post.id}`}><img src={post.imgUrl} className="float padding-right" /><h3>{post.title}</h3><p>{post.excerpt}</p></Link>
                </li>
              )
            })
          }
          </div>
        </ul>
      </div>
    )
  }
}

// class ShowPost extends React.Component {
//   render() {
//     return (
//         <div className="list-group">
//           <a href="#" className="list-group-item active">
//             <h4 className="list-group-item-heading">List group item heading</h4>
//             <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
//           </a>
//           <a href="#" className="list-group-item">
//             <h4 className="list-group-item-heading">List group item heading</h4>
//             <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
//           </a>
//           <a href="#" className="list-group-item">
//             <h4 className="list-group-item-heading">List group item heading</h4>
//             <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
//           </a>
//         </div>
//     )
//   }
// }

// class AddPost extends React.Component {
//   constructor(props) {
//     super(props)
//     this.handleTitleChange = this.handleTitleChange.bind(this)
//     this.handleSubjecChange = this.handleSubjectChange.bind(this)
//     this.state = {
//       title: '',
//       subject: ''
//     }
//   }

//   handleTitleChange(e) {
//     this.setState({title: e.target.value})
//   }

//   handleSubjectChange(e) {
//     this.setState({body: e.target.value})
//   }

//   addPost() {
//     axios.post('/addPost', {
//       title: this.state.title,
//       subject: this.state.subject
//     })
//     .then(response => {
//       console.log('response from add post is ', response)
//       hashHistory.push('/')
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   }

//   render() {
//     return (
//       <div className="col-md-5">
//         <div className="form-area">
//             <form role="form">
//             <br styles="clear:both" />
//               <div className="form-group">
//                 <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
//               </div>

//               <div className="form-group">
//               <textarea className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
//               </div>

//             <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
//             </form>
//         </div>
//       </div>
//     )
//   }
// }

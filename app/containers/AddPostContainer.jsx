import { connect } from 'react-redux'
import AddPost from '../components/AddPost'

const mapStateToProps = (state) => {
  console.log("state in AddPostContainer:", state)
  return {
    posts: state.posts,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleAddPost: (post) => {
//       dispatch(addPost(post))
//     }
//   }
// }

const AddPostContainer = connect(mapStateToProps, null)(AddPost)

export default AddPostContainer

import React from 'react'
import store from '../store'
import request from 'superagent'
import Dropzone from 'react-dropzone'
import { addPost } from '../action-creators/blog'

const CLOUDINARY_UPLOAD_PRESET = 'img-tn'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/robtong21/upload'

export default class AddPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadedFileCloudinaryUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const post = {
      name: evt.target.name.value,
      email: evt.target.email.value,
      title: evt.target.title.value,
      excerpt: evt.target.excerpt.value,
      content: evt.target.content.value,
      status: evt.target.status.value,
      tags: [evt.target.tags.value],
      imgUrl: this.state.uploadedFileCloudinaryUrl,
    }
    console.log("hello!")
    store.dispatch(addPost(post))
    evt.target.name.value = ''
    evt.target.email.value = ''
    evt.target.title.value = ''
    evt.target.excerpt.value = ''
    evt.target.content.value = ''
    evt.target.status.value = ''
    evt.target.tags.value = ''
    this.setState({
      uploadedFileCloudinaryUrl: ''
    })
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }

  render() {
    return (
      <div className="container-fluid products-bkg blog">
        <div className="margin-left">
          <h3 className="text-white script-font">Add a Post</h3>
          <div className="page">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="col-sm-2 control-label">Author Name</label>
                <div className="col-sm-10">
                  <input name="name" type="text" className="form-control"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="col-sm-2 control-label">Author Email</label>
                <div className="col-sm-10">
                  <input name="email" type="text" className="form-control"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="title" className="col-sm-2 control-label">Post Title</label>
                <div className="col-sm-10">
                  <input name="title" type="text" className="form-control"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content" className="col-sm-12 col-md-12 col-lg-12 control-label">Content</label>
                <div className="w-100 p-3">
                  <textarea name="content"></textarea>
                </div>
              </div>

              <div>
                <Dropzone
                className='dropzone'
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <span>Drag & drop an image or click to select a file to upload.</span>
                </Dropzone>
                <span>
                  {this.state.uploadedFileCloudinaryUrl === '' ? null
                  : <span>{this.state.uploadedFile.name}<img src={this.state.uploadedFileCloudinaryUrl} /></span>
                }
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="status" className="col-sm-2 control-label">Status</label>
                <div className="col-sm-10">
                  <select name="status">
                  <option>open</option>
                  <option>closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tags" className="col-sm-2 control-label">Tags</label>
                <div className="col-sm-10">
                  <input name="tags" type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="excerpt" className="col-sm-12 col-md-12 col-lg-12 control-label">Excerpt</label>
                <div className="w-100 p-3">
                  <textarea name="excerpt" className="excerpt"></textarea>
                </div>
              </div>

              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

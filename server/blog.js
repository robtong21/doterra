'use strict'

const db = require('APP/db')

const Post = db.model('post')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

function generateError(message, status) {
  const err = new Error(message)
  err.status = status
  return err
}

module.exports = require('express').Router({mergeParams: true})
.get('/search', (req, res, next) => {
  Post.findByTag(req.query.search
  .then(posts => {
    res.json(posts)
  })
  .catch(next)
  )
})
.get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) => {
      console.log('req.session', req.session)
      return Post.findAll({order: 'id ASC'})
        .then(posts => res.json(posts))
        .catch(next)
    })
.post('/',
  (req, res, next) => {
    let newPost
    return Post.create(req.body)
    .then(post => res.status(201).json(post))
    .catch(next)
  })
.get('/:id', (req, res, next) =>
  Post.find({
    where: {id: req.params.id},
  })
  .then(post => res.json(post))
  .catch(next))
.put('/:id', (req, res, next) => {
  let savedPost
  return Post.find({
    where: {id: req.params.id},
  })
  .then(post => post.update(req.body))
  .then(updatedPost => {
    savedPost = updatedPost
    return savedPost
  })
  .then(post => savedPost)
  .then(post => res.json(post))
  .catch(next)
})
// GET /api/wiki/(dynamic value)
.get('/:urlTitle', (req, res, next) => {
  Post.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      { model: User, as: 'author' }
    ]
  })
  .then(post => {
    if (post === null) {
      throw generateError('No post found with this title', 404)
    } else {
      res.json(post)
    }
  })
  .catch(next)
})
.delete('/:id', (req, res, next) =>
  Post.destroy({
    where: {id: req.params.id}
  })
  .then(deleted =>
    res.sendStatus(202))
  .catch(next)
)

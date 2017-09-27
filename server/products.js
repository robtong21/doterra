'use strict'

const db = require('APP/db')

const Product = db.model('product')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router({mergeParams: true})
  .get('/landing', (req, res, next) =>
    Product.findAll({
      limit: 8,
      order: 'id DESC'
    })
    .then(products => res.json(products))
    .catch(next)
  )
  .get('/singleOils', (req, res, next) =>
    Product.findAll({
      where: {
        type: 'Single oil',
      }
    })
    .then(products => res.json(products))
    .catch(next)
  )
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
      return Product.findAll({order: 'id ASC'})
        .then(products => res.json(products))
        .catch(next)
    })
  .post('/',
    (req, res, next) => {
      let newProduct
      return Product.create(req.body)
      .then(product => {
        newProduct = product
        return newProduct
      })
      .then(product => res.status(201).json(product))
      .catch(next)
    })

  .get('/:id',
    (req, res, next) =>
      Product.find({
        where: {id: req.params.id},
        include: [
          { model: User, as: 'Customer' }
        ]
      })
      .then(product => res.json(product))
      .catch(next))

  .put('/:id', (req, res, next) => {
    let savedProduct
    return Product.find({
      where: {id: req.params.id},
      include: [
        { model: User, as: 'Customer' }
      ]
    })
    .then(product => product.update(req.body))
    .then(updatedProduct => {
      savedProduct = updatedProduct
      return savedProduct
    })
    .then(product => savedProduct)
    .then(product => res.json(product))
    .catch(next)
  })
  .delete('/:id', (req, res, next) =>
    Product.destroy({
      where: {id: req.params.id}
    })
    .then(deleted =>
      res.sendStatus(202))
    .catch(next)
  )

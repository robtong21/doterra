'use strict'

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017/blog'

module.exports = {
  signup: function(name, email, password) {
    MongoClient.connect(url, function(err, db) {
      console.log('connected')
    })
  }
}

'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, BOOLEAN, VIRTUAL} = require('sequelize')

module.exports = db => db.define('users', {
  name: {
    type: STRING,
    allowNull: false
  },
  photo: {
    type: STRING,
    // defaultValue: '/img/default-photo.jpg'
    defaultValue: 'http://i.imgur.com/3BrMZK8.png'
  },
  phone: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
    unique: true
  },
  // password: STRING,
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  },
  googleId: {
    type: STRING
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    attributes: {exclude: ['password_digest']}
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    }
  }
})

module.exports.associations = (User, {OAuth, Product, Cart}) => {
  User.hasOne(OAuth)
  Product.hasMany(User)
  User.hasOne(Cart)
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}

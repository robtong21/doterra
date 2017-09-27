'use strict'

const {STRING, TEXT, INTEGER, ARRAY, ENUM, FLOAT} = require('sequelize')
const marked = require('marked')

module.exports = db => {
  const Post = db.define('post', {
    title: {
      type: STRING,
      allowNull: false
    },
    urlTitle: {
      type: STRING,
      allowNull: false,
      // since we are searching, editing, deleting by urlTitle, these need to be unique
      unique: true
    },
    excerpt: {
      type: TEXT,
    },
    content: {
      type: TEXT,
      allowNull: false
    },
    imgUrl: {
      type: STRING,
    },
    status: {
      type: ENUM('open', 'closed')
    },
    tags: {
      type: ARRAY(STRING),
      defaultValue: [],
      set: function(tags) {
        tags = tags || []

        if (typeof tags === 'string') {
          tags = tags.split(',').map(function(str) {
            return str.trim()
          })
        }

        this.setDataValue('tags', tags)
      }
    }
  }, {
    getterMethods: {
      route: function() {
        return '/blog/' + this.urlTitle
      },
      renderedContent: function() {
        return marked(this.content)
      }
    },
    classMethods: {
      findByTag: function(tag) {
        return this.findAll({
          where: {
            tags: {
              $contains: [tag]
            }
          }
        })
      }
    },
    instanceMethods: {
      findSimilar: function() {
        return Post.findAll({
          where: {
            id: {
              $ne: this.id
            },
            tags: {
              $overlap: this.tags
            }
          }
        })
      }
    }
  })

  Post.hook('beforeValidate', function(post) {
    if (post.title) {
      post.urlTitle = post.title.replace(/\s/g, '_').replace(/\W/g, '')
    } else {
      post.urlTitle = Math.random().toString(36).substring(2, 7)
    }
  })

  return Post
}

// This adds methods to 'Post', such as '.setAuthor'. It also creates a foreign key attribute on the Post table pointing ot the User table

module.exports.associations = (Post, {User}) => {
  Post.belongsTo(User, {
    as: 'author'
  })
}

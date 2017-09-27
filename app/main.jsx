'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import { Link, Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import axios from 'axios'
import store from './store'
import Login from './components/Login'
import Logout from './components/Logout'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import { logout } from './action-creators/login'
import { fetch, fetchOne, getPosts, getPostById } from './action-creators/blog'
import { getProducts, getHomeProducts } from './action-creators/products'
import BlogContainer from './containers/BlogContainer'
import LoginContainer from './containers/LoginContainer'
import AddPostContainer from './containers/AddPostContainer'
import LandingContainer from './containers/LandingContainer'
import SingleOilsContainer from './containers/SingleOilsContainer'
import SelectedPostContainer from './containers/SelectedPostContainer'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/">Essential Oils Help</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="dropdown">
                  <button className="dropbtn nav-link">Products</button>
                  <div className="dropdown-content">
                    <Link to="/singleoils" className='nav-link-dark'>Single oils</Link>
                    <Link to='/proprietary' className='nav-link-dark'>Proprietary blends</Link>
                    <Link to='/onguard' className='nav-link-dark'>dōTERRA On Guard® Products</Link>
                    <Link to='/onguard' className='nav-link-dark'>dōTERRA Breathe® Products</Link>
                    <Link to='/onguard' className='nav-link-dark'>Deep Blue® Products</Link>
                    <Link to='/onguard' className='nav-link-dark'>DigestZen® Products</Link>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">Blog</Link>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link js-scroll-trigger">About</a>
              </li>
              <li className="nav-item">
                <a href="/team" className="nav-link js-scroll-trigger">Team</a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link js-scroll-trigger">Contact</a>
              </li>
              <li className='nav-item'>
                {user ? <a href="/profile" className='nav-link'><span className="split hello">Hello, {user.name}</span><span className="split account">Account</span></a> : <a href='/login' className='nav-link'>Login</a>}
              </li>
              <li className='nav-item'>
                {user ? <Logout/> : null}
              </li>
              <li>
                {user ? <a href={`/cart/${user.id}`}><span className='fa fa-shopping-cart fa-3x'></span></a> : <a href={`/cart`}><span className='fa fa-shopping-cart fa-3x'></span></a>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
)

const fetchHomeProducts = () => {
  axios.get('/api/products/landing')
  .then(res => res.data)
  .then(products => {
    store.dispatch(getHomeProducts(products))
  })
}

const fetchSingleOilProducts = () => {
  axios.get('/api/products/singleOils')
  .then(res => res.data)
  .then(products => {
    store.dispatch(getProducts(products))
  })
}

const fetchPosts = () => {
  axios.get('/api/blog')
  .then(res => {
    console.log('posts in onEnter', res)
    store.dispatch(fetch(res.data))
  })
}

const fetchSelectedPost = (nextRouterState) => {
  const postId = nextRouterState.params.postId
  console.log('here!!!')
  store.dispatch(getPostById(postId))
}

// const fetchSelectedPost = () => {
//   axios.get('/api/blog/:postId')
//   .then(res => {
//     console.log('selected post in onEnter', res)
//     store.dispatch(fetchOne(res.data))
//   })
// }

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={fetchHomeProducts}>
        <IndexRedirect to="/landing" />
        <Route path="/landing" component={LandingContainer} />
        <Route path="/singleoils" component={SingleOilsContainer} onEnter={fetchSingleOilProducts} />
        <Route path="/blog" component={BlogContainer} onEnter={fetchPosts} />
        <Route path="/blog/:postId" component={SelectedPostContainer} onEnter={fetchSelectedPost} />
        <Route path="/post-new" component={AddPostContainer} />
        <Route path="/login" component={LoginContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

import React from 'react'
import { browserHistory, Link } from 'react-router'
// import { login } from '../reducers/auth'

// export const Login = ({ login }) => (
//   <form onSubmit={evt => {
//     evt.preventDefault()
//     login(evt.target.username.value, evt.target.password.value)
//   } }>
//     <input name="username" className="usernameInput" />
//     <input name="password" className="passwordInput" type="password" />
//     <input type="submit" value="Login" />
//   </form>
// )'

// import { getUser } from '../action-creators/login'

const message = 'Log in'

const Login = ({ login }) => (
  <div className="signin-container container-fluid auth-bkg">
    <div className="buffer local">
      <form onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.email.value, evt.target.password.value)
        browserHistory.push(`/singleoils`)
      }}>
        <div className="form-group">
          <label>email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
            <label>password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
        </div>
        <button type="submit" className="btn btn-block btn-primary">{message}</button>
      </form>
    </div>
    <div className="or buffer">
      <div className="back-line">
        <span>OR</span>
      </div>
    </div>
    <div className="buffer oauth">
      <p>
        <a
          target="_self"
          href="/api/auth/google"
          className="btn btn-social btn-google">
          <i className="fa fa-google" />
          <span className="padding-left-1">{message} with Google</span>
        </a>
      </p>
    </div>
  </div>
)

// export const Login = ({ login }) => (
//   <form className='form-inline navbar-form' onSubmit={evt => {
//     evt.preventDefault()
//     login(evt.target.username.value, evt.target.password.value)
//     browserHistory.push(`/singleoils`)
//   } }>
//     <div className='form-inline navbar-form'>
//       <input className='form-control login-form' placeholder='email address' name="username" />
//       <input className='form-control login-form' placeholder='password' name="password" type="password" />
//       <input className='btn btn-success' type="submit" value="Login" />
//       <Link to='/signup'><button className='btn'>Sign Up</button></Link>
//     </div>
//   </form>
// )

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)

// export default Login

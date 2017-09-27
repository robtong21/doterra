import React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../action-creators/login'
import Login from '../components/Login'

const mapStateToProps = () => ({ message: 'Log in' })
const mapDispatchToProps = dispatch => {
  return {
    verify: (email, password) => {
      dispatch(getUser(email, password))
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer

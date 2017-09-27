import React from 'react'
import { connect } from 'react-redux'
import SingleOils from '../components/SingleOils'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    list: state.products.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SingleOilsContainer = connect(mapStateToProps, mapDispatchToProps)(SingleOils)

export default SingleOilsContainer

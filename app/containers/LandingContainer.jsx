import React from 'react'
import { connect } from 'react-redux'
import Landing from '../components/Landing'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    list: state.products.list,
    landing: state.products.landing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default LandingContainer

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  admin: require('./admin').default,
  auth: require('./auth').default,
  blog: require('./blog').default,
  cart: require('./cart').default,
  products: require('./products').default,
})

export default rootReducer

import { FETCH_PRODUCTS, FETCH_HOME_PRODUCTS } from '../constants'

const initialState = {
  list: [],
  landing: [],
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_PRODUCTS:
      newState.list = action.products
      break
    case FETCH_HOME_PRODUCTS:
      newState.landing = action.homeProducts
      break
    default:
      return state
  }
  return newState
}

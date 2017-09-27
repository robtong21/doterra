import axios from 'axios'

import {browserHistory} from 'react-router'
import { FETCH_PRODUCTS, FETCH_HOME_PRODUCTS } from '../constants'

export const fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

export const fetchHomeProducts = homeProducts => ({
  type: FETCH_HOME_PRODUCTS,
  homeProducts
})

export const getProducts = userId => {
  return dispatch => {
    axios.get(`/api/products`)
    .then(res => {
      console.log('products', res.data)
      console.log('heyooooo!')
      dispatch(fetchProducts(res.data))
    })
  }
}

export const getHomeProducts = userId => {
  return dispatch => {
    axios.get(`/api/products/landing`)
    .then(res => {
      console.log('homeProducts', res.data)
      dispatch(fetchHomeProducts(res.data))
    })
  }
}

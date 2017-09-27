import { ADMIN_LOGGED_IN } from '../constants'

const adminLogged = bool => ({type: ADMIN_LOGGED_IN, bool})

export const adminLogin = (isAdmin) => dispatch => {
  dispatch(adminLogged(isAdmin))
}

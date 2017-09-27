import { ADMIN_LOGGED_IN } from '../constants'

export default function reducer(adminStatus = false, action) {
  switch (action.type) {
    case ADMIN_LOGGED_IN:
      return action.bool
    default: return adminStatus
  }
}

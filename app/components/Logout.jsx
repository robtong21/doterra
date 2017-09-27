import React from 'react'

export const Logout = ({ user, logout }) => (
  <div>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(Logout)

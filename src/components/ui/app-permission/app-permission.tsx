import * as React from 'react'

import AppPermissionAsyncContainer from './app-permission-async-container'
import AppPermissionWithConnect from './app-permission-content'

const AppPermission = ({ afterClose }) => {
  return (
    <AppPermissionAsyncContainer>
      <AppPermissionWithConnect afterClose={afterClose} />
    </AppPermissionAsyncContainer>
  )
}

export default AppPermission

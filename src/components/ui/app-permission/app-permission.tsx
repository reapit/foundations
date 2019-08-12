import * as React from 'react'

import AppPermissionAsyncContainer from './app-permission-async-container'
import AppPermissionWithConnect from './app-permission-content'

const AppPermission = () => {
  return (
    <AppPermissionAsyncContainer>
      <AppPermissionWithConnect />
    </AppPermissionAsyncContainer>
  )
}

export default AppPermission

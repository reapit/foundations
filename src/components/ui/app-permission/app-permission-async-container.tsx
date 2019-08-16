import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, FormState } from '@/types/core'
import AsyncContainer from '@/components/ui/async-container'

export const mapStateToProps = (state: ReduxState) => {
  const { loading, error, appPermissionData } = state.appPermission

  return {
    loading,
    error,
    data: appPermissionData
  }
}

const AppPermissionAsyncContainer = connect(mapStateToProps)(AsyncContainer)
AppPermissionAsyncContainer.displayName = 'AppPermissionAsyncContainer'

export default AppPermissionAsyncContainer

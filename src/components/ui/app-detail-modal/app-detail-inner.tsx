import * as React from 'react'
import { connect } from 'react-redux'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { ReduxState } from '@/types/core'
import AppDetail from '@/components/ui/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppPermission from '@/components/ui/app-permission'

export interface AppDetailInnerMappedProps {
  appDetailModalState: AppDetailModalState
  appDetailState: AppDetailState
}

const mapStateToProps = (state: ReduxState): AppDetailInnerMappedProps => ({
  appDetailModalState: state.appDetailModal,
  appDetailState: state.appDetail
})

export const AppDetailInner: React.FunctionComponent<AppDetailInnerMappedProps> = ({
  appDetailModalState,
  appDetailState
}) => {
  if (appDetailModalState === 'VIEW_DETAIL') {
    if (!appDetailState.appDetailData || !appDetailState.appDetailData.data) {
      return null
    }
    return <AppDetail data={appDetailState.appDetailData.data} />
  }

  if (appDetailModalState === 'VIEW_PERMISSION') {
    return <AppPermission />
  }

  return null
}

const AppDetailInnerWithConnect = connect(
  mapStateToProps,
  null
)(AppDetailInner)

export default AppDetailInnerWithConnect

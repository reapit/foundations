import * as React from 'react'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import Loader from '@/components/ui/loader'
import { appDetailRequestData } from '@/actions/app-detail'
import Alert from '@/components/ui/alert'
import AppDetail from './app-detail'

export interface AppDetailInnerProps {
  appDetailState: AppDetailState
}

export interface AppDetailModalMappedProps {
  appDetailState: AppDetailState
}

export interface AppDetailModalMappedActions {
  fetchAppDetail: (id: string) => void
}

export type AppDetailModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const AppDetailInner: React.FunctionComponent<AppDetailInnerProps> = ({ appDetailState }) => {
  if (appDetailState.loading) {
    return <Loader />
  }

  if (appDetailState.error) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!appDetailState.appDetailData) {
    return null
  }

  return <AppDetail data={appDetailState.appDetailData.data} />
}

const mapStateToProps = (state: ReduxState): AppDetailModalMappedProps => ({
  appDetailState: state.appDetail
})

const mapDispatchToProps = (dispatch: any): AppDetailModalMappedActions => ({
  fetchAppDetail: () => dispatch(appDetailRequestData('xxxx'))
})

const AppDetailInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetailInner)

export const AppDetailModal: React.FunctionComponent<AppDetailModalProps> = ({ visible = true, afterClose }) => {
  return (
    <Modal visible={visible} afterClose={afterClose}>
      <AppDetailInnerWithConnect />
    </Modal>
  )
}

export default AppDetailModal

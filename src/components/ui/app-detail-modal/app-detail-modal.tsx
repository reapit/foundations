import * as React from 'react'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { setAppDetailModalStateView } from '@/actions/app-detail-modal'
import { appInstallDone } from '@/actions/app-install'
import AppDetailInner from './app-detail-inner'
import AppDetailAsyncContainer from './app-detail-async-container'
import { FormState, ReduxState } from '@/types/core'

export interface ActionDetailModalMappedState {
  appInstallFormState: FormState
}

export interface ActionDetailModalMappedAction {
  setAppDetailModalStateView: () => void
  appInstallDone: () => void
}

export type AppDetailModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & ActionDetailModalMappedAction

const mapDispatchToProps = (dispatch: any): ActionDetailModalMappedAction => ({
  setAppDetailModalStateView: () => dispatch(setAppDetailModalStateView()),
  appInstallDone: () => dispatch(appInstallDone())
})

const mapStateToProps = (state: ReduxState): ActionDetailModalMappedState => ({
  appInstallFormState: state.appInstall.formState
})

export const AppDetailModal: React.FunctionComponent<AppDetailModalProps> = ({
  visible = true,
  afterClose,
  setAppDetailModalStateView,
  appInstallDone
}) => {
  return (
    <Modal
      visible={visible}
      afterClose={() => {
        if (afterClose) {
          afterClose()
          appInstallDone()
        }
        setAppDetailModalStateView()
      }}
    >
      <AppDetailAsyncContainer>
        <AppDetailInner />
      </AppDetailAsyncContainer>
    </Modal>
  )
}

const AppDetailModalWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetailModal)

export default AppDetailModalWithConnect

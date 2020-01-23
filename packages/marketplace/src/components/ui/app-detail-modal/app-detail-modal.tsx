import * as React from 'react'
import { Modal, ModalProps } from '@reapit/elements'
import { connect } from 'react-redux'
import { setAppDetailModalStateBrowse } from '@/actions/app-detail-modal'
import AppDetailInner from './app-detail-inner'
import AppDetailAsyncContainer from './app-detail-async-container'

export interface ActionDetailModalMappedAction {
  setAppDetailModalStateBrowse: () => void
}

export type AppDetailModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & ActionDetailModalMappedAction

const mapDispatchToProps = (dispatch: any): ActionDetailModalMappedAction => ({
  setAppDetailModalStateBrowse: () => dispatch(setAppDetailModalStateBrowse()),
})

export const handleAfterClose = (setAppDetailModalStateBrowse: () => void, afterClose?: () => void) => () => {
  if (afterClose) {
    afterClose()
  }
  setAppDetailModalStateBrowse()
}

export const AppDetailModal: React.FunctionComponent<AppDetailModalProps> = ({
  visible = true,
  afterClose,
  setAppDetailModalStateBrowse,
}) => {
  return (
    <Modal visible={visible} afterClose={handleAfterClose(setAppDetailModalStateBrowse, afterClose)} renderChildren>
      <AppDetailAsyncContainer>
        <AppDetailInner afterClose={afterClose} />
      </AppDetailAsyncContainer>
    </Modal>
  )
}

const AppDetailModalWithConnect = connect(null, mapDispatchToProps)(AppDetailModal)

export default AppDetailModalWithConnect

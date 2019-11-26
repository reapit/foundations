import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import { Button, Modal, ModalProps, Loader, Alert, ModalBody, ModalHeader } from '@reapit/elements'
import AppDelete from '@/components/ui/app-delete'
import AppDetail from './app-detail'
import { withRouter, RouteComponentProps } from 'react-router'
import routes from '@/constants/routes'
import { developerRequestData } from '@/actions/developer'
import { Dispatch } from 'redux'

export interface DeveloperAppModalMappedProps {
  appDetailState: AppDetailState
  closeParentModal?: () => void
}

export interface DeveloperAppModalMappedAction {
  fetchDeveloperApps: (page: number) => void
}

export type DeveloperAppInnerProps = DeveloperAppModalMappedProps & DeveloperAppModalMappedAction & RouteComponentProps
export type DeveloperAppModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & RouteComponentProps

export const DeveloperAppModalInner: React.FunctionComponent<DeveloperAppInnerProps> = ({
  appDetailState,
  fetchDeveloperApps,
  closeParentModal,
  history
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)

  if (appDetailState.loading) {
    return <ModalBody body={<Loader />} />
  }

  if (appDetailState.error) {
    return <ModalBody body={<Alert type="danger" message="Failed to fetch. Please try later." />} />
  }

  if (!appDetailState.appDetailData) {
    return null
  }

  const { pendingRevisions, id, name } = appDetailState.appDetailData.data

  return (
    <>
      <AppDetail
        data={appDetailState.appDetailData.data}
        afterClose={closeParentModal as () => void}
        data-test="app-detail-modal"
        footerItems={
          <>
            <Button
              type="button"
              variant="secondary"
              dataTest="detail-modal-delete-button"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete App
            </Button>
            <Button
              type="button"
              variant="primary"
              dataTest="detail-modal-edit-button"
              onClick={() => history.push(`${routes.DEVELOPER_MY_APPS}/${id}/edit`)}
              disabled={pendingRevisions}
            >
              {pendingRevisions ? 'Pending Revision' : 'Edit Detail'}
            </Button>
          </>
        }
      />

      <AppDelete
        appId={id || ''}
        appName={name || ''}
        afterClose={() => setIsDeleteModalOpen(false)}
        visible={isDeleteModalOpen}
        onDeleteSuccess={() => {
          closeParentModal && closeParentModal()
          setIsDeleteModalOpen(false)
          fetchDeveloperApps(1)
        }}
      />
    </>
  )
}

interface DeveloperAppModalOwnProps {
  closeParentModal?: () => void
}

const mapStateToProps = (state: ReduxState, ownState) => ({
  appDetailState: state.appDetail,
  closeParentModal: ownState.closeParentModal
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDeveloperApps: (page: number) => dispatch(developerRequestData(page))
})

const DeveloperAppInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(DeveloperAppModalInner)

export const DeveloperAppModal: React.FunctionComponent<DeveloperAppModalProps> = ({
  visible = true,
  afterClose,
  history
}) => (
  <Modal visible={visible} afterClose={afterClose} renderChildren>
    <DeveloperAppInnerWithConnect closeParentModal={afterClose} history={history} />
  </Modal>
)

export default withRouter(DeveloperAppModal)

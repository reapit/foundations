import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import { Button, Modal, ModalProps, Loader, Alert, ModalBody, Level, LevelLeft, LevelRight } from '@reapit/elements'
import AppDelete from '@/components/ui/app-delete'
import AppDetail from './app-detail'
import { withRouter, RouteComponentProps } from 'react-router'
import routes from '@/constants/routes'
import { developerRequestData } from '@/actions/developer'
import { Dispatch } from 'redux'
import styles from '@/styles/blocks/developer-app-modal.scss?mod'
import AppInstallations from './app-installations/app-installations-modal'
import { removeAuthenticationCode } from '@/actions/app-detail'

export interface DeveloperAppModalMappedProps {
  appDetailState: AppDetailState
  closeParentModal?: () => void
  removeAuthenticationCode: () => void
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
  history,
  removeAuthenticationCode
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isInstallationsModalOpen, setIsInstallationsModalOpen] = React.useState(false)

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
          <Level className={styles.footer}>
            <LevelLeft>
              <Button
                type="button"
                variant="primary"
                dataTest="detail-modal-delete-button"
                onClick={() => setIsInstallationsModalOpen(true)}
              >
                Installations
              </Button>
            </LevelLeft>
            <LevelRight>
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
                onClick={() => {
                  removeAuthenticationCode()
                  history.push(`${routes.DEVELOPER_MY_APPS}/${id}/edit`)
                }}
                disabled={pendingRevisions}
              >
                {pendingRevisions ? 'Pending Revision' : 'Edit Detail'}
              </Button>
            </LevelRight>
          </Level>
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

      <AppInstallations
        appId={id || ''}
        appName={name || ''}
        visible={isInstallationsModalOpen}
        afterClose={() => setIsInstallationsModalOpen(false)}
        onUninstallSuccess={() => {
          closeParentModal && closeParentModal()
          setIsInstallationsModalOpen(false)
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
  fetchDeveloperApps: (page: number) => dispatch(developerRequestData({ page })),
  removeAuthenticationCode: () => dispatch(removeAuthenticationCode())
})

const DeveloperAppInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(DeveloperAppModalInner)

export interface DeveloperAppModalMappedActions {
  removeAuthenticationCode: () => void
}

export const DeveloperAppModal: React.FunctionComponent<DeveloperAppModalProps> = ({
  visible = true,
  afterClose,
  history
}) => {
  return (
    <Modal visible={visible} afterClose={afterClose} renderChildren>
      <DeveloperAppInnerWithConnect closeParentModal={afterClose} history={history} />
    </Modal>
  )
}

export default withRouter(DeveloperAppModal)

import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { removeAuthenticationCode } from '@/actions/app-detail'
import AppDelete from '@/components/ui/app-delete'
import AppInstallations from '@/components/ui/app-installations/app-installations-modal'
import DeveloperAppRevisionModal from '@/components/ui/developer-app-revision-modal'

import { Grid, GridItem, Button } from '@reapit/elements'
import routes from '@/constants/routes'
import { AppDetailState } from '@/reducers/app-detail'

export type DeveloperAppActionButtonsProps = {
  appDetailState: AppDetailState
}

export const handleEditDetailButtonClick = (history, dispatch: Dispatch<any>, id?: string) => {
  return () => {
    if (id) {
      dispatch(removeAuthenticationCode())
      history.push(`${routes.DEVELOPER_MY_APPS}/${id}/edit`)
    }
  }
}

export const handlenDeleteAppButtonClick = (setIsDeleteModalOpen: (isModalOpen: boolean) => void) => {
  return () => {
    setIsDeleteModalOpen(true)
  }
}

export const handlePendingRevisionButtonClick = (
  setIsAppRevisionComparisionModalOpen: (isModalOpen: boolean) => void,
) => {
  return () => {
    setIsAppRevisionComparisionModalOpen(true)
  }
}

export const handleInstallationButtonClick = (setIsInstallationsModalOpen: (isModalOpen: boolean) => void) => {
  return () => {
    setIsInstallationsModalOpen(true)
  }
}

const DeveloperAppActionButtons: React.FC<DeveloperAppActionButtonsProps> = ({ appDetailState }) => {
  const { appDetailData } = appDetailState
  const appId = appDetailData?.data.id || ''
  const appName = appDetailData?.data.name || ''
  const pendingRevisions = appDetailData?.data.pendingRevisions

  const history = useHistory()
  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isInstallationsModalOpen, setIsInstallationsModalOpen] = React.useState(false)
  const [isAppRevisionComparisionModalOpen, setIsAppRevisionComparisionModalOpen] = React.useState(false)

  const onInstallationButtonClick = React.useCallback(handleInstallationButtonClick(setIsInstallationsModalOpen), [])
  const onPendingRevisionButtonClick = React.useCallback(
    handlePendingRevisionButtonClick(setIsAppRevisionComparisionModalOpen),
    [],
  )
  const onEditDetailButtonClick = React.useCallback(handleEditDetailButtonClick(history, dispatch, appId), [
    history,
    dispatch,
    appId,
  ])
  const onDeleteAppButtonClick = React.useCallback(handlenDeleteAppButtonClick(setIsDeleteModalOpen), [])

  return (
    <>
      <Grid>
        <GridItem className="is-narrow">
          <Button variant="primary" type="button" onClick={onInstallationButtonClick}>
            Installation
          </Button>
        </GridItem>
        <GridItem>
          {pendingRevisions ? (
            <Button
              className="is-pulled-right ml-2"
              type="button"
              variant="primary"
              dataTest="detail-modal-edit-button"
              onClick={onPendingRevisionButtonClick}
            >
              Pending Revision
            </Button>
          ) : (
            <Button className="is-pulled-right ml-2" variant="primary" type="button" onClick={onEditDetailButtonClick}>
              Edit Detail
            </Button>
          )}

          <Button className="is-pulled-right" variant="danger" type="button" onClick={onDeleteAppButtonClick}>
            Delete App
          </Button>
        </GridItem>
      </Grid>

      <AppDelete
        appId={appId || ''}
        appName={appName || ''}
        afterClose={() => setIsDeleteModalOpen(false)}
        visible={isDeleteModalOpen}
        onDeleteSuccess={() => {
          setIsDeleteModalOpen(false)
        }}
      />

      <AppInstallations
        appId={appId || ''}
        appName={appName || ''}
        visible={isInstallationsModalOpen}
        afterClose={() => setIsInstallationsModalOpen(false)}
        onUninstallSuccess={() => {
          setIsInstallationsModalOpen(false)
        }}
      />

      <DeveloperAppRevisionModal
        visible={isAppRevisionComparisionModalOpen}
        appId={appId || ''}
        appDetailState={appDetailState}
        afterClose={() => setIsAppRevisionComparisionModalOpen(false)}
      />
    </>
  )
}

export default DeveloperAppActionButtons

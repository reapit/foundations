import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { removeAuthenticationCode } from '@/actions/app-detail'

import { Grid, GridItem, Button } from '@reapit/elements'
import routes from '@/constants/routes'
import { DeveloperAppDetailState } from '@/reducers/developer'

export type DeveloperAppDetailButtonGroupProps = {
  appDetailState: DeveloperAppDetailState
  setIsInstallationsModalOpen: (isVisible: boolean) => void
  setIsAppRevisionComparisionModalOpen: (isVisible: boolean) => void
  setIsDeleteModalOpen: (isVisible: boolean) => void
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

const DeveloperAppDetailButtonGroup: React.FC<DeveloperAppDetailButtonGroupProps> = ({
  appDetailState,
  setIsAppRevisionComparisionModalOpen,
  setIsDeleteModalOpen,
  setIsInstallationsModalOpen,
}) => {
  const { data } = appDetailState
  const appId = data?.id || ''
  const pendingRevisions = data?.pendingRevisions

  const history = useHistory()
  const dispatch = useDispatch()

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
  )
}

export default DeveloperAppDetailButtonGroup

import React from 'react'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { useDispatch, useSelector } from 'react-redux'
import { selectClientId } from '@/selector/client'
import DeveloperAppRevisionModal from '@/components/ui/developer-app-revision-modal/developer-app-revision-modal'
import AppDelete from '@/components/ui/app-delete'
import { Content, Button } from '@reapit/elements'
import { useHistory } from 'react-router'
import routes from '@/constants/routes'
import { History } from 'history'
import { Dispatch } from 'redux'
import { developerFetchAppDetail } from '@/actions/developer'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'

interface ManageAppProps {
  pendingRevisions: boolean
  appDetailState: DeveloperAppDetailState
  id: string
}

export const onAppDeleteModalAfterClose = (setVisible: (value: boolean) => void) => () => {
  setVisible(false)
}

export const onDeleteSuccess = (history: History) => () => {
  history.push(routes.APPS)
}

export const onCancelSuccess = ({
  id,
  clientId,
  dispatch,
}: {
  clientId: string
  id: string
  dispatch: Dispatch
}) => () => {
  dispatch(developerFetchAppDetail({ id, clientId }))
}

export const onDeveloperAppRevisionModalAfterClose = (setVisible: (value: boolean) => void) => () => {
  setVisible(false)
}

export const onPendingRevisionButtonClick = (setVisible: (value: boolean) => void) => () => {
  setVisible(true)
}

export const onEditDetailButtonClick = (history: History, id: string) => () => {
  history.push(`${routes.APPS}/${id}/edit`)
}

export const onDeleteAppButtonClick = (setVisible: (value: boolean) => void) => () => {
  setVisible(true)
}

export const DeveloperManageApp: React.FC<ManageAppProps> = ({ pendingRevisions, id, appDetailState }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAppRevisionComparisonModalOpen, setIsAppRevisionComparisonModalOpen] = React.useState(false)
  const { buttonGroup } = styles

  const clientId = useSelector(selectClientId)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Content className={buttonGroup}>
      {isDeleteModalOpen && (
        <AppDelete
          appId={id || ''}
          appName={appDetailState?.data?.name || ''}
          afterClose={onAppDeleteModalAfterClose(setIsDeleteModalOpen)}
          visible={isDeleteModalOpen}
          onDeleteSuccess={onDeleteSuccess(history)}
        />
      )}

      {isAppRevisionComparisonModalOpen && (
        <DeveloperAppRevisionModal
          onCancelSuccess={onCancelSuccess({
            dispatch,
            clientId,
            id,
          })}
          appDetailState={appDetailState}
          visible={isAppRevisionComparisonModalOpen}
          appId={id || ''}
          afterClose={onDeveloperAppRevisionModalAfterClose(setIsAppRevisionComparisonModalOpen)}
        />
      )}

      {pendingRevisions ? (
        <Button
          className="mb-2"
          type="button"
          variant="primary"
          dataTest="detail-modal-edit-button"
          fullWidth
          onClick={onPendingRevisionButtonClick(setIsAppRevisionComparisonModalOpen)}
        >
          PENDING REVISION
        </Button>
      ) : (
        <Button
          className="mb-2"
          type="button"
          variant="primary"
          dataTest="detail-modal-edit-button"
          fullWidth
          onClick={onEditDetailButtonClick(history, id)}
        >
          EDIT DETAILS
        </Button>
      )}

      <Button className="mb-2" onClick={onDeleteAppButtonClick(setIsDeleteModalOpen)} variant="danger" fullWidth>
        DELETE APP
      </Button>
    </Content>
  )
}

export default DeveloperManageApp

import React from 'react'
import AppRevisionModal from './app-revision-modal'
import AppDeleteModal from '@/components/pages/app-detail/app-delete-modal'
import { Content, Button } from '@reapit/elements'
import { useHistory } from 'react-router'
import routes from '@/constants/routes'
import { History } from 'history'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { buttonGroup } from './__styles__/app-detail'

interface AppManagementProps {
  pendingRevisions: boolean
  appDetailState: AppDetailState
  id: string
}

export const onAppDeleteModalAfterClose = (setVisible: (value: boolean) => void) => () => {
  setVisible(false)
}

export const onDeleteSuccess = (history: History) => () => {
  history.push(routes.APPS)
}

export const onAppRevisionModalAfterClose = (setVisible: (value: boolean) => void) => () => {
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

export const AppManagement: React.FC<AppManagementProps> = ({ pendingRevisions, id, appDetailState }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAppRevisionComparisonModalOpen, setIsAppRevisionComparisonModalOpen] = React.useState(false)
  const history = useHistory()

  return (
    <Content className={buttonGroup}>
      {isDeleteModalOpen && (
        <AppDeleteModal
          appId={id || ''}
          appName={appDetailState?.data?.name || ''}
          afterClose={onAppDeleteModalAfterClose(setIsDeleteModalOpen)}
          visible={isDeleteModalOpen}
          onDeleteSuccess={onDeleteSuccess(history)}
        />
      )}

      {isAppRevisionComparisonModalOpen && (
        <AppRevisionModal
          appDetailState={appDetailState}
          visible={isAppRevisionComparisonModalOpen}
          appId={id || ''}
          afterClose={onAppRevisionModalAfterClose(setIsAppRevisionComparisonModalOpen)}
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

export default AppManagement

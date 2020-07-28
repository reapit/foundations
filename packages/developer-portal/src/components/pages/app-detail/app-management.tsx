import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectClientId } from '@/selector/client'
import AppRevisionModal from './app-revision-modal'
import AppDeleteModal from '@/components/pages/app-detail/app-delete-modal'
import { Content, Button } from '@reapit/elements'
import { useHistory } from 'react-router'
import routes from '@/constants/routes'
import { History } from 'history'
import { Dispatch } from 'redux'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
import { fetchAppDetail } from '@/actions/apps'
import { AppDetailState } from '@/reducers/apps/app-detail'

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

export const onCancelSuccess = ({
  id,
  clientId,
  dispatch,
}: {
  clientId: string
  id: string
  dispatch: Dispatch
}) => () => {
  dispatch(fetchAppDetail({ id, clientId }))
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
  const { buttonGroup } = styles

  const clientId = useSelector(selectClientId)
  const dispatch = useDispatch()
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
          onCancelSuccess={onCancelSuccess({
            dispatch,
            clientId,
            id,
          })}
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

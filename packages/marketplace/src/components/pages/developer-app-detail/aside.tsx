import React from 'react'
import { Dispatch } from 'redux'
import standAloneAppDetailStyles from '@/styles/blocks/standalone-app-detail.scss?mod'
import { FaCheck } from 'react-icons/fa'
import routes from '@/constants/routes'
import { useHistory } from 'react-router'
import { History } from 'history'
import developerAppDetailStyles from '@/styles/pages/developer-app-detail.scss?mod'
import { RenderWithHeader } from './app-detail/render-with-header'
import { Button, FormSection } from '@reapit/elements'
import { convertBooleanToYesNoString } from '@/utils/boolean-to-yes-no-string'
import { renderCategory, renderDesktopIntegrationTypes } from '../client-app-detail/app-content'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import DeveloperAppRevisionModal from '@/components/ui/developer-app-revision-modal/developer-app-revision-modal'
import AppDelete from '@/components/ui/app-delete'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { useDispatch, useSelector } from 'react-redux'
import { developerFetchAppDetail } from '@/actions/developer'
import { selectClientId } from '@/selector/client'
import useReactResponsive from '@/components/hooks/useReactResponsive'

const asideContainerClasses = [standAloneAppDetailStyles.asideContainer, developerAppDetailStyles.asideContainer].join(
  ' ',
)

interface AsideProps {
  appDetailState: DeveloperAppDetailState
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

interface ManageAppProps {
  pendingRevisions: boolean
  appDetailState: DeveloperAppDetailState
  id: string
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

export const onAppDeleteModalAfterClose = (setVisible: (value: boolean) => void) => {
  return () => {
    setVisible(false)
  }
}

export const onDeleteSuccess = (history: History) => {
  return () => {
    history.push(routes.DEVELOPER_MY_APPS)
  }
}

export const onDeveloperAppRevisionModalAfterClose = (setVisible: (value: boolean) => void) => {
  return () => {
    setVisible(false)
  }
}

export const onPendingRevisionButtonClick = (setVisible: (value: boolean) => void) => {
  return () => {
    setVisible(true)
  }
}

export const onEditDetailButtonClick = (history: History, id: string) => {
  return () => {
    history.push(`${routes.DEVELOPER_MY_APPS}/${id}/edit`)
  }
}

export const onDeleteAppButtonClick = (setVisible: (value: boolean) => void) => {
  return () => {
    setVisible(true)
  }
}

export const onBackToAppsButtonClick = (history: History) => {
  return () => {
    history.push(routes.DEVELOPER_MY_APPS)
  }
}

export const ManageApp: React.FC<ManageAppProps> = ({ pendingRevisions, id, appDetailState }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAppRevisionComparisionModalOpen, setIsAppRevisionComparisionModalOpen] = React.useState(false)

  const clientId = useSelector(selectClientId)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <RenderWithHeader header="Manage App">
      {isDeleteModalOpen && (
        <AppDelete
          appId={id || ''}
          appName={name || ''}
          afterClose={onAppDeleteModalAfterClose(setIsDeleteModalOpen)}
          visible={isDeleteModalOpen}
          onDeleteSuccess={onDeleteSuccess(history)}
        />
      )}

      {isAppRevisionComparisionModalOpen && (
        <DeveloperAppRevisionModal
          onCancelSuccess={onCancelSuccess({
            dispatch,
            clientId,
            id,
          })}
          appDetailState={appDetailState}
          visible={isAppRevisionComparisionModalOpen}
          appId={id || ''}
          afterClose={onDeveloperAppRevisionModalAfterClose(setIsAppRevisionComparisionModalOpen)}
        />
      )}

      <div className={developerAppDetailStyles.asideManageAppContainer}>
        {pendingRevisions ? (
          <Button
            type="button"
            variant="primary"
            dataTest="detail-modal-edit-button"
            onClick={onPendingRevisionButtonClick(setIsAppRevisionComparisionModalOpen)}
          >
            PENDING REVISION
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            dataTest="detail-modal-edit-button"
            onClick={onEditDetailButtonClick(history, id)}
          >
            EDIT DETAILS
          </Button>
        )}
        <Button className="w-100" onClick={onDeleteAppButtonClick(setIsDeleteModalOpen)} variant="danger">
          DELETE APP
        </Button>
      </div>
    </RenderWithHeader>
  )
}

export const renderListedStatus = (isListed: boolean) => {
  if (isListed) {
    return (
      <div className={developerAppDetailStyles.renderAsideStatusContainer}>
        Listed <FaCheck className={developerAppDetailStyles.check} />
      </div>
    )
  }

  return 'Not Listed'
}

export const Aside: React.FC<AsideProps> = ({ desktopIntegrationTypes, appDetailState }) => {
  const history = useHistory()
  const { isMobile } = useReactResponsive()
  const { data } = appDetailState
  const { isDirectApi, category, isListed, pendingRevisions, id = '', limitToClientIds = [] } = data as AppDetailModel

  return (
    <div className={asideContainerClasses}>
      <div>
        <div className={developerAppDetailStyles.headerWithoutMargin}>{renderCategory(category)}</div>
        <div className={developerAppDetailStyles.headerWithoutMargin}>
          {renderDesktopIntegrationTypes(desktopIntegrationTypes)}
        </div>
        <RenderWithHeader header="Private App">
          {convertBooleanToYesNoString(Boolean(limitToClientIds.length > 0))}
        </RenderWithHeader>
        <RenderWithHeader header="Direct API">{convertBooleanToYesNoString(Boolean(isDirectApi))}</RenderWithHeader>
        {isMobile && (
          <FormSection>
            <Button className="is-pulled-right" onClick={onBackToAppsButtonClick(history)}>
              Back To Apps
            </Button>
          </FormSection>
        )}
        {!isMobile && (
          <>
            <RenderWithHeader header="Status">{renderListedStatus(Boolean(isListed))}</RenderWithHeader>
            <ManageApp appDetailState={appDetailState} id={id} pendingRevisions={Boolean(pendingRevisions)} />
          </>
        )}
      </div>
    </div>
  )
}

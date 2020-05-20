import React from 'react'
import { FaCheck } from 'react-icons/fa'
import routes from '@/constants/routes'
import { useHistory } from 'react-router'
import appDetailStyles from '@/styles/blocks/app-detail.scss?mod'
import developerAppDetailStyles from '@/styles/pages/developer-app-detail.scss?mod'
import { RenderWithHeader } from './app-detail/render-with-header'
import { Button } from '@reapit/elements'
import { BooleanToYesNo } from '@/utils/boolean-to-yes-no'
import { renderCategory, renderDesktopIntegrationTypes } from '../client-app-detail/app-content'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
/* eslint-disable max-len */
import DeveloperAppRevisionModal from '@/components/ui/developer-app-revision-modal/developer-app-revision-modal'
import AppDelete from '@/components/ui/app-delete'
import { handlePendingRevisionButtonClick } from '@/components/ui/developer-app-modal'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

interface AsideProps {
  appDetailState: DeveloperAppDetailState
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

interface ManageAppProps {
  pendingRevisions: boolean
  appDetailState: DeveloperAppDetailState
  id: string
}

export const ManageApp: React.FC<ManageAppProps> = ({ pendingRevisions, id, appDetailState }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAppRevisionComparisionModalOpen, setIsAppRevisionComparisionModalOpen] = React.useState(false)
  const history = useHistory()

  return (
    <RenderWithHeader header="Manage App">
      <AppDelete
        appId={id || ''}
        appName={name || ''}
        afterClose={() => setIsDeleteModalOpen(false)}
        visible={isDeleteModalOpen}
        onDeleteSuccess={() => {
          history.push(routes.DEVELOPER_MY_APPS)
        }}
      />

      <DeveloperAppRevisionModal
        appDetailState={appDetailState}
        visible={isAppRevisionComparisionModalOpen}
        appId={id || ''}
        afterClose={() => setIsAppRevisionComparisionModalOpen(false)}
      />

      <div className={developerAppDetailStyles.asideManageAppContainer}>
        {pendingRevisions ? (
          <Button
            className={appDetailStyles.gutter}
            type="button"
            variant="primary"
            dataTest="detail-modal-edit-button"
            onClick={handlePendingRevisionButtonClick(setIsAppRevisionComparisionModalOpen)}
          >
            PENDING REVISION
          </Button>
        ) : (
          <Button
            className="mb-3"
            type="button"
            variant="primary"
            dataTest="detail-modal-edit-button"
            onClick={() => {
              history.push(`${routes.DEVELOPER_MY_APPS}/${id}/edit`)
            }}
          >
            EDIT DETAILS
          </Button>
        )}
        <Button onClick={() => setIsDeleteModalOpen(true)} variant="danger">
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
  const { data } = appDetailState
  const { isDirectApi, category, isListed, pendingRevisions, id = '', limitToClientIds } = data as AppDetailModel

  return (
    <div className={developerAppDetailStyles.asideContainer}>
      <div className={developerAppDetailStyles.headerWithoutMargin}>{renderCategory(category)}</div>
      <div className={developerAppDetailStyles.headerWithoutMargin}>
        {renderDesktopIntegrationTypes(desktopIntegrationTypes)}
      </div>
      <RenderWithHeader header="Private App">{BooleanToYesNo(Boolean(limitToClientIds))}</RenderWithHeader>
      <RenderWithHeader header="Direct API">{BooleanToYesNo(Boolean(isDirectApi))}</RenderWithHeader>
      <RenderWithHeader header="Status">{renderListedStatus(Boolean(isListed))}</RenderWithHeader>
      <ManageApp appDetailState={appDetailState} id={id} pendingRevisions={Boolean(pendingRevisions)} />
    </div>
  )
}

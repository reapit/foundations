import React, { ChangeEvent, FC, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Loader,
  MobileControls,
  PersistentNotification,
  Tabs,
  TabsOption,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppEditTab } from './edit-page-tabs'
import { AppEditForm } from './app-edit-form'
import { Helper } from '../page/helper'
import Routes from '../../../constants/routes'

export const handleChangeTab =
  (navigate: NavigateFunction, appId?: string) => (event: ChangeEvent<HTMLInputElement>) => {
    if (appId) {
      navigate(`${Routes.APPS}/${appId}/edit/${event.target.value}`)
    }
  }

export const AppEditPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { appId } = useParams<'appId'>()
  const { appsDataState, setAppId } = useAppState()
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()

  useEffect(handleSetAppId(setAppId, appId), [appId])

  const { appDetail, appDetailLoading } = appsDataState
  const { pathname } = location

  return appDetailLoading ? (
    <Loader />
  ) : appDetail ? (
    <>
      <Title>{appDetail.name}</Title>
      {isMobile && (
        <Modal title="Controls">
          <Helper />
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <Tabs
        isFullWidth
        name="app-edit-tabs"
        onChange={handleChangeTab(navigate, appId)}
        options={
          [
            {
              id: AppEditTab.general,
              value: AppEditTab.general,
              text: 'About Listings',
              isChecked:
                pathname.includes(AppEditTab.general) || pathname === Routes.APPS_EDIT.replace(':appId', appId ?? ''),
            },
            {
              id: AppEditTab.appListing,
              value: AppEditTab.appListing,
              text: 'AppMarket Listing',
              isChecked: pathname.includes(AppEditTab.appListing),
            },
            appDetail.authFlow === 'authorisationCode' && {
              id: AppEditTab.authentication,
              value: AppEditTab.authentication,
              text: 'Authentication',
              isChecked: pathname.includes(AppEditTab.authentication),
            },
            {
              id: AppEditTab.permissions,
              value: AppEditTab.permissions,
              text: 'Permissions',
              isChecked: pathname.includes(AppEditTab.permissions),
            },
            appDetail.authFlow === 'authorisationCode' && {
              id: AppEditTab.acIntegration,
              value: AppEditTab.acIntegration,
              text: 'Reapit CRM Integration',
              isChecked: pathname.includes(AppEditTab.acIntegration),
            },
          ].filter(Boolean) as TabsOption[]
        }
      />
      <AppEditForm />
      <MobileControls onClick={openModal} />
    </>
  ) : (
    <PersistentNotification intent="primary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistentNotification>
  )
}

export default AppEditPage

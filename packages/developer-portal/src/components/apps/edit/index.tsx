import React, { ChangeEvent, FC, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  Loader,
  PersistantNotification,
  Tabs,
  TabsOption,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { AppEditTab } from './edit-page-tabs'
import { AppEditForm } from './app-edit-form'
import { Helper } from '../page/helper'
import { History } from 'history'
import Routes from '../../../constants/routes'

export const handleChangeTab = (appId: string, history: History) => (event: ChangeEvent<HTMLInputElement>) => {
  history.push(`${Routes.APPS}/${appId}/edit/${event.target.value}`)
}

export const AppEditPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { appId } = useParams<AppUriParams>()
  const { appsDataState, setAppId } = useAppState()
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  const { appDetail, appDetailLoading } = appsDataState
  const { pathname } = location

  return appDetailLoading ? (
    <Loader />
  ) : appDetail ? (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>{appDetail.name}</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <Modal title="Controls">
          <Helper />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <Tabs
        isFullWidth
        name="app-edit-tabs"
        onChange={handleChangeTab(appId, history)}
        options={
          [
            {
              id: AppEditTab.general,
              value: AppEditTab.general,
              text: 'About Listings',
              isChecked:
                pathname.includes(AppEditTab.general) || pathname === Routes.APPS_EDIT.replace(':appId', appId),
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
              text: 'AgencyCloud Integration',
              isChecked: pathname.includes(AppEditTab.acIntegration),
            },
          ].filter(Boolean) as TabsOption[]
        }
      />
      <AppEditForm />
    </>
  ) : (
    <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistantNotification>
  )
}

export default AppEditPage

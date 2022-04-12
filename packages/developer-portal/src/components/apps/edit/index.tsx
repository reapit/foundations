import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Loader, PersistantNotification, Tabs, TabsOption, Title } from '@reapit/elements'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'
import { AppEditTab } from './edit-page-tabs'
import { AppEditForm } from './app-edit-form'

export const handleChangeTab =
  (setTab: Dispatch<SetStateAction<AppEditTab>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setTab(event.target.value as AppEditTab)
  }

export const AppEditPage: FC = () => {
  const [tab, setTab] = useState<AppEditTab>(AppEditTab.general)
  const { appId } = useParams<AppUriParams>()
  const { appsDataState, setAppId } = useAppState()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  const { appDetail, appDetailLoading } = appsDataState

  return appDetailLoading ? (
    <Loader />
  ) : appDetail ? (
    <>
      <Title>{appDetail.name}</Title>
      <Tabs
        isFullWidth
        name="app-edit-tabs"
        onChange={handleChangeTab(setTab)}
        options={
          [
            {
              id: AppEditTab.general,
              value: AppEditTab.general,
              text: 'About Listings',
              isChecked: tab === AppEditTab.general,
            },
            {
              id: AppEditTab.appListing,
              value: AppEditTab.appListing,
              text: 'AppMarket Listing',
              isChecked: tab === AppEditTab.appListing,
            },
            appDetail.authFlow === 'authorisationCode' && {
              id: AppEditTab.authentication,
              value: AppEditTab.authentication,
              text: 'Authentication',
              isChecked: tab === AppEditTab.authentication,
            },
            {
              id: AppEditTab.permissions,
              value: AppEditTab.permissions,
              text: 'Permissions',
              isChecked: tab === AppEditTab.permissions,
            },
            appDetail.authFlow === 'authorisationCode' && {
              id: AppEditTab.acIntegration,
              value: AppEditTab.acIntegration,
              text: 'AgencyCloud Integration',
              isChecked: tab === AppEditTab.acIntegration,
            },
          ].filter(Boolean) as TabsOption[]
        }
      />
      <AppEditForm tab={tab} />
    </>
  ) : (
    <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistantNotification>
  )
}

export default AppEditPage

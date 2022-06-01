import React, { FC } from 'react'
import { Title, PageContainer } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DeveloperAppsCollection } from './developer-apps-collection'
import { useAppsBrowseState } from './use-apps-browse-state'
import { FeaturedHeroAppsCollection } from './featured-hero-apps'
import { FeaturedAppsCollection } from './featured-apps-collection'
import { SimpleAppsCollection } from './simple-apps-collection'
import { AppFiltersCollection } from './app-filters-collection'

export const AppsBrowse: FC = () => {
  const { appsBrowseFilterState, appsBrowseConfigState } = useAppsBrowseState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const hasFilters = Boolean(appsBrowseFilterState)
  const featuredHeroApps = appsBrowseConfigState?.featuredHeroApps ?? []
  const appsFilters = appsBrowseConfigState?.appsFilters ?? []
  const featuredApps = appsBrowseConfigState?.featuredApps ?? []
  const simpleApps = appsBrowseConfigState?.simpleApps ?? []
  const isDeveloper = Boolean(connectSession?.loginIdentity.developerId)

  return (
    <PageContainer>
      <Title>AppMarket</Title>
      {hasFilters ? null : (
        <>
          {featuredHeroApps.map((configItem, index) => (
            <FeaturedHeroAppsCollection key={index} configItem={configItem} />
          ))}
          {appsFilters.map((configItem, index) => (
            <AppFiltersCollection key={index} configItem={configItem} />
          ))}
          {featuredApps.map((configItem, index) => (
            <FeaturedAppsCollection key={index} configItem={configItem} />
          ))}
          {simpleApps.map((configItem, index) => (
            <SimpleAppsCollection key={index} configItem={configItem} />
          ))}
          {isDeveloper && <DeveloperAppsCollection />}
        </>
      )}
    </PageContainer>
  )
}

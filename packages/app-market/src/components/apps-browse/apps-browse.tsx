import React, { FC, useMemo } from 'react'
import { Title, PageContainer } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DeveloperAppsCollection } from './developer-apps-collection'
import { AppsBrowseConfigCollection, useAppsBrowseState } from './use-apps-browse-state'
import { FeaturedHeroAppsCollection } from './featured-hero-apps'
import { FeaturedAppsCollection } from './featured-apps-collection'
import { SimpleAppsCollection } from './simple-apps-collection'
import { AppFiltersCollection } from './app-filters-collection'
import { HeroAppsCollection } from './hero-apps'

export const handleSortConfigs = (appsBrowseConfigState: AppsBrowseConfigCollection | null) => () => {
  const featuredHeroApps =
    appsBrowseConfigState?.data.filter((config) => config.configType === 'featuredHeroApps') ?? []
  const heroApps = appsBrowseConfigState?.data.filter((config) => config.configType === 'heroApps') ?? []
  const appsFilters = appsBrowseConfigState?.data.filter((config) => config.configType === 'appsFilters') ?? []
  const featuredApps = appsBrowseConfigState?.data.filter((config) => config.configType === 'featuredApps') ?? []
  const simpleApps = appsBrowseConfigState?.data.filter((config) => config.configType === 'simpleApps') ?? []

  return { featuredHeroApps, heroApps, appsFilters, featuredApps, simpleApps }
}

export const AppsBrowse: FC = () => {
  const { appsBrowseFilterState, appsBrowseConfigState } = useAppsBrowseState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isDeveloper = Boolean(connectSession?.loginIdentity.developerId)
  const hasFilters = Boolean(appsBrowseFilterState)
  const { featuredHeroApps, heroApps, appsFilters, featuredApps, simpleApps } = useMemo(
    handleSortConfigs(appsBrowseConfigState),
    [appsBrowseConfigState],
  )

  return (
    <PageContainer>
      <Title>AppMarket</Title>
      {hasFilters ? null : (
        <>
          {featuredHeroApps.map((configItem, index) => (
            <FeaturedHeroAppsCollection key={index} configItem={configItem} />
          ))}
          {heroApps.map((configItem, index) => (
            <HeroAppsCollection key={index} configItem={configItem} />
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

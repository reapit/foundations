import React, { FC, Fragment, useMemo } from 'react'
import { Title, PageContainer, Subtitle, FlexContainer } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DeveloperAppsCollection } from './developer-apps-collection'
import { AppsBrowseConfigCollection, useAppsBrowseState } from './use-apps-browse-state'
import { FeaturedHeroAppsCollection } from './featured-hero-apps'
import { FeaturedAppsCollection } from './featured-apps-collection'
import { SimpleAppsCollection } from './simple-apps-collection'
import { AppFiltersCollection } from './app-filters-collection'
import { HeroAppsCollection } from './hero-apps'
import {
  AppFilterGrid,
  AppFilterLink,
  FeaturedAppsGrid,
  HeroAppsGrid,
  heroSubMinHeight,
  SimpleAppsGrid,
} from './__styles__'

export const handleSortConfigs = (appsBrowseConfigState: AppsBrowseConfigCollection | null) => () => {
  const featuredHeroApps =
    appsBrowseConfigState?.data.filter((config) => config.configType === 'featuredHeroApps') ?? []
  const heroApps = appsBrowseConfigState?.data.filter((config) => config.configType === 'heroApps') ?? []
  const appsFilters = appsBrowseConfigState?.data.filter((config) => config.configType === 'appsFilters') ?? []
  const featuredApps = appsBrowseConfigState?.data.filter((config) => config.configType === 'featuredApps') ?? []
  const simpleApps = appsBrowseConfigState?.data.filter((config) => config.configType === 'simpleApps') ?? []

  return {
    featuredHeroApps,
    heroApps,
    appsFilters,
    featuredApps,
    simpleApps,
  }
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
          <HeroAppsGrid>
            {featuredHeroApps.map((configItem, index) => (
              <FeaturedHeroAppsCollection key={index} configItem={configItem} />
            ))}
            {heroApps.map((configItem, index) => (
              <HeroAppsCollection key={index} configItem={configItem} />
            ))}
          </HeroAppsGrid>
          {Boolean(appsFilters.length) && (
            <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
              App Collections
            </Subtitle>
          )}
          <AppFilterGrid>
            {appsFilters.map((configItem, index) => (
              <AppFiltersCollection key={index} configItem={configItem} />
            ))}
          </AppFilterGrid>
          {featuredApps.map((configItem, index) => (
            <Fragment key={index}>
              <FlexContainer>
                <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
                  {configItem?.content?.title}
                </Subtitle>
                <AppFilterLink>See All</AppFilterLink>
              </FlexContainer>
              <FeaturedAppsGrid>
                <FeaturedAppsCollection configItem={configItem} />
              </FeaturedAppsGrid>
            </Fragment>
          ))}
          {simpleApps.map((configItem, index) => (
            <Fragment key={index}>
              <FlexContainer>
                <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
                  {configItem?.content?.title}
                </Subtitle>
                <AppFilterLink>See All</AppFilterLink>
              </FlexContainer>
              <SimpleAppsGrid>
                <SimpleAppsCollection key={index} configItem={configItem} />
              </SimpleAppsGrid>
            </Fragment>
          ))}
          {isDeveloper && <DeveloperAppsCollection />}
        </>
      )}
    </PageContainer>
  )
}

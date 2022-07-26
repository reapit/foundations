import React, { Dispatch, FC, Fragment, SetStateAction, useMemo, useState } from 'react'
import {
  Title,
  PageContainer,
  Subtitle,
  FlexContainer,
  Icon,
  elMb5,
  useMediaQuery,
  MediaType,
  elMt3,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DeveloperAppsCollection } from './developer-apps-collection'
import {
  AppsBrowseConfigCollection,
  AppsBrowseConfigItemFilters,
  useAppsBrowseState,
} from '../../core/use-apps-browse-state'
import { FeaturedHeroAppsCollection } from './featured-hero-apps'
import { FeaturedAppsCollection } from './featured-apps-collection'
import { SimpleAppsCollection } from './simple-apps-collection'
import { AppFiltersCollection } from './app-filters-collection'
import { HeroAppsCollection } from './hero-apps'
import {
  AppFilterLink,
  AppSearchFiltersWrap,
  appsSearchMobileControls,
  appsSearchMobileIcon,
  appsSearchMobileIconActive,
  BrowseAppsTitle,
  browseAppsTitleHasFilters,
  FeaturedAppsGrid,
  heroSubMinHeight,
  SimpleAppsGrid,
} from './__styles__'
import { AppSearchFilters } from './app-search-filters-bar'
import { FilteredAppsCollection } from './filtered-apps'
import { cx } from '@linaria/core'
import { Carousel } from '../carousel'

export type MobileControlsState = 'search' | 'filters' | null

export const checkHasFilters = (appsBrowseFilterState: AppsBrowseConfigItemFilters | null) => (): boolean => {
  if (!appsBrowseFilterState) return false

  return Boolean(
    Object.keys(appsBrowseFilterState).filter((key) => {
      const filterItem = appsBrowseFilterState[key]

      if (Array.isArray(filterItem) && filterItem.length) {
        return true
      }

      if (!Array.isArray(filterItem) && filterItem) return true

      return false
    }).length,
  )
}

export const handleFiltersCols = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaQuery

  if (isMobile) return 2
  if (isTablet) return 3
  if (isDesktop) return 4
  if (isWideScreen) return 5

  return 6
}

export const handleMobileControls =
  (setMobileControlsState: Dispatch<SetStateAction<MobileControlsState>>, newState: MobileControlsState) => () => {
    setMobileControlsState(newState)
  }

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
  const mediaQuery = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [mobileControlsState, setMobileControlsState] = useState<MobileControlsState>(null)
  const isDeveloper = Boolean(connectSession?.loginIdentity.developerId)
  const hasFilters = useMemo(checkHasFilters(appsBrowseFilterState), [appsBrowseFilterState])
  const filtersCols = useMemo(handleFiltersCols(mediaQuery), [mediaQuery])
  const { featuredHeroApps, heroApps, appsFilters, featuredApps, simpleApps } = useMemo(
    handleSortConfigs(appsBrowseConfigState),
    [appsBrowseConfigState],
  )
  const { isMobile } = mediaQuery

  return (
    <PageContainer>
      <AppSearchFiltersWrap>
        <BrowseAppsTitle className={cx(mobileControlsState && browseAppsTitleHasFilters)}>AppMarket</BrowseAppsTitle>
        <FlexContainer className={cx(elMb5, elMt3, appsSearchMobileControls)}>
          <Icon
            className={cx(appsSearchMobileIcon, mobileControlsState === 'filters' && appsSearchMobileIconActive)}
            onClick={handleMobileControls(setMobileControlsState, mobileControlsState === 'filters' ? null : 'filters')}
            icon="filterSystem"
            fontSize="1.25rem"
          />
          <Icon
            className={cx(appsSearchMobileIcon, mobileControlsState === 'search' && appsSearchMobileIconActive)}
            onClick={handleMobileControls(setMobileControlsState, mobileControlsState === 'search' ? null : 'search')}
            icon="searchSystem"
            fontSize="1.25rem"
          />
        </FlexContainer>
      </AppSearchFiltersWrap>
      <AppSearchFilters mobileControlsState={mobileControlsState} setMobileControlsState={setMobileControlsState} />
      {hasFilters ? (
        <FilteredAppsCollection />
      ) : (
        <>
          {featuredHeroApps.map((configItem, index) => (
            <FeaturedHeroAppsCollection key={index} configItem={configItem} />
          ))}
          <Carousel
            numberCols={isMobile ? 1 : 2}
            items={heroApps.map((configItem, index) => (
              <HeroAppsCollection key={index} configItem={configItem} />
            ))}
          />
          {Boolean(appsFilters.length) && (
            <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
              App Collections
            </Subtitle>
          )}
          <Carousel
            numberCols={filtersCols}
            items={appsFilters.map((configItem, index) => (
              <AppFiltersCollection key={index} configItem={configItem} />
            ))}
          />
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

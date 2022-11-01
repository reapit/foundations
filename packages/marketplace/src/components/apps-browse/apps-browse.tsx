import React, { Dispatch, FC, Fragment, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import {
  PageContainer,
  FlexContainer,
  Icon,
  elMb5,
  useMediaQuery,
  MediaType,
  elMt3,
  elMb7,
  elMb11,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DeveloperAppsCollection } from './developer-apps-collection'
import { AppsBrowseConfigCollection, useAppsBrowseState } from '../../core/use-apps-browse-state'
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
  BrowseAppsSubtitle,
  AppsGrid,
  heroAppsCarouselWidescreen,
  SimpleAppsGrid,
} from './__styles__'
import { AppSearchFilters } from './app-search-filters-bar'
import { FilteredAppsCollection } from './filtered-apps'
import { cx } from '@linaria/core'
import { Carousel } from '../carousel'
import {
  AppsBrowseConfigEnum,
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
} from '@reapit/foundations-ts-definitions'
import { trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { History } from 'history'
import { Routes } from '../../constants/routes'
import { useHistory, useLocation } from 'react-router'
import { AppDetailBackButton } from '../apps-detail/__styles__'

export type MobileControlsState = 'search' | 'filters' | null

export const checkHasFilters = (appsBrowseFilterState: AppsBrowseConfigItemFiltersInterface | null) => (): boolean => {
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

export const handleClearFilters =
  (setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>) => () => {
    setAppsBrowseFilterState(null)
    trackEvent(TrackingEvent.ClickClearFilters, true)
  }

export const handleSetFilters =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    history: History,
    configItem: AppsBrowseConfigItemInterface,
  ) =>
  () => {
    const { filters, id, content } = configItem
    if (filters) {
      trackEvent(TrackingEvent.ClickSeeAllFilter, true, { filters, collectionTitle: content?.title, collectionId: id })
      setAppsBrowseFilterState(filters)
      history.push(`${Routes.APPS_BROWSE}?collectionId=${id}`)
    }
  }

export const handleFiltersCols = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop } = mediaQuery

  if (isMobile) return 2
  if (isTablet) return 3
  if (isDesktop) return 4

  return 6
}

export const handleMobileControls =
  (setMobileControlsState: Dispatch<SetStateAction<MobileControlsState>>, newState: MobileControlsState) => () => {
    trackEvent(TrackingEvent.ClickMobileControls, true, { controlType: newState })
    setMobileControlsState(newState)
  }

export type ConfigType = { [key in AppsBrowseConfigEnum]: AppsBrowseConfigItemInterface[] }

export const handleSortConfigs = (appsBrowseConfigState: AppsBrowseConfigCollection | null) => () => {
  const baseConfig: ConfigType = {
    [AppsBrowseConfigEnum.HERO]: [],
    [AppsBrowseConfigEnum.FEATURED_HERO]: [],
    [AppsBrowseConfigEnum.FILTERS]: [],
    [AppsBrowseConfigEnum.SIMPLE]: [],
    [AppsBrowseConfigEnum.FEATURED]: [],
  }

  if (!appsBrowseConfigState?.items.length) return baseConfig

  return appsBrowseConfigState.items.reduce<ConfigType>((acc, config) => {
    const existingConfig = acc[config.configType]

    acc[config.configType] = [...existingConfig, config].sort((a, b) => {
      return (a.index || 0) - (b.index || 0)
    })

    return acc
  }, baseConfig)
}

export const handleCollectionId =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    appsBrowseConfigState: AppsBrowseConfigCollection | null,
    collectionId: string | null,
  ) =>
  () => {
    const filters = appsBrowseConfigState?.items.find((item) => item.id === collectionId)?.filters

    if (filters) {
      setAppsBrowseFilterState(filters)
    }
  }

export const AppsBrowse: FC = () => {
  const { appsBrowseFilterState, setAppsBrowseFilterState, appsBrowseConfigState } = useAppsBrowseState()
  const mediaQuery = useMediaQuery()
  const history = useHistory()
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [mobileControlsState, setMobileControlsState] = useState<MobileControlsState>(null)
  const isDeveloper = Boolean(connectSession?.loginIdentity.developerId)
  const hasFilters = useMemo(checkHasFilters(appsBrowseFilterState), [appsBrowseFilterState])
  const filtersCols = useMemo(handleFiltersCols(mediaQuery), [mediaQuery])
  const urlParams = new URLSearchParams(location.search)
  const collectionId = urlParams.get('collectionId')
  const { featuredHeroApps, heroApps, appsFilters, featuredApps, simpleApps } = useMemo(
    handleSortConfigs(appsBrowseConfigState),
    [appsBrowseConfigState],
  )
  const mobileControlsFilters = useCallback(
    handleMobileControls(setMobileControlsState, mobileControlsState === 'filters' ? null : 'filters'),
    [mobileControlsState],
  )
  const mobileControlsSearch = useCallback(
    handleMobileControls(setMobileControlsState, mobileControlsState === 'search' ? null : 'search'),
    [mobileControlsState],
  )
  const clearFilters = useCallback(handleClearFilters(setAppsBrowseFilterState), [])

  useEffect(handleCollectionId(setAppsBrowseFilterState, appsBrowseConfigState, collectionId), [
    appsBrowseConfigState,
    collectionId,
  ])

  const { isMobile, isTablet } = mediaQuery

  return (
    <PageContainer>
      {hasFilters && (
        <AppDetailBackButton onClick={clearFilters}>
          <Icon icon="backSystem" intent="primary" />
        </AppDetailBackButton>
      )}
      <AppSearchFiltersWrap>
        <BrowseAppsTitle className={cx(mobileControlsState && isMobile && browseAppsTitleHasFilters)}>
          AppMarket
        </BrowseAppsTitle>
        <FlexContainer className={cx(elMb5, elMt3, appsSearchMobileControls)}>
          <Icon
            className={cx(appsSearchMobileIcon, mobileControlsState === 'filters' && appsSearchMobileIconActive)}
            onClick={mobileControlsFilters}
            icon="filterSystem"
            fontSize="1.25rem"
          />
          <Icon
            className={cx(appsSearchMobileIcon, mobileControlsState === 'search' && appsSearchMobileIconActive)}
            onClick={mobileControlsSearch}
            icon="searchSystem"
            fontSize="1.25rem"
          />
        </FlexContainer>
      </AppSearchFiltersWrap>
      <AppSearchFilters mobileControlsState={mobileControlsState} setMobileControlsState={setMobileControlsState} />
      {hasFilters ? (
        <FilteredAppsCollection collectionId={collectionId} />
      ) : (
        <>
          {featuredHeroApps.map((configItem, index) => (
            <FeaturedHeroAppsCollection key={index} configItem={configItem} />
          ))}
          <Carousel
            className={heroAppsCarouselWidescreen}
            numberCols={isMobile || isTablet ? 1 : 2}
            items={heroApps.map((configItem, index) => (
              <HeroAppsCollection key={index} configItem={configItem} />
            ))}
          />
          <FlexContainer isFlexColumn>
            {Boolean(appsFilters.length) && (
              <>
                <BrowseAppsSubtitle>App Collections</BrowseAppsSubtitle>
                <Carousel
                  className={cx(isMobile ? elMb7 : elMb11)}
                  numberCols={filtersCols}
                  items={appsFilters.map((configItem, index) => (
                    <AppFiltersCollection key={index} configItem={configItem} />
                  ))}
                />
              </>
            )}
            {featuredApps.map((configItem, index) => (
              <Fragment key={index}>
                <FlexContainer isFlexAlignCenter>
                  <BrowseAppsSubtitle>{configItem?.content?.title}</BrowseAppsSubtitle>
                  <AppFilterLink onClick={handleSetFilters(setAppsBrowseFilterState, history, configItem)}>
                    See All
                  </AppFilterLink>
                </FlexContainer>
                <AppsGrid>
                  <FeaturedAppsCollection configItem={configItem} />
                </AppsGrid>
              </Fragment>
            ))}
            {simpleApps.map((configItem, index) => (
              <Fragment key={index}>
                <FlexContainer isFlexAlignCenter>
                  <BrowseAppsSubtitle>{configItem?.content?.title}</BrowseAppsSubtitle>
                  <AppFilterLink onClick={handleSetFilters(setAppsBrowseFilterState, history, configItem)}>
                    See All
                  </AppFilterLink>
                </FlexContainer>
                <SimpleAppsGrid>
                  <SimpleAppsCollection key={index} configItem={configItem} />
                </SimpleAppsGrid>
              </Fragment>
            ))}
          </FlexContainer>
          {isDeveloper && <DeveloperAppsCollection />}
        </>
      )}
    </PageContainer>
  )
}

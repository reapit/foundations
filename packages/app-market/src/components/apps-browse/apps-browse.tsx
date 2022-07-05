import React, { Dispatch, FC, Fragment, SetStateAction, useMemo, useState } from 'react'
import { Title, PageContainer, Subtitle, FlexContainer, Icon, elMb5, useMediaQuery } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DeveloperAppsCollection } from './developer-apps-collection'
import { AppsBrowseConfigCollection, AppsBrowseConfigItemFilters, useAppsBrowseState } from './use-apps-browse-state'
import { FeaturedHeroAppsCollection } from './featured-hero-apps'
import { FeaturedAppsCollection } from './featured-apps-collection'
import { SimpleAppsCollection } from './simple-apps-collection'
import { AppFiltersCollection } from './app-filters-collection'
import { HeroAppsCollection } from './hero-apps'
import {
  AppFilterGrid,
  AppFilterLink,
  AppSearchFiltersWrap,
  appsSearchMobileControls,
  appsSearchMobileIcon,
  appsSearchMobileIconActive,
  FeaturedAppsGrid,
  HeroAppsGrid,
  heroSubMinHeight,
  SimpleAppsGrid,
} from './__styles__'
import { AppSearchFilters } from './app-search-filters-bar'
import { FilteredAppsCollection } from './filtered-apps'
import { cx } from '@linaria/core'

export type MobileControlsState = 'search' | 'filters' | 'none'
export type MobileFilterControlsState = 'categories' | 'types' | 'none'
export interface MobileControlsToggleState {
  controls: MobileControlsState
  filters: MobileFilterControlsState
}

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

export const handleMobileControls =
  (
    setMobileControlsState: Dispatch<SetStateAction<MobileControlsToggleState>>,
    newState: Partial<MobileControlsToggleState>,
  ) =>
  () => {
    setMobileControlsState((currentState) => {
      const { controls, filters } = currentState
      const newControls = newState.controls && newState.controls !== controls ? newState.controls : controls
      const newFilters = newState.filters && filters !== newState.filters ? newState.filters : filters

      return {
        controls: newControls,
        filters: newFilters,
      }
    })
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
  const { isMobile } = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [mobileControlsState, setMobileControlsState] = useState<MobileControlsToggleState>({
    controls: 'none',
    filters: 'none',
  })
  const isDeveloper = Boolean(connectSession?.loginIdentity.developerId)
  const hasFilters = useMemo(checkHasFilters(appsBrowseFilterState), [appsBrowseFilterState])
  const { featuredHeroApps, heroApps, appsFilters, featuredApps, simpleApps } = useMemo(
    handleSortConfigs(appsBrowseConfigState),
    [appsBrowseConfigState],
  )

  return (
    <PageContainer>
      <AppSearchFiltersWrap>
        <Title hasNoMargin={mobileControlsState.controls !== 'none' && isMobile}>AppMarket</Title>
        <FlexContainer className={cx(elMb5, appsSearchMobileControls)}>
          <Icon
            className={cx(
              appsSearchMobileIcon,
              mobileControlsState.controls === 'filters' && appsSearchMobileIconActive,
            )}
            onClick={handleMobileControls(setMobileControlsState, {
              controls: mobileControlsState.controls === 'filters' ? 'none' : 'filters',
            })}
            icon="filterSystem"
            fontSize="1.25rem"
          />
          <Icon
            className={cx(
              appsSearchMobileIcon,
              mobileControlsState.controls === 'search' && appsSearchMobileIconActive,
            )}
            onClick={handleMobileControls(setMobileControlsState, {
              controls: mobileControlsState.controls === 'search' ? 'none' : 'search',
            })}
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

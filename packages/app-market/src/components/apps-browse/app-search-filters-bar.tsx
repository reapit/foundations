import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction, useCallback, useRef } from 'react'
import {
  FlexContainer,
  BodyText,
  Icon,
  MultiSelectChip,
  elHasGreyChips,
  ElMultiSelectUnSelected,
  elFadeIn,
  SmallText,
  Button,
  elMr5,
  ButtonGroup,
  elMb5,
} from '@reapit/elements'
import {
  appsFiltersMobileBrowseBy,
  appsFiltersCategories,
  appsSearchContainer,
  appsSearchDesktopControls,
  AppsSearchInput,
  appsSearchInputIcon,
  AppsSearchMobileFilterControls,
  appsSearchMobileFilterControlsActive,
  appsSearchMobileControls,
} from './__styles__'
import { AppsBrowseConfigItemFiltersInterface, CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { cx } from '@linaria/core'
import debounce from 'just-debounce-it'
import { MobileControlsState } from './apps-browse'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { Routes } from '../../constants/routes'
import { History } from 'history'
import { useHistory } from 'react-router'

export interface AppSearchFiltersProps {
  mobileControlsState: MobileControlsState
  setMobileControlsState: Dispatch<SetStateAction<MobileControlsState>>
}

export const handleSelectFilter =
  (
    appsBrowseFilterState: AppsBrowseConfigItemFiltersInterface | null,
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    appsBrowseCategoriesState: CategoryModelPagedResult | null,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const newCategory = event.target.value
    const currentFilters = appsBrowseFilterState ?? {}
    const currentCategory = currentFilters.category ?? []

    if (currentCategory.includes(newCategory)) {
      const category = currentCategory.filter((item) => item !== newCategory)

      trackEvent(TrackingEvent.FilterApps, true, { category })

      return setAppsBrowseFilterState({
        ...currentFilters,
        category,
      })
    }

    const category = [...currentCategory, newCategory]
    const categoryNames = category.map((categoryItem) => {
      const foundCategory = appsBrowseCategoriesState?.data?.find((stateItem) => stateItem.id === categoryItem)
      return foundCategory?.name ?? ''
    })

    trackEvent(TrackingEvent.FilterApps, true, { categoryNames })

    return setAppsBrowseFilterState({
      ...currentFilters,
      category,
    })
  }

export const handleSearch =
  (setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase()

    setAppsBrowseFilterState((currentState) => {
      const currentFilters = currentState ?? {}

      if (!searchTerm) {
        delete currentFilters.searchTerm

        return {
          ...currentFilters,
        }
      }

      trackEvent(TrackingEvent.SearchApps, true, { searchTerm })

      return {
        ...currentFilters,
        searchTerm,
      }
    })
  }

export const handleClearSearch =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    history: History,
    searchRef: React.MutableRefObject<HTMLInputElement | null>,
  ) =>
  () => {
    setAppsBrowseFilterState(null)
    trackEvent(TrackingEvent.ClickClearFilters, true)
    history.push(Routes.APPS_BROWSE)
    if (searchRef.current) searchRef.current.value = ''
  }

export const AppSearchFilters: FC<AppSearchFiltersProps> = memo(({ mobileControlsState }) => {
  const { appsBrowseFilterState, appsBrowseCategoriesState, setAppsBrowseFilterState } = useAppsBrowseState()
  const searchRef = useRef<HTMLInputElement | null>(null)
  const history = useHistory()

  const debouncedSearch = useCallback(debounce(handleSearch(setAppsBrowseFilterState), 500), [])
  const clearSearch = useCallback(handleClearSearch(setAppsBrowseFilterState, history, searchRef), [searchRef])
  const selectFilter = useCallback(
    handleSelectFilter(appsBrowseFilterState, setAppsBrowseFilterState, appsBrowseCategoriesState),
    [appsBrowseFilterState],
  )

  const hasFilters = appsBrowseFilterState && Boolean(Object.keys(appsBrowseFilterState).length)

  return (
    <>
      <FlexContainer isFlexColumn>
        {mobileControlsState === 'search' && (
          <AppsSearchMobileFilterControls className={cx(mobileControlsState && appsSearchMobileFilterControlsActive)}>
            <FlexContainer className={appsSearchContainer} isFlexAlignCenter>
              <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
              <AppsSearchInput
                type="text"
                placeholder="Search by App or Developer"
                onChange={debouncedSearch}
                ref={searchRef}
              />
            </FlexContainer>
          </AppsSearchMobileFilterControls>
        )}
        {mobileControlsState === 'filters' && (
          <SmallText className={cx(appsFiltersMobileBrowseBy, appsSearchMobileControls)} hasNoMargin>
            Browse By
          </SmallText>
        )}
      </FlexContainer>
      <FlexContainer isFlexJustifyBetween>
        <BodyText className={appsSearchDesktopControls} hasBoldText>
          Browse By
        </BodyText>
      </FlexContainer>
      {Boolean(appsBrowseCategoriesState?.data?.length) && (
        <ElMultiSelectUnSelected
          className={cx(
            elFadeIn,
            appsFiltersCategories,
            mobileControlsState !== 'filters' && appsSearchDesktopControls,
          )}
        >
          {appsBrowseCategoriesState?.data?.map(({ id, name }) => (
            <MultiSelectChip
              className={elHasGreyChips}
              id={id}
              key={id}
              name={name}
              value={id}
              checked={Boolean(id && appsBrowseFilterState?.category?.includes(id))}
              onChange={selectFilter}
            >
              {name}
            </MultiSelectChip>
          ))}
        </ElMultiSelectUnSelected>
      )}
      {hasFilters && (
        <ButtonGroup className={cx(appsSearchMobileControls, elMb5)}>
          <Button onClick={clearSearch} intent="low">
            Clear Search Filters
          </Button>
        </ButtonGroup>
      )}
      <FlexContainer className={appsSearchDesktopControls}>
        <FlexContainer className={cx(appsSearchContainer, elMr5)} isFlexAlignCenter>
          <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
          <AppsSearchInput
            type="text"
            placeholder="Search by App or Developer"
            onChange={debouncedSearch}
            ref={searchRef}
          />
        </FlexContainer>
        {hasFilters && (
          <Button onClick={clearSearch} intent="low">
            Clear Search Filters
          </Button>
        )}
      </FlexContainer>
    </>
  )
})

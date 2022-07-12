import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from 'react'
import {
  FlexContainer,
  BodyText,
  Button,
  Icon,
  elMr3,
  elMr5,
  elMb5,
  MultiSelectChip,
  elHasGreyChips,
  ElMultiSelectUnSelected,
  elFadeIn,
  SmallText,
} from '@reapit/elements'
import {
  appFiltersButton,
  appFiltersButtonActive,
  appsFiltersMobileBrowseBy,
  appsFiltersCategories,
  appsSearchContainer,
  appsSearchDesktopControls,
  AppsSearchInput,
  appsSearchInputIcon,
  AppsSearchMobileFilterControls,
  appsSearchMobileFilterControlsActive,
} from './__styles__'
import { useReapitGet } from '@reapit/utils-react'
import { CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { cx } from '@linaria/core'
import debounce from 'just-debounce-it'
import { handleMobileControls, MobileControlsToggleState } from './apps-browse'
import { AppsBrowseConfigItemFilters, useAppsBrowseState } from '../../core/use-apps-browse-state'

export interface AppSearchFiltersProps {
  mobileControlsState: MobileControlsToggleState
  setMobileControlsState: Dispatch<SetStateAction<MobileControlsToggleState>>
}

export const handleSelectFilter =
  (
    appsBrowseFilterState: AppsBrowseConfigItemFilters | null,
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFilters | null>>,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value
    const currentFilters = appsBrowseFilterState ?? {}
    const currentCategory = currentFilters.category ?? []

    if (currentCategory.includes(category)) {
      const newCategory = currentCategory.filter((item) => item !== category)

      return setAppsBrowseFilterState({
        ...currentFilters,
        category: newCategory,
      })
    }

    return setAppsBrowseFilterState({
      ...currentFilters,
      category: [...currentCategory, category],
    })
  }

export const handleSearch =
  (setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFilters | null>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const appName = event.target.value.toLowerCase()

    setAppsBrowseFilterState((currentState) => {
      const currentFilters = currentState ?? {}
      return {
        ...currentFilters,
        appName,
      }
    })
  }

export const AppSearchFilters: FC<AppSearchFiltersProps> = ({ mobileControlsState, setMobileControlsState }) => {
  const { appsBrowseFilterState, setAppsBrowseFilterState } = useAppsBrowseState()
  const hasCategories = Boolean(appsBrowseFilterState?.category?.length)

  const [categories] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  const debouncedSearch = useCallback(debounce(handleSearch(setAppsBrowseFilterState), 500), [])

  return (
    <>
      <FlexContainer className={cx(elMb5, appsSearchDesktopControls)} isFlexJustifyBetween>
        <FlexContainer isFlexAlignCenter>
          <BodyText className={elMr5} hasBoldText hasNoMargin>
            Browse By
          </BodyText>
          <Button
            onClick={handleMobileControls(setMobileControlsState, { filters: 'categories' })}
            className={cx(
              appFiltersButton,
              (hasCategories || mobileControlsState.filters === 'categories') && appFiltersButtonActive,
            )}
            intent="low"
          >
            <Icon className={elMr3} icon="appCategoryInfographic" fontSize="1.25rem" />
            App Categories
          </Button>
        </FlexContainer>
        <FlexContainer className={appsSearchContainer} isFlexAlignCenter>
          <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
          <AppsSearchInput type="text" placeholder="Search" onChange={debouncedSearch} />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer isFlexColumn>
        <AppsSearchMobileFilterControls
          className={cx(mobileControlsState.controls !== 'none' && appsSearchMobileFilterControlsActive)}
        >
          {mobileControlsState.controls === 'filters' && (
            <FlexContainer isFlexColumn>
              <SmallText className={appsFiltersMobileBrowseBy} hasNoMargin>
                Browse By
              </SmallText>
              <Button
                onClick={handleMobileControls(setMobileControlsState, { filters: 'categories' })}
                className={cx(
                  appFiltersButton,
                  (hasCategories || mobileControlsState.filters === 'categories') && appFiltersButtonActive,
                )}
                intent="low"
              >
                <Icon className={elMr3} icon="appCategoryInfographic" fontSize="1.25rem" />
                App Categories
              </Button>
            </FlexContainer>
          )}
          {mobileControlsState.controls === 'search' && (
            <FlexContainer className={appsSearchContainer} isFlexAlignCenter>
              <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
              <AppsSearchInput type="text" placeholder="Search" onChange={debouncedSearch} />
            </FlexContainer>
          )}
        </AppsSearchMobileFilterControls>
      </FlexContainer>
      {Boolean(categories?.data?.length) && (
        <ElMultiSelectUnSelected
          className={cx(
            elFadeIn,
            appsFiltersCategories,
            (mobileControlsState.controls !== 'filters' || mobileControlsState.filters === 'none') &&
              appsSearchDesktopControls,
          )}
        >
          {categories?.data?.map(({ id, name }) => (
            <MultiSelectChip
              className={elHasGreyChips}
              id={id}
              key={id}
              name={name}
              value={id}
              onChange={handleSelectFilter(appsBrowseFilterState, setAppsBrowseFilterState)}
            >
              {name}
            </MultiSelectChip>
          ))}
        </ElMultiSelectUnSelected>
      )}
    </>
  )
}

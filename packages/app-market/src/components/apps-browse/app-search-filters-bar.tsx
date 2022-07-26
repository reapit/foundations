import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction, useCallback } from 'react'
import {
  FlexContainer,
  BodyText,
  Icon,
  MultiSelectChip,
  elHasGreyChips,
  ElMultiSelectUnSelected,
  elFadeIn,
  SmallText,
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
} from './__styles__'
import { useReapitGet } from '@reapit/utils-react'
import { CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { cx } from '@linaria/core'
import debounce from 'just-debounce-it'
import { MobileControlsState } from './apps-browse'
import { AppsBrowseConfigItemFilters, useAppsBrowseState } from '../../core/use-apps-browse-state'

export interface AppSearchFiltersProps {
  mobileControlsState: MobileControlsState
  setMobileControlsState: Dispatch<SetStateAction<MobileControlsState>>
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

export const AppSearchFilters: FC<AppSearchFiltersProps> = memo(({ mobileControlsState }) => {
  const { appsBrowseFilterState, setAppsBrowseFilterState } = useAppsBrowseState()
  const [categories] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  const debouncedSearch = useCallback(debounce(handleSearch(setAppsBrowseFilterState), 500), [])

  return (
    <>
      <FlexContainer isFlexColumn>
        {mobileControlsState === 'search' && (
          <AppsSearchMobileFilterControls className={cx(mobileControlsState && appsSearchMobileFilterControlsActive)}>
            <FlexContainer className={appsSearchContainer} isFlexAlignCenter>
              <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
              <AppsSearchInput type="text" placeholder="Search" onChange={debouncedSearch} />
            </FlexContainer>
          </AppsSearchMobileFilterControls>
        )}
        {mobileControlsState === 'filters' && (
          <SmallText className={appsFiltersMobileBrowseBy} hasNoMargin>
            Browse By
          </SmallText>
        )}
      </FlexContainer>
      <FlexContainer isFlexJustifyBetween>
        <BodyText className={appsSearchDesktopControls} hasBoldText>
          Browse By
        </BodyText>
      </FlexContainer>
      {Boolean(categories?.data?.length) && (
        <ElMultiSelectUnSelected
          className={cx(
            elFadeIn,
            appsFiltersCategories,
            mobileControlsState !== 'filters' && appsSearchDesktopControls,
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
      <FlexContainer className={cx(appsSearchContainer, appsSearchDesktopControls)} isFlexAlignCenter>
        <Icon className={appsSearchInputIcon} icon="searchSystem" fontSize="1.25rem" />
        <AppsSearchInput type="text" placeholder="Search" onChange={debouncedSearch} />
      </FlexContainer>
    </>
  )
})

import { elMb5, FlexContainer, Icon, IconNames, MediaType, useMediaQuery } from '@reapit/elements'
import {
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  CategoryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import React, { Dispatch, FC, memo, SetStateAction, useCallback, useMemo } from 'react'
import { trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { AppFilterCol, AppFilterSubtitle, AppFilterStrapline } from './__styles__'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItemInterface
}

export const handleSetFilters =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    appsBrowseCategoriesState: CategoryModelPagedResult | null,
    filters?: AppsBrowseConfigItemFiltersInterface | null,
  ) =>
  () => {
    if (filters) {
      setAppsBrowseFilterState(filters)

      const category = filters.category
      const categoryNames = category?.map((categoryItem) => {
        const foundCategory = appsBrowseCategoriesState?.data?.find((stateItem) => stateItem.id === categoryItem)
        return foundCategory?.name ?? ''
      })

      filters.category = categoryNames

      trackEvent(TrackingEvent.ClickFiltersTile, true, { filters })
    }
  }

export const handleIconSize = (mediaQuery: MediaType) => () => {
  const { isMobile } = mediaQuery

  if (isMobile) return '3.75em'

  return '5em'
}

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = memo(({ configItem }) => {
  const { setAppsBrowseFilterState, appsBrowseCategoriesState } = useAppsBrowseState()
  const mediaQuery = useMediaQuery()
  const iconSize = useMemo(handleIconSize(mediaQuery), [mediaQuery])
  const { content, filters } = configItem

  const setFilters = useCallback(handleSetFilters(setAppsBrowseFilterState, appsBrowseCategoriesState, filters), [
    filters,
    appsBrowseCategoriesState,
  ])

  return (
    <AppFilterCol onClick={setFilters}>
      <FlexContainer isFlexColumn>
        <Icon className={elMb5} icon={content?.iconName as IconNames} fontSize={iconSize} />
        <FlexContainer isFlexColumn isFlexJustifyCenter>
          <AppFilterSubtitle>{content?.title}</AppFilterSubtitle>
          <AppFilterStrapline>{content?.strapline}</AppFilterStrapline>
        </FlexContainer>
      </FlexContainer>
    </AppFilterCol>
  )
})

import { elMb5, FlexContainer, Icon, IconNames, MediaType, useMediaQuery } from '@reapit/elements'
import {
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  CategoryModel,
} from '@reapit/foundations-ts-definitions'
import React, { Dispatch, FC, memo, SetStateAction, useCallback, useMemo } from 'react'
import { trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { AppFilterCol, AppFilterSubtitle, AppFilterStrapline } from './__styles__'
import { History } from 'history'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItemInterface
}

export const handleSetFilters =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    appsBrowseCategoriesState: CategoryModel[],
    history: History,
    configItem: AppsBrowseConfigItemInterface,
  ) =>
  () => {
    const { filters, id } = configItem
    if (filters) {
      setAppsBrowseFilterState(filters)

      const category = filters.category
      const categoryNames = category?.map((categoryItem) => {
        const foundCategory = appsBrowseCategoriesState.find((stateItem) => stateItem.id === categoryItem)
        return foundCategory?.name ?? ''
      })

      filters.category = categoryNames
      history.push(`${Routes.APPS_BROWSE}?collectionId=${id}`)

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
  const history = useHistory()
  const mediaQuery = useMediaQuery()
  const iconSize = useMemo(handleIconSize(mediaQuery), [mediaQuery])
  const { content } = configItem

  const setFilters = useCallback(
    handleSetFilters(setAppsBrowseFilterState, appsBrowseCategoriesState, history, configItem),
    [configItem, appsBrowseCategoriesState],
  )

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

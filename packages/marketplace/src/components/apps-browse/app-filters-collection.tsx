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
import { NavigateFunction } from 'react-router'
import { RoutePaths } from '../../constants/routes'
import { useNavigate } from 'react-router'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItemInterface
}

export const handleSetFilters =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    appsBrowseCategoriesState: CategoryModel[],
    navigate: NavigateFunction,
    configItem: AppsBrowseConfigItemInterface,
  ) =>
  () => {
    const { filters, id, content } = configItem
    if (filters) {
      setAppsBrowseFilterState(filters)

      const category = filters.category
      const categoryNames = category?.map((categoryItem) => {
        const foundCategory = appsBrowseCategoriesState.find((stateItem) => stateItem.id === categoryItem)
        return foundCategory?.name ?? ''
      })

      filters.category = categoryNames
      navigate(`${RoutePaths.APPS_BROWSE}?collectionId=${id}`)

      trackEvent(TrackingEvent.ClickCollectionsTile, true, {
        filters,
        collectionTitle: content?.title,
        collectionId: id,
      })
    }
  }

export const handleIconSize = (mediaQuery: MediaType) => () => {
  const { isMobile } = mediaQuery

  if (isMobile) return '60px'

  return '80px'
}

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = memo(({ configItem }) => {
  const { setAppsBrowseFilterState, appsBrowseCategoriesState } = useAppsBrowseState()
  const navigate = useNavigate()
  const mediaQuery = useMediaQuery()
  const iconSize = useMemo(handleIconSize(mediaQuery), [mediaQuery])
  const { content } = configItem

  const setFilters = useCallback(
    handleSetFilters(setAppsBrowseFilterState, appsBrowseCategoriesState, navigate, configItem),
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

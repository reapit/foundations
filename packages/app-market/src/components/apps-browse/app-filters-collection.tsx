import { cx } from '@linaria/core'
import { elMb5, elMr7, FlexContainer, Icon, IconNames, MediaType, useMediaQuery } from '@reapit/elements'
import { AppsBrowseConfigItemFiltersInterface, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import React, { Dispatch, FC, memo, SetStateAction, useCallback, useMemo } from 'react'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { AppFilterCol, AppFilterSubtitle, AppFilterStrapline } from './__styles__'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItemInterface
}

export const handleSetFilters =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>,
    filters?: AppsBrowseConfigItemFiltersInterface | null,
  ) =>
  () => {
    if (filters) {
      setAppsBrowseFilterState(filters)
    }
  }

export const handleIconSize = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaQuery

  if (isMobile) return '3.75em'
  if (isTablet || isDesktop) return '5em'
  if (isWideScreen) return '6.25em'

  return '7.5em'
}

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = memo(({ configItem }) => {
  const { setAppsBrowseFilterState } = useAppsBrowseState()
  const mediaQuery = useMediaQuery()
  const iconSize = useMemo(handleIconSize(mediaQuery), [mediaQuery])
  const { content, filters } = configItem
  const { isSuperWideScreen, is4KScreen } = mediaQuery
  const isFullSizeScreen = isSuperWideScreen || is4KScreen

  const setFilters = useCallback(handleSetFilters(setAppsBrowseFilterState, filters), [filters])

  return (
    <AppFilterCol onClick={setFilters}>
      <FlexContainer isFlexColumn={!isFullSizeScreen}>
        <Icon
          className={cx(isFullSizeScreen ? elMr7 : elMb5)}
          icon={content?.iconName as IconNames}
          fontSize={iconSize}
        />
        <FlexContainer isFlexColumn isFlexJustifyCenter>
          <AppFilterSubtitle>{content?.title}</AppFilterSubtitle>
          <AppFilterStrapline>{content?.strapline}</AppFilterStrapline>
        </FlexContainer>
      </FlexContainer>
    </AppFilterCol>
  )
})

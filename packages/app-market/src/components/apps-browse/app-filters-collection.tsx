import { elMb5, FlexContainer, Icon, IconNames, useMediaQuery } from '@reapit/elements'
import React, { Dispatch, FC, memo, SetStateAction, useCallback } from 'react'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters, useAppsBrowseState } from '../../core/use-apps-browse-state'
import { AppFilterCol, AppFilterSubtitle, AppFilterStrapline } from './__styles__'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const handleSetFilters =
  (
    setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFilters | null>>,
    filters: AppsBrowseConfigItemFilters | null,
  ) =>
  () => {
    setAppsBrowseFilterState(filters)
  }

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = memo(({ configItem }) => {
  const { setAppsBrowseFilterState } = useAppsBrowseState()
  const { isMobile } = useMediaQuery()
  const iconSize = isMobile ? '3.75em' : '5em'
  const { content, filters } = configItem

  const setFilters = useCallback(handleSetFilters(setAppsBrowseFilterState, filters), [filters])

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

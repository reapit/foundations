import { BodyText, FlexContainer, Icon, IconNames } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters, useAppsBrowseState } from '../../core/use-apps-browse-state'
import { AppFilterCol, appTitleThreeLine, appTitleOneLine } from './__styles__'

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

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = ({ configItem }) => {
  const { setAppsBrowseFilterState } = useAppsBrowseState()
  const { content, filters } = configItem

  return (
    <AppFilterCol onClick={handleSetFilters(setAppsBrowseFilterState, filters)}>
      <FlexContainer isFlexJustifyBetween>
        <FlexContainer isFlexColumn isFlexJustifyCenter>
          <BodyText className={appTitleOneLine} hasBoldText>
            {content?.title}
          </BodyText>
          <BodyText className={appTitleThreeLine} hasGreyText hasNoMargin>
            {content?.strapline}
          </BodyText>
        </FlexContainer>
        <Icon icon={content?.iconName as IconNames} fontSize="8.125em" />
      </FlexContainer>
    </AppFilterCol>
  )
}

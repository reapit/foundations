import { cx } from '@linaria/core'
import { BodyText, elMb5, FlexContainer, Icon, IconNames } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters, useAppsBrowseState } from '../../core/use-apps-browse-state'
import { AppFilterCol, appTitleThreeLine, appTitleOneLine, appFilterTitle } from './__styles__'

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
      <FlexContainer isFlexColumn>
        <Icon className={elMb5} icon={content?.iconName as IconNames} fontSize="3.75em" />
        <FlexContainer isFlexColumn isFlexJustifyCenter>
          <BodyText className={cx(appTitleOneLine, appFilterTitle)} hasBoldText hasNoMargin>
            {content?.title}
          </BodyText>
          <BodyText className={appTitleThreeLine} hasGreyText hasNoMargin>
            {content?.strapline}
          </BodyText>
        </FlexContainer>
      </FlexContainer>
    </AppFilterCol>
  )
}

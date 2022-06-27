import { BodyText, FlexContainer, Icon, IconNames } from '@reapit/elements'
import React, { FC } from 'react'
import { AppsBrowseConfigItem } from './use-apps-browse-state'
import { AppFilterCol, appTitleThreeLine, appTitleOneLine } from './__styles__'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = ({ configItem }) => {
  const { content } = configItem

  return (
    <AppFilterCol>
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

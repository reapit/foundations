import { BodyText, FlexContainer, Icon, IconNames } from '@reapit/elements'
import React, { FC } from 'react'
import { AppsBrowseConfigItem } from './use-apps-browse-state'
import { AppFilterCollectionContainer } from './__styles__'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = ({ configItem }) => {
  const { filters, content } = configItem

  console.log('App Filters: ', filters, content)

  return (
    <AppFilterCollectionContainer>
      <FlexContainer isFlexJustifyBetween>
        <FlexContainer isFlexColumn isFlexJustifyCenter>
          <BodyText hasBoldText>{content?.title}</BodyText>
          <BodyText hasGreyText hasNoMargin>
            {content?.strapline}
          </BodyText>
        </FlexContainer>
        <Icon icon={content?.iconName as IconNames} fontSize="8.125em" />
      </FlexContainer>
    </AppFilterCollectionContainer>
  )
}

import React, { FC } from 'react'
import { BodyText, FormLayout, InputGroup, InputWrap, Subtitle } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'

export const PermissionsTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  return (
    <>
      <Subtitle>General info</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup icon="homeSystem" label="Address" type="text" />
        </InputWrap>
      </FormLayout>
    </>
  )
}

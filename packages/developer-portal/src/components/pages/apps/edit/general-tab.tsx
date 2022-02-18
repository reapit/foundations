import React, { FC } from 'react'
import { BodyText, FormLayout, InputGroup, InputWrap, Subtitle } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'

export const GeneralTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { name } = formFields
  return (
    <>
      <Subtitle>General Info</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup {...name} {...register('name')} errorMessage={errors?.name?.message} />
        </InputWrap>
      </FormLayout>
    </>
  )
}

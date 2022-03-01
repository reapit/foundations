import React, { FC } from 'react'
import { BodyText, FormLayout, InputGroup, InputWrapFull, Subtitle } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'

export const AuthenticationTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { redirectUris, signoutUris } = formFields
  return (
    <>
      <Subtitle>Authentication</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup {...redirectUris} {...register('redirectUris')} errorMessage={errors?.redirectUris?.message} />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup {...signoutUris} {...register('signoutUris')} errorMessage={errors?.signoutUris?.message} />
        </InputWrapFull>
      </FormLayout>
    </>
  )
}

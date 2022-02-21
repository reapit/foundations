import React, { FC } from 'react'
import { BodyText, FormLayout, InputGroup, InputWrap, Subtitle } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'

export const GeneralTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { name, isPrivateApp, limitToClientIds, isListed, isDirectApi } = formFields
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
        <InputWrap>
          <InputGroup {...isPrivateApp} {...register('isPrivateApp')} errorMessage={errors?.isPrivateApp?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...limitToClientIds}
            {...register('limitToClientIds')}
            errorMessage={errors?.limitToClientIds?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup {...isListed} {...register('isListed')} errorMessage={errors?.isListed?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup {...isDirectApi} {...register('isDirectApi')} errorMessage={errors?.isDirectApi?.message} />
        </InputWrap>
      </FormLayout>
    </>
  )
}

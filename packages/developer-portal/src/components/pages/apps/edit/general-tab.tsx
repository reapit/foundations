import React, { FC } from 'react'
import {
  BodyText,
  ElToggleItem,
  FormLayout,
  InputGroup,
  InputWrap,
  InputWrapFull,
  Label,
  Subtitle,
  Toggle,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { useAppState } from '../state/use-app-state'
import { listingInCompletion } from '../utils/listing-in-completion'

export const GeneralTab: FC<AppEditTabsProps> = ({ register, errors, getValues }) => {
  const { appsDataState } = useAppState()
  const formValues = getValues()
  const hasCompletedValues = listingInCompletion(formValues)
  const { name, isPrivateApp, limitToClientIds, isListed, isAgencyCloudIntegrated, isCompletingListing } = formFields

  return (
    <>
      <Subtitle>General Info</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup {...name} {...register('name')} errorMessage={errors?.name?.message} />
        </InputWrapFull>
        <InputWrap>
          <InputGroup>
            <Label>{isListed.label}</Label>
            <Toggle id="app-edit-is-listed" {...register('isListed')} hasGreyBg>
              <ElToggleItem>Yes</ElToggleItem>
              <ElToggleItem>No</ElToggleItem>
            </Toggle>
          </InputGroup>
        </InputWrap>
        <InputWrap>
          {hasCompletedValues || formValues.isListed ? (
            <>
              <Label>{isCompletingListing.label}</Label>
              <BodyText>App Listing Under Completion</BodyText>
            </>
          ) : (
            <InputGroup>
              <Label>{isCompletingListing.label}</Label>
              <Toggle id="app-edit-completing-listing" {...register('isCompletingListing')} hasGreyBg>
                <ElToggleItem>Yes</ElToggleItem>
                <ElToggleItem>No</ElToggleItem>
              </Toggle>
            </InputGroup>
          )}
        </InputWrap>
        {appsDataState.appDetail?.authFlow === 'authorisationCode' && (
          <InputWrap>
            <InputGroup>
              <Label>{isAgencyCloudIntegrated.label}</Label>
              <Toggle id="app-edit-is-ac-inegrated" {...register('isAgencyCloudIntegrated')} hasGreyBg>
                <ElToggleItem>Yes</ElToggleItem>
                <ElToggleItem>No</ElToggleItem>
              </Toggle>
            </InputGroup>
          </InputWrap>
        )}
        <InputWrap>
          <InputGroup>
            <Label>{isPrivateApp.label}</Label>
            <Toggle id="app-edit-is-private-app" {...register('isPrivateApp')} hasGreyBg>
              <ElToggleItem>Yes</ElToggleItem>
              <ElToggleItem>No</ElToggleItem>
            </Toggle>
          </InputGroup>
        </InputWrap>
        <InputWrapFull>
          <InputGroup
            {...limitToClientIds}
            {...register('limitToClientIds')}
            errorMessage={errors?.limitToClientIds?.message}
          />
        </InputWrapFull>
      </FormLayout>
    </>
  )
}

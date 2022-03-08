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
import Routes from '../../../../constants/routes'
import { Link } from 'react-router-dom'
import { ExternalPages, openNewPage } from '../../../../utils/navigation'

export const GeneralTab: FC<AppEditTabsProps> = ({ register, errors, getValues }) => {
  const { appsDataState, appId } = useAppState()
  const formValues = getValues()
  const hasCompletedValues = listingInCompletion(formValues)
  const { name, isPrivateApp, limitToClientIds, isListed, isAgencyCloudIntegrated, isCompletingListing } = formFields

  return (
    <>
      <Subtitle>General Info</Subtitle>
      <BodyText hasGreyText>
        You already have supplied enough details to get started with our APIs and if you just want to develop your app,
        you should visit the <Link to={`${Routes.APPS}/${appId}`}>App Detail page</Link> to obtain your Client Id.
      </BodyText>
      <BodyText hasGreyText>
        This page is the starting point for completing your app listing, and initiating the approvals process for your
        app to go live with customer data. For information on listing your app{' '}
        <a onClick={openNewPage(ExternalPages.listingAppDocs)}>see here</a>. If you are looking for guidance on what we
        look for when reviewing app, there is a dedicated page{' '}
        <a onClick={openNewPage(ExternalPages.reviewingAppDocs)}>here.</a>
      </BodyText>
      <BodyText hasGreyText hasSectionMargin>
        As you make changes, you should save your changes in the left hand side menu. You can do this as many times as
        you like until your app is listed, or live in the AppMarket. From this point on, you will need to create
        revisions to your app for our team to review. You can only have one live revision outstanding at any given time.
      </BodyText>
      <Subtitle>App Name</Subtitle>
      <BodyText hasGreyText>
        Your app name can be anything as long as it is unique in our database. By default we auto generate one from your
        company name and some randomised words. You should change it to something memorable to you and your customers.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup {...name} {...register('name')} errorMessage={errors?.name?.message} />
        </InputWrapFull>
      </FormLayout>
      <Subtitle>App Listings</Subtitle>
      <BodyText hasGreyText>
        The toggles below will depend on how far you are progressing with the development of your app.
      </BodyText>
      <BodyText hasGreyText>
        You should toggle &lsquo;Completing App Listing&rsquo; when you are ready to start completing the app listing
        information. This will enable you to start completing it without the fields being required and you can save at
        any point.
      </BodyText>
      {appsDataState.appDetail?.authFlow === 'authorisationCode' && (
        <BodyText hasGreyText>
          You should toggle &lsquo;AgencyCloud Integration&rsquo; only if you are intending your app to be launched as
          replacement screen from within AgencyCloud
        </BodyText>
      )}
      <BodyText hasGreyText>
        You should toggle &lsquo;AppMarket Listed&rsquo; when you are ready to submit your app for review. This will
        make all relevant fields required before saving and will notify our team that it is ready to review. When you
        app has been reviewed and accepted, you can de-list your app by toggling again and saving the app.
      </BodyText>
      <BodyText hasGreyText>
        You should toggle &lsquo;Private App&rsquo; if you only want your app to be private to a select group of
        customers. You should enter their client codes from the installations table as a comma separated list.
      </BodyText>
      <FormLayout hasMargin>
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
            <Label>{isListed.label}</Label>
            <Toggle id="app-edit-is-listed" {...register('isListed')} hasGreyBg>
              <ElToggleItem>Yes</ElToggleItem>
              <ElToggleItem>No</ElToggleItem>
            </Toggle>
          </InputGroup>
        </InputWrap>
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

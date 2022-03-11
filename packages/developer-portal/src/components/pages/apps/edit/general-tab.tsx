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
import Routes from '../../../../constants/routes'
import { Link } from 'react-router-dom'
import { ExternalPages, openNewPage } from '../../../../utils/navigation'

export const GeneralTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { appsDataState, appId } = useAppState()
  const isPublicListed = appsDataState.appDetail?.isListed
  const { name, isListed } = formFields

  return (
    <>
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
      {isPublicListed && (
        <BodyText hasGreyText>
          You can toggle &lsquo;AppMarket Listed&rsquo; if your app is publicly listed in the AppMarket.
        </BodyText>
      )}
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup {...name} {...register('name')} errorMessage={errors?.name?.message} />
        </InputWrapFull>
        {isPublicListed && (
          <InputWrap>
            <InputGroup>
              <Label>{isListed.label}</Label>
              <Toggle id="app-edit-is-listed" {...register('isListed')} hasGreyBg>
                <ElToggleItem>Yes</ElToggleItem>
                <ElToggleItem>No</ElToggleItem>
              </Toggle>
            </InputGroup>
          </InputWrap>
        )}
      </FormLayout>
    </>
  )
}

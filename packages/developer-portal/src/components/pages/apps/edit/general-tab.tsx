import React, { FC } from 'react'
import {
  BodyText,
  Button,
  ColSplit,
  elMb10,
  ElToggleItem,
  FormLayout,
  Grid,
  Icon,
  InputGroup,
  InputWrap,
  Label,
  Subtitle,
  Toggle,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { useAppState } from '../state/use-app-state'
import Routes from '../../../../constants/routes'
import { Link, useHistory } from 'react-router-dom'
import { ExternalPages, navigate, openNewPage } from '../../../../utils/navigation'
import { IconContainer } from './__styles__'

export const GeneralTab: FC<AppEditTabsProps> = ({ register }) => {
  const { appsDataState, appId } = useAppState()
  const history = useHistory()
  const isPublicListed = appsDataState.appDetail?.isListed
  const { isListed } = formFields

  return (
    <>
      <Grid>
        <ColSplit>
          <IconContainer className={elMb10}>
            <Icon icon="editAppInfographic" fontSize="8.75em" />
          </IconContainer>
          <Subtitle>Manage App Listing</Subtitle>
          <BodyText hasGreyText>
            Our webhooks system allows your application to directly subscribe to events happening in our customers data.
            Rather than needing to make API calls to poll for new information, a webhook subscription can be created to
            allow Reapit Foundations to send a HTTP request directly to your endpoints that you configure here.
          </BodyText>
          <Button chevronRight intent="critical" onClick={navigate(history, Routes.WEBHOOKS_NEW)}>
            Check Status
          </Button>
        </ColSplit>
        <ColSplit>
          <IconContainer className={elMb10}>
            <Icon icon="docsInfographic" fontSize="8.75em" />
          </IconContainer>
          <Subtitle>App Listing Documentation</Subtitle>
          <BodyText hasGreyText>
            This system is designed to work flexibly with your application. If you wish, you can set up a single
            endpoint to catch all topics for all customers. Alternatively, you may wish to set up a different webhook
            subscription per topic or per customer. For more information about Webhooks, please see our{' '}
            <a href={ExternalPages.webhooksDocs} target="_blank" rel="noreferrer">
              webhooks documentation.
            </a>
          </BodyText>
          <Button intent="low" onClick={openNewPage(ExternalPages.listingAppDocs)}>
            View Docs
          </Button>
        </ColSplit>
      </Grid>
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
      {isPublicListed && (
        <BodyText hasGreyText>
          You can toggle &lsquo;AppMarket Listed&rsquo; if your app is publicly listed in the AppMarket.
        </BodyText>
      )}
      <FormLayout hasMargin>
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

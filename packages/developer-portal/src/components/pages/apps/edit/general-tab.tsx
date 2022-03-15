import React, { FC, MouseEvent } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  ColSplit,
  elMb10,
  elMb6,
  elMb7,
  Grid,
  Icon,
  Subtitle,
  useModal,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { ExternalPages, openNewPage } from '../../../../utils/navigation'
import { IconContainer } from './__styles__'
import { formFields } from './form-schema/form-fields'
import { PermissionChip } from '../detail/__styles__'
import { getAppStatus, getIntegrationType } from '../detail'
import { useAppState } from '../state/use-app-state'

export const handleOpenModal = (openModal: () => void) => (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  openModal()
}

export const GeneralTab: FC<AppEditTabsProps> = () => {
  const { appsDataState, appEditState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const appDetail = appsDataState.appDetail ?? {}
  const { appUnsavedFields, appIncompleteFields } = appEditState

  return (
    <>
      <Grid>
        <ColSplit>
          <IconContainer className={elMb10}>
            <Icon icon="editAppInfographic" fontSize="8.75em" />
          </IconContainer>
          <Subtitle>Manage App Listing</Subtitle>
          <BodyText hasGreyText>
            This page is the starting point for completing your app listing, and initiating the approvals process for
            your app to go live with customer data.
          </BodyText>
          <BodyText hasGreyText>
            As an app developer, you need to provide us with a number of peices of information about your integration
            and have it approved by our team, prior to going live with customer data. For apps that wish to integrate
            with the AgencyCloud CRM, and be publically listed in the AppMarket, the approvals process is more involved
            than for simple server-side or single customer private apps. Regardless of your target audience, you should
            start to complete your app listing as soon as possible.
          </BodyText>
          <BodyText hasGreyText>
            You can check the status of your app listing at any time by using the button below, prior to submitting for
            approval.
          </BodyText>
          <Button chevronRight intent="critical" onClick={handleOpenModal(openModal)}>
            Check Status
          </Button>
        </ColSplit>
        <ColSplit>
          <IconContainer className={elMb10}>
            <Icon icon="docsInfographic" fontSize="8.75em" />
          </IconContainer>
          <Subtitle>App Listing Documentation</Subtitle>
          <BodyText hasGreyText>
            As you make changes, you should save your changes in the left hand side menu. You can do this as many times
            as you like until your app is listed, or live in the AppMarket.
          </BodyText>
          <BodyText hasGreyText>
            When you are ready for your app to be reviewed by a member of our team, click the &lsquo;Submit
            Review&rsquo; button. If you are looking for guidance on what we look for when reviewing app, there is a
            dedicated page <a onClick={openNewPage(ExternalPages.reviewingAppDocs)}>here.</a>
          </BodyText>
          <BodyText hasGreyText>
            When your app is live, you will need to create revisions to your app for our team to review. You can only
            have one live revision outstanding at any given time.
          </BodyText>
          <BodyText hasGreyText>
            For guidlines on completing your app listing, visit the documentation link below before getting started.
          </BodyText>
          <Button intent="low" onClick={openNewPage(ExternalPages.listingAppDocs)}>
            View Docs
          </Button>
        </ColSplit>
      </Grid>
      <Modal title="App Listing Status">
        <div className={elMb7}>
          <Subtitle hasNoMargin>Integration Type</Subtitle>
          <BodyText hasGreyText>{getIntegrationType(appDetail)}</BodyText>
          <Subtitle hasNoMargin>AppMarket Status</Subtitle>
          <BodyText hasGreyText>{getAppStatus(appDetail)}</BodyText>
          <Subtitle hasNoMargin>App Listing Status</Subtitle>
          {appIncompleteFields.length ? (
            <div className={elMb6}>
              <BodyText hasGreyText>
                The following fields in your app listing must be completed before you can submit for review:
              </BodyText>
              {appIncompleteFields.map((field) => (
                <PermissionChip key={field}>{formFields[field].label}</PermissionChip>
              ))}
            </div>
          ) : (
            <BodyText hasGreyText>
              Your app listing data is complete and you can submit for review at any time.
            </BodyText>
          )}
          <Subtitle hasNoMargin>Unsaved Changes</Subtitle>
          {Object.keys(appUnsavedFields).length ? (
            <>
              <BodyText hasGreyText>The following fields have been edited, save to avoid losing data:</BodyText>
              {Object.keys(appUnsavedFields).map((field) => (
                <PermissionChip key={field}>{formFields[field].label}</PermissionChip>
              ))}
            </>
          ) : (
            <BodyText hasGreyText>You have no unsaved changes to your app listing</BodyText>
          )}
        </div>
        <ButtonGroup alignment="right">
          <Button intent="low" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}

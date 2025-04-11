import React, { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react'
import { BodyText, Button, ButtonGroup, ColSplit, elMb6, elMb7, Grid, Subtitle, useModal } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { ExternalPages, openNewPage } from '../../../utils/navigation'
import { formFields } from './form-schema/form-fields'
import { PermissionChip } from '../detail/__styles__'
import { getAppStatus, getIntegrationType } from '../detail'
import { useAppState } from '../state/use-app-state'
import { ManageAppListingGraphic } from './manage-app-listing-graphic'
import { AppListingDocsGraphic } from './app-listing-docs-graphic'

export const handleOpenModal = (openModal: () => void) => (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  openModal()
}

export const handleMouseOver = (setIsAnimated: Dispatch<SetStateAction<boolean>>, isAnimated: boolean) => () => {
  setIsAnimated(isAnimated)
}

export const GeneralTab: FC<AppEditTabsProps> = () => {
  const { appsDataState, appEditState } = useAppState()
  const [manageIsAnimated, setManageIsAnimated] = useState<boolean>(false)
  const [docsIsAnimated, setDocsIsAnimated] = useState<boolean>(false)
  const { Modal, openModal, closeModal } = useModal()
  const appDetail = appsDataState.appDetail ?? {}
  const { appUnsavedFields, appIncompleteFields } = appEditState

  return (
    <>
      <Grid>
        <ColSplit>
          <ManageAppListingGraphic isAnimated={manageIsAnimated} />
          <Subtitle>Manage App Listing</Subtitle>
          <BodyText hasGreyText>
            This page is the starting point for completing your app listing, and initiating the approvals process for
            your app to go live with customer data.
          </BodyText>
          <BodyText hasGreyText>
            As an app developer, you need to provide us with a number of pieces of information about your integration
            and have it approved by our team, prior to going live with customer data. For apps that wish to integrate
            with the Reapit CRM, and be publicly listed in the AppMarket, the approvals process is more involved than
            for simple server-side or single customer private apps. Regardless of your target audience, you should start
            to complete your app listing as soon as possible.
          </BodyText>
          <BodyText hasGreyText>
            You can check the status of your app listing at any time by using the button below, prior to submitting for
            approval.
          </BodyText>
          <Button
            intent="primary"
            onMouseEnter={handleMouseOver(setManageIsAnimated, true)}
            onMouseLeave={handleMouseOver(setManageIsAnimated, false)}
            onClick={handleOpenModal(openModal)}
          >
            Check Status
          </Button>
        </ColSplit>
        <ColSplit>
          <AppListingDocsGraphic isAnimated={docsIsAnimated} />
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
            For guidelines on completing your app listing, visit the documentation link below before getting started.
          </BodyText>
          <Button
            intent="default"
            onMouseEnter={handleMouseOver(setDocsIsAnimated, true)}
            onMouseLeave={handleMouseOver(setDocsIsAnimated, false)}
            onClick={openNewPage(ExternalPages.listingAppDocs)}
          >
            View Docs
          </Button>
        </ColSplit>
      </Grid>
      <Modal title="App Listing Status">
        <div className={elMb7}>
          <BodyText hasNoMargin>Integration Type</BodyText>
          <BodyText hasGreyText>{getIntegrationType(appDetail)}</BodyText>
          <BodyText hasNoMargin>AppMarket Status</BodyText>
          <BodyText hasGreyText>{getAppStatus(appDetail)}</BodyText>
          <BodyText hasNoMargin>App Listing Status</BodyText>
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
          <BodyText hasNoMargin>Unsaved Changes</BodyText>
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
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}

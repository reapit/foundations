import { Button, elFadeIn, elMb3, Icon, SmallText, Subtitle } from '@reapit/elements'
import { AppRevisionModelPagedResult, RejectRevisionModel } from '@reapit/foundations-ts-definitions'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { openNewPage, ExternalPages } from '../../../utils/navigation'
import { AppSavingParams, useAppState } from '../state/use-app-state'
import { getCurrentPage } from '../utils/get-current-page'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { getTitle, SubmitReviewModal } from './submit-review-modal'
import { useModal } from '@reapit/elements'
import { selectIsCustomer } from '../../../utils/auth'
import { defaultAppSavingParams } from '../state/defaults'
import { PipelineControls } from '../pipeline/pipeline-controls'
import { useGlobalState } from '../../../core/use-global-state'
import { DownloadInstallationsCSV } from '../installations/download-installations-csv'

export const handleSetAppEditSaving =
  (
    setAppEditSaving: Dispatch<SetStateAction<AppSavingParams>>,
    isListed: boolean,
    openModal: () => void,
    developerStatus?: string,
  ) =>
  () => {
    if (developerStatus === 'confirmed' || !isListed) {
      return setAppEditSaving({
        ...defaultAppSavingParams,
        isRevalidating: true,
        isListed,
      })
    }

    setAppEditSaving({
      ...defaultAppSavingParams,
      isRevalidating: true,
    })

    openModal()
  }

export const handleCancelPendingRevsion =
  (
    cancelRevision: SendFunction<RejectRevisionModel, boolean | null>,
    connectSession: ReapitConnectSession | null,
    revisionId: string | null,
  ) =>
  () => {
    if (revisionId) {
      cancelRevision({
        name: connectSession?.loginIdentity.name,
        email: connectSession?.loginIdentity.email,
        rejectionReason: 'Cancelled by developer',
        rejectedByDeveloper: true,
      })
    }
  }

export const handleSetRevisionId =
  (appRevisions: AppRevisionModelPagedResult | null, setRevisionId: Dispatch<SetStateAction<string | null>>) => () => {
    if (appRevisions?.data && appRevisions.data[0] && appRevisions.data[0].id) {
      setRevisionId(appRevisions.data[0].id)
    }
  }

export const handleCancelSuccess =
  (
    appsDetailRefresh: () => void,
    setRevisionId: Dispatch<SetStateAction<string | null>>,
    appRefreshRevisions: () => void,
    success?: boolean,
  ) =>
  () => {
    if (success) {
      appsDetailRefresh()
      appRefreshRevisions()
      setRevisionId(null)
    }
  }

export const Helper: FC = () => {
  const location = useLocation()
  const { appId, appEditState, appsDataState } = useAppState()
  const { globalDataState, globalRefreshCurrentDeveloper } = useGlobalState()
  const [revisionId, setRevisionId] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal } = useModal()
  const isCustomer = selectIsCustomer(connectSession)
  const { pathname } = location
  const { isAppsEdit, isAppsDetail, isAppPipelines, isAppConsents, isAppsInstallations } = getCurrentPage(pathname)
  const { currentDeveloper } = globalDataState
  const { setAppEditSaving, appUnsavedFields, appIncompleteFields } = appEditState
  const {
    appsDetailRefresh,
    appRefreshRevisions,
    appRevisions,
    appDetail,
    appDetailRefreshing,
    appDetailLoading,
    appRevisionsRefreshing,
  } = appsDataState
  const isCompleted = Boolean(!Object.keys(appIncompleteFields).length)
  const hasRevisions = Boolean(appDetail?.pendingRevisions)
  const isPublicallyListed = Boolean(appsDataState.appDetail?.isListed)
  const isRefreshing = appDetailRefreshing || appRevisionsRefreshing
  const hasUnsavedChanges = Boolean(Object.keys(appUnsavedFields).length)

  const [, , cancelRevision, cancelRevisionSuccess] = useReapitUpdate<RejectRevisionModel, null>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.cancelRevision],
    uriParams: {
      appId,
      revisionId,
    },
  })

  useEffect(handleSetRevisionId(appRevisions, setRevisionId), [appRevisions])

  useEffect(handleCancelSuccess(appsDetailRefresh, setRevisionId, appRefreshRevisions, cancelRevisionSuccess), [
    cancelRevisionSuccess,
  ])

  const developerStatus = currentDeveloper?.status

  if (isAppsEdit) {
    return (
      <div className={elFadeIn}>
        <Icon className={elMb3} icon="editAppInfographic" iconSize="large" />
        {isCompleted && !isPublicallyListed && !appDetailLoading && !hasRevisions ? (
          <>
            <Subtitle>Ready For Review</Subtitle>
            <SmallText hasGreyText>
              As your app listing is now complete, you can submit it for review by one of our team, so you can go live
              with customer data. For more on this process{' '}
              <a onClick={openNewPage(ExternalPages.appApprovalDocs)}>visit here.</a>
            </SmallText>
            <SmallText hasGreyText>
              You also have the option of saving any additional changes as you make them before submitting.
            </SmallText>
            {hasUnsavedChanges && (
              <Button
                className={elMb3}
                intent="primary"
                loading={isRefreshing}
                onClick={handleSetAppEditSaving(setAppEditSaving, false, openModal, developerStatus)}
              >
                Save Changes
              </Button>
            )}
            <Button
              className={elMb3}
              intent="critical"
              loading={isRefreshing}
              onClick={handleSetAppEditSaving(setAppEditSaving, true, openModal, developerStatus)}
              chevronRight
            >
              Submit Review
            </Button>
          </>
        ) : hasRevisions ? (
          <>
            <Subtitle>Revision Outstanding</Subtitle>
            <SmallText hasGreyText>You have recently submitted an app listing revision for approval.</SmallText>
            <SmallText hasGreyText>
              For more on this process <a onClick={openNewPage(ExternalPages.appApprovalDocs)}>visit here.</a>
            </SmallText>
            <SmallText hasGreyText>
              If you no longer want your app revision to be approved, you can cancel below.
            </SmallText>
            <Button
              className={elMb3}
              intent="critical"
              loading={isRefreshing}
              onClick={handleCancelPendingRevsion(cancelRevision, connectSession, revisionId)}
            >
              Cancel Revision
            </Button>
          </>
        ) : isPublicallyListed ? (
          <>
            <Subtitle>Listed Application</Subtitle>
            <SmallText hasGreyText>
              As your app is live with customer data, you will need to submit any app changes for approval by one of our
              team. For more on this process <a onClick={openNewPage(ExternalPages.appApprovalDocs)}>visit here.</a>
            </SmallText>
            <SmallText hasGreyText>
              You also have the option of de-listing your app and reverting to a sandbox only integration.
            </SmallText>
            <Button
              className={elMb3}
              intent="primary"
              loading={isRefreshing}
              onClick={handleSetAppEditSaving(setAppEditSaving, false, openModal, developerStatus)}
            >
              De-list app
            </Button>
            {hasUnsavedChanges && (
              <Button
                className={elMb3}
                intent="critical"
                loading={isRefreshing}
                onClick={handleSetAppEditSaving(setAppEditSaving, true, openModal, developerStatus)}
                chevronRight
              >
                Create Revision
              </Button>
            )}
          </>
        ) : hasUnsavedChanges ? (
          <>
            <Subtitle>Unsaved Changes</Subtitle>
            <SmallText hasGreyText>
              Before you list your app you can save the details at any point below. After app listing, you will have to
              create an app revision for our team to review.
            </SmallText>
            <Button
              className={elMb3}
              intent="primary"
              loading={isRefreshing}
              onClick={handleSetAppEditSaving(setAppEditSaving, false, openModal, developerStatus)}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Subtitle>App Listings</Subtitle>
            <SmallText hasGreyText>Actions will appear below as you perform tasks on this page</SmallText>
          </>
        )}
        <Modal title={getTitle(isCustomer, developerStatus)}>
          {currentDeveloper && (
            <SubmitReviewModal
              developer={currentDeveloper}
              closeModal={closeModal}
              refetchDeveloper={globalRefreshCurrentDeveloper}
            />
          )}
        </Modal>
      </div>
    )
  }

  if (isAppsDetail) {
    return (
      <div className={elFadeIn}>
        <Icon className={elMb3} icon="appMarketInfographic" iconSize="large" />
        <Subtitle>Preview in AppMarket</Subtitle>
        <SmallText hasGreyText>
          Clicking below will take you to your current AppMarket listing, to view your app as users will see it.
        </SmallText>
        <Button
          className={elMb3}
          intent="primary"
          onClick={openNewPage(`${window.reapit.config.marketplaceUrl}/${appId}`)}
        >
          Preview
        </Button>
      </div>
    )
  }

  if (isAppPipelines) {
    return <PipelineControls />
  }

  if (isAppConsents) {
    return (
      <div className={elFadeIn}>
        <Icon className={elMb3} icon="editAppInfographic" iconSize="large" />
        <Subtitle>App Consents</Subtitle>
        <SmallText hasGreyText>
          This page is visible because you have requested new permissions as part of your current outstanding app
          revision. An email will be sent to each of the customers who installed your app, requesting they agree to the
          new permissions you have requested.
        </SmallText>
        <SmallText hasGreyText>
          Each customer will have to agree to the new permission before our team can approve your revision. You can
          either track this process here or reach out to your customer to expedite their response to our message.
        </SmallText>
        <SmallText hasGreyText>You can also request that the email is re-sent to each customer individually.</SmallText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.appPermissionsDocs)}>
          View Docs
        </Button>
      </div>
    )
  }

  if (isAppsInstallations) {
    return (
      <div className={elFadeIn}>
        <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
        <Subtitle>Apps Documentation</Subtitle>
        <SmallText hasGreyText>
          This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
          created an app before or you need help, please take the time to view our getting started guide.
        </SmallText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
          View Docs
        </Button>
        <DownloadInstallationsCSV
          appId={appId as string}
          developerId={connectSession?.loginIdentity.developerId as string}
        />
      </div>
    )
  }

  return (
    <div className={elFadeIn}>
      <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
      <Subtitle>Apps Documentation</Subtitle>
      <SmallText hasGreyText>
        This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
        created an app before or you need help, please take the time to view our getting started guide.
      </SmallText>
      <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
        View Docs
      </Button>
    </div>
  )
}

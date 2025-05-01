import { Button, elFadeIn, elMb3, Icon, SmallText, BodyText, ButtonGroup, elMb7 } from '@reapit/elements'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { Dispatch, FC, SetStateAction, useEffect, useState, MouseEvent } from 'react'
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { openNewPage, ExternalPages } from '../../../utils/navigation'
import { AppSavingParams, useAppState } from '../state/use-app-state'
import { getCurrentPage } from '../utils/get-current-page'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { getTitle, SubmitReviewModal } from './submit-review-modal'
import { useModal } from '@reapit/elements'
import { selectIsCustomer, selectIsDeveloperAdmin } from '../../../utils/auth'
import { defaultAppSavingParams } from '../state/defaults'
import { PipelineControls } from '../pipeline/pipeline-controls'
import { useGlobalState } from '../../../core/use-global-state'
import { DownloadInstallationsCSV } from '../installations/download-installations-csv'
import Routes from '../../../constants/routes'
import { cx } from '@linaria/core'

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
    cancelRevision: SendFunction<Marketplace.RejectRevisionModel, boolean | null>,
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
  (
    appRevisions: Marketplace.AppRevisionModelPagedResult | null,
    setRevisionId: Dispatch<SetStateAction<string | null>>,
  ) =>
  () => {
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

export const handleDeleteApp =
  (deleteApp: SendFunction<void, boolean>, navigate: NavigateFunction) => async (event?: MouseEvent) => {
    event?.stopPropagation()
    const appDeleted = await deleteApp()

    if (appDeleted) {
      navigate(Routes.APPS)
    }
  }

export const handleRefreshApps =
  (appsRefresh: () => void, closeModalDelete: () => void, appDeleted?: boolean) => () => {
    if (appDeleted) {
      closeModalDelete()
      appsRefresh()
    }
  }

export const handleOpenModal = (openModal: () => void) => (event?: MouseEvent) => {
  event?.stopPropagation()
  openModal()
}

export const Helper: FC = () => {
  const location = useLocation()
  const { appId, appEditState, appsDataState } = useAppState()
  const { globalDataState, globalRefreshCurrentDeveloper } = useGlobalState()
  const navigate = useNavigate()
  const [revisionId, setRevisionId] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal } = useModal()
  const { Modal: ModalDelete, openModal: openModalDelete, closeModal: closeModalDelete } = useModal()
  const isDeveloperAdmin = selectIsDeveloperAdmin(connectSession)
  const isCustomer = selectIsCustomer(connectSession)
  const { pathname } = location
  const { isAppsEdit, isAppsDetail, isAppPipelines, isAppConsents, isAppsInstallations } = getCurrentPage(pathname)
  const { currentDeveloper } = globalDataState
  const { setAppEditSaving, appUnsavedFields, appIncompleteFields } = appEditState
  const { appsRefresh } = appsDataState
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
  const { deletionProtection, id, name } = appDetail ?? {}

  const [, , cancelRevision, cancelRevisionSuccess] = useReapitUpdate<Marketplace.RejectRevisionModel, null>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.cancelRevision],
    uriParams: {
      appId,
      revisionId,
    },
  })

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId,
    },
  })

  useEffect(handleSetRevisionId(appRevisions, setRevisionId), [appRevisions])

  useEffect(handleRefreshApps(appsRefresh, closeModalDelete, appDeleted), [appDeleted])

  useEffect(handleCancelSuccess(appsDetailRefresh, setRevisionId, appRefreshRevisions, cancelRevisionSuccess), [
    cancelRevisionSuccess,
  ])

  const developerStatus = currentDeveloper?.status

  if (isAppsEdit) {
    return (
      <div className={cx(elFadeIn, elMb7)}>
        <Icon className={elMb3} icon="editAppInfographic" iconSize="large" />
        {isCompleted && !isPublicallyListed && !appDetailLoading && !hasRevisions ? (
          <>
            <BodyText>Ready For Review</BodyText>
            <SmallText tag="div" hasGreyText>
              As your app listing is now complete, you can submit it for review by one of our team, so you can go live
              with customer data. For more on this process{' '}
              <a onClick={openNewPage(ExternalPages.appApprovalDocs)}>visit here.</a>
            </SmallText>
            <SmallText tag="div" hasGreyText>
              You also have the option of saving any additional changes as you make them before submitting.
            </SmallText>
            <ButtonGroup>
              {hasUnsavedChanges && (
                <Button
                  intent="primary"
                  loading={isRefreshing}
                  onClick={handleSetAppEditSaving(setAppEditSaving, false, openModal, developerStatus)}
                >
                  Save Changes
                </Button>
              )}
              <Button
                intent="primary"
                loading={isRefreshing}
                onClick={handleSetAppEditSaving(setAppEditSaving, true, openModal, developerStatus)}
              >
                Submit Review
              </Button>
            </ButtonGroup>
          </>
        ) : hasRevisions ? (
          <>
            <BodyText>Revision Outstanding</BodyText>
            <SmallText tag="div" hasGreyText>
              You have recently submitted an app listing revision for approval.
            </SmallText>
            <SmallText tag="div" hasGreyText>
              For more on this process <a onClick={openNewPage(ExternalPages.appApprovalDocs)}>visit here.</a>
            </SmallText>
            <SmallText tag="div" hasGreyText>
              If you no longer want your app revision to be approved, you can cancel below.
            </SmallText>
            <ButtonGroup>
              <Button
                intent="primary"
                loading={isRefreshing}
                onClick={handleCancelPendingRevsion(cancelRevision, connectSession, revisionId)}
              >
                Cancel Revision
              </Button>
            </ButtonGroup>
          </>
        ) : isPublicallyListed ? (
          <>
            <BodyText>Listed Application</BodyText>
            <SmallText tag="div" hasGreyText>
              As your app is live with customer data, you will need to submit any app changes for approval by one of our
              team. For more on this process <a onClick={openNewPage(ExternalPages.appApprovalDocs)}>visit here.</a>
            </SmallText>
            <SmallText tag="div" hasGreyText>
              You also have the option of de-listing your app and reverting to a sandbox only integration.
            </SmallText>
            <ButtonGroup>
              <Button
                intent="primary"
                loading={isRefreshing}
                onClick={handleSetAppEditSaving(setAppEditSaving, false, openModal, developerStatus)}
              >
                De-list app
              </Button>
              {hasUnsavedChanges && (
                <Button
                  intent="primary"
                  loading={isRefreshing}
                  onClick={handleSetAppEditSaving(setAppEditSaving, true, openModal, developerStatus)}
                >
                  Create Revision
                </Button>
              )}
            </ButtonGroup>
          </>
        ) : hasUnsavedChanges ? (
          <>
            <BodyText>Unsaved Changes</BodyText>
            <SmallText tag="div" hasGreyText>
              Before you list your app you can save the details at any point below. After app listing, you will have to
              create an app revision for our team to review.
            </SmallText>
            <ButtonGroup>
              <Button
                intent="primary"
                loading={isRefreshing}
                onClick={handleSetAppEditSaving(setAppEditSaving, false, openModal, developerStatus)}
              >
                Save Changes
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <BodyText>App Listings</BodyText>
            <SmallText tag="div" hasGreyText>
              Actions will appear below as you perform tasks on this page
            </SmallText>
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
      <div className={cx(elFadeIn, elMb7)}>
        <Icon className={elMb3} icon="appMarketInfographic" iconSize="large" />
        <BodyText>Preview in AppMarket</BodyText>
        <SmallText tag="div" hasGreyText>
          Clicking below will take you to your current AppMarket listing, to view your app as users will see it.
        </SmallText>
        <ButtonGroup>
          <Button intent="primary" onClick={openNewPage(`${process.env.marketplaceUrl}/${appId}`)}>
            Preview
          </Button>
          <Button intent="danger" onClick={handleOpenModal(openModalDelete)}>
            Delete App
          </Button>
        </ButtonGroup>
        <ModalDelete title={`Confirm ${name} Deletion`}>
          {!isDeveloperAdmin ? (
            <BodyText>
              Unfortunately, your user account does not have the correct permissions to delete this app. Only an Admin
              of your developer organisation can delete apps.
            </BodyText>
          ) : deletionProtection ? (
            <BodyText>
              &lsquo;{name}&rsquo; has deletion protection enabled to avoid accidental data loss. If you really want to
              delete the app, visit <Link to={`${Routes.APPS}/${id}/edit/app-listing`}>this page</Link>, uncheck the
              delete protection checkbox and save the revision.
            </BodyText>
          ) : (
            <BodyText>
              Are your sure you want to remove the app &lsquo;{name}&rsquo;? By clicking &lsquo;delete&rsquo; it will
              remove all app data including all revisions and listings.
            </BodyText>
          )}
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModalDelete}>
              Cancel
            </Button>
            <Button
              fixedWidth
              intent="danger"
              disabled={deletionProtection || !isDeveloperAdmin}
              onClick={handleDeleteApp(deleteApp, navigate)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </ModalDelete>
      </div>
    )
  }

  if (isAppPipelines) {
    return <PipelineControls />
  }

  if (isAppConsents) {
    return (
      <div className={cx(elFadeIn, elMb7)}>
        <Icon className={elMb3} icon="editAppInfographic" iconSize="large" />
        <BodyText>App Consents</BodyText>
        <SmallText tag="div" hasGreyText>
          This page is visible because you have requested new permissions as part of your current outstanding app
          revision. An email will be sent to each of the customers who installed your app, requesting they agree to the
          new permissions you have requested.
        </SmallText>
        <SmallText tag="div" hasGreyText>
          Each customer will have to agree to the new permission before our team can approve your revision. You can
          either track this process here or reach out to your customer to expedite their response to our message.
        </SmallText>
        <SmallText tag="div" hasGreyText>
          You can also request that the email is re-sent to each customer individually.
        </SmallText>
        <ButtonGroup>
          <Button intent="default" onClick={openNewPage(ExternalPages.appPermissionsDocs)}>
            View Docs
          </Button>
        </ButtonGroup>
      </div>
    )
  }

  if (isAppsInstallations) {
    return (
      <div className={cx(elFadeIn, elMb7)}>
        <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
        <BodyText>Apps Documentation</BodyText>
        <SmallText tag="div" hasGreyText>
          This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
          created an app before or you need help, please take the time to view our getting started guide.
        </SmallText>
        <ButtonGroup className={elMb3}>
          <Button intent="default" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
            View Docs
          </Button>
        </ButtonGroup>
        <DownloadInstallationsCSV />
      </div>
    )
  }

  return (
    <div className={cx(elFadeIn, elMb7)}>
      <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
      <BodyText>Apps Documentation</BodyText>
      <SmallText tag="div" hasGreyText>
        This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
        created an app before or you need help, please take the time to view our getting started guide.
      </SmallText>
      <ButtonGroup>
        <Button intent="default" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
          View Docs
        </Button>
      </ButtonGroup>
    </div>
  )
}

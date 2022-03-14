import { Button, elMb3, Icon, SmallText, Subtitle } from '@reapit/elements'
import { AppRevisionModelPagedResult, RejectRevisionModel } from '@reapit/foundations-ts-definitions'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { openNewPage, ExternalPages } from '../../../../utils/navigation'
import { useAppState } from '../state/use-app-state'
import { getCurrentPage } from '../utils/get-current-page'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'

export const handleSetAppEditSaving = (setAppEditSaving: Dispatch<SetStateAction<boolean>>) => () => {
  setAppEditSaving(true)
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
  const [revisionId, setRevisionId] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { pathname } = location
  const { isAppsEdit, isAppsDetail } = getCurrentPage(pathname)
  const { setAppEditSaving } = appEditState
  const {
    appsDetailRefresh,
    appRefreshRevisions,
    appRevisions,
    appDetail,
    appDetailRefreshing,
    appRevisionsRefreshing,
  } = appsDataState
  const isCompleted = false
  const hasRevisions = Boolean(appDetail?.pendingRevisions)
  const isRefreshing = appDetailRefreshing || appRevisionsRefreshing

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

  if (isAppsEdit) {
    return (
      <>
        <Icon className={elMb3} icon="editAppInfographic" iconSize="large" />
        <Subtitle>Saving Your App</Subtitle>
        <SmallText hasGreyText>
          Before you list your app you can save the details at any point below. After app listing, you will have to
          create an app revision for our team to review.
        </SmallText>
        {isCompleted ? (
          <Button className={elMb3} intent="critical" onClick={handleSetAppEditSaving(setAppEditSaving)} chevronRight>
            Submit Review
          </Button>
        ) : hasRevisions ? (
          <Button
            className={elMb3}
            intent="critical"
            loading={isRefreshing}
            onClick={handleCancelPendingRevsion(cancelRevision, connectSession, revisionId)}
            chevronRight
          >
            Cancel Revision
          </Button>
        ) : appsDataState.appDetail?.isListed ? (
          <Button
            className={elMb3}
            intent="critical"
            loading={isRefreshing}
            onClick={handleSetAppEditSaving(setAppEditSaving)}
            chevronRight
          >
            Create Revision
          </Button>
        ) : (
          <Button className={elMb3} intent="primary" onClick={handleSetAppEditSaving(setAppEditSaving)} chevronRight>
            Save Changes
          </Button>
        )}
      </>
    )
  }

  if (isAppsDetail) {
    return (
      <>
        <Icon className={elMb3} icon="appMarketInfographic" iconSize="large" />
        <Subtitle>Preview in AppMarket</Subtitle>
        <SmallText hasGreyText>
          Clicking below will take you to your current AppMarket listing, to view your app as users will see it.
        </SmallText>
        <Button
          className={elMb3}
          intent="primary"
          onClick={openNewPage(`${window.reapit.config.marketplaceUrl}/${appId}`)}
          chevronRight
        >
          Preview
        </Button>
      </>
    )
  }

  return (
    <>
      <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
      <Subtitle>Apps Documentation</Subtitle>
      <SmallText hasGreyText>
        This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
        created an app before or you need help, please take the time to view our getting started guide.
      </SmallText>
      <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
        View Docs
      </Button>
    </>
  )
}

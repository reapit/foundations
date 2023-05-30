import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button, ButtonGroup, elMb11, Loader, PersistentNotification, Table, Title } from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { useParams } from 'react-router-dom'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { useGlobalState } from '../../../core/use-global-state'
import {
  AppRevisionConsentModel,
  CreateAppRevisionConsentsModel,
  InstallationModelPagedResult,
  ResendAppRevisionConsentModel,
} from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'

export const handleResendEmail =
  (
    resendEmail: SendFunction<ResendAppRevisionConsentModel, boolean>,
    setConsentId: Dispatch<SetStateAction<string | null>>,
    appConsentsRefresh: () => void,
    consentId: string | null,
    developerEmail?: string,
  ) =>
  () => {
    const sentEmail = async () => {
      const response = await resendEmail({ actionedBy: developerEmail })
      setConsentId(null)

      if (response) {
        appConsentsRefresh()
      }
    }

    if (consentId) {
      sentEmail().catch((error) => console.error(error))
    }
  }

export const handleSetConsentId = (setConsentId: Dispatch<SetStateAction<string | null>>, consentId?: string) => () => {
  if (consentId) {
    setConsentId(consentId)
  }
}

export const handleSendConstents =
  (
    createConsentEmails: SendFunction<CreateAppRevisionConsentsModel, boolean>,
    appConsentsRefresh: () => void,
    developerEmail?: string,
  ) =>
  async () => {
    const response = await createConsentEmails({ actionedBy: developerEmail })

    if (response) {
      appConsentsRefresh()
    }
  }

export const AppConsentsPage: FC = () => {
  const { globalDataState } = useGlobalState()
  const [consentId, setConsentId] = useState<string | null>(null)
  const { appsDataState, setAppId } = useAppState()
  const { currentDeveloper } = globalDataState
  const developerId = currentDeveloper?.id
  const developerEmail = currentDeveloper?.email
  const { appId } = useParams<'appId'>()

  useEffect(handleSetAppId(setAppId, appId), [appId])

  const { appDetail, appRevisions } = appsDataState
  const { name } = appDetail ?? {}
  const latestRevision = appRevisions?.data ? appRevisions.data[0] : null

  const [appConsents, appConsentsLoading, , appConsentsRefresh] = useReapitGet<AppRevisionConsentModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getRevisionConsents],
    uriParams: {
      appId,
      revisionId: latestRevision?.id,
    },
    fetchWhenTrue: [appId, latestRevision, appDetail?.pendingRevisions, appDetail?.isListed],
  })

  const [, , createConsentEmails] = useReapitUpdate<CreateAppRevisionConsentsModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createConsentEmails],
    method: 'POST',
    uriParams: {
      appId,
      revisionId: latestRevision?.id,
    },
  })

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      appId,
      pageNumber: 1,
      pageSize: 999,
      isInstalled: true,
      developerId,
    },
    fetchWhenTrue: [developerId],
  })

  const [, , resendEmail] = useReapitUpdate<ResendAppRevisionConsentModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.resendConsentEmail],
    method: 'POST',
    uriParams: {
      appId,
      revisionId: latestRevision?.id,
      consentId,
    },
  })

  useEffect(handleResendEmail(resendEmail, setConsentId, appConsentsRefresh, consentId, developerEmail), [consentId])

  return (
    <>
      {appConsentsLoading || !appConsents ? (
        <Loader />
      ) : appConsents.length ? (
        <>
          <Title>{name} Consents</Title>
          <Table
            numberColumns={6}
            rows={appConsents.map((consent) => ({
              cells: [
                {
                  label: 'Client',
                  value: installations?.data?.find((installation) => installation.id === consent.installationId)
                    ?.customerName,
                  icon: 'flatInfographic',
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Email',
                  value: consent.installedBy,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Date Sent',
                  value: dayjs(consent.sentDate).format('DD/MM/YYYY HH:mm'),
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Status',
                  value: `${consent.status?.charAt(0).toUpperCase()}${consent.status?.slice(1)}`,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Date Accepted',
                  value: consent.approvalDate ? dayjs(consent.approvalDate).format('DD/MM/YYYY HH:mm') : '-',
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              ctaContent: {
                headerContent: 'Resend Email',
                icon: 'emailSystem',
                onClick: handleSetConsentId(setConsentId, consent.id),
              },
            }))}
          />
        </>
      ) : (
        <>
          <Title>{name} Consents</Title>
          <PersistentNotification className={elMb11} intent="secondary" isExpanded isFullWidth isInline>
            No record of any consents for this app - it looks like you need to send an email requesting that your
            customers agree to your new permission settings. You can do this below or our team will do it as part of the
            review process.
          </PersistentNotification>
          <ButtonGroup alignment="left">
            <Button
              fixedWidth
              onClick={handleSendConstents(createConsentEmails, appConsentsRefresh, developerEmail)}
              intent="primary"
            >
              Send Requests
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  )
}

export default AppConsentsPage

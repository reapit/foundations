import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button, ButtonGroup, elMb11, Loader, PersistentNotification, Table, Title } from '@reapit/elements'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import {
  AppRevisionConsentModel,
  CreateAppRevisionConsentsModel,
  InstallationModelPagedResult,
  ResendAppRevisionConsentModel,
} from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { selectAppRevisionDetail } from '../../../selector/app-revisions'
import { selectAppDetailState } from '../../../selector/app-detail'
import { useReapitConnect } from '@reapit/connect-session'

export const handleResendEmail =
  (
    resendEmail: SendFunction<ResendAppRevisionConsentModel, boolean>,
    setConsentId: Dispatch<SetStateAction<string | null>>,
    appConsentsRefresh: () => void,
    consentId: string | null,
    email?: string,
  ) =>
  () => {
    const sentEmail = async () => {
      const response = await resendEmail({ actionedBy: email })
      setConsentId(null)

      if (response) {
        appConsentsRefresh()
      }
    }

    if (consentId) {
      sentEmail()
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

export const AppConsents: FC = () => {
  const [consentId, setConsentId] = useState<string | null>(null)
  const revisionDetailState = useSelector(selectAppRevisionDetail)
  const appDetailState = useSelector(selectAppDetailState)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const appId = appDetailState.data?.id
  const revisionId = revisionDetailState.data?.data?.id
  const email = connectSession?.loginIdentity.email
  const developerId = appDetailState?.data?.developerId
  const name = appDetailState?.data?.name
  const pendingRevisions = appDetailState?.data?.pendingRevisions
  const isListed = revisionDetailState?.data?.data?.isListed

  const [appConsents, appConsentsLoading, , appConsentsRefresh] = useReapitGet<AppRevisionConsentModel[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getRevisionConsents],
    uriParams: {
      appId,
      revisionId,
    },
    fetchWhenTrue: [appId, revisionId, pendingRevisions, isListed],
  })

  const [, , createConsentEmails] = useReapitUpdate<CreateAppRevisionConsentsModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createConsentEmails],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
    },
  })

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
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
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.resendConsentEmail],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
      consentId,
    },
  })

  useEffect(handleResendEmail(resendEmail, setConsentId, appConsentsRefresh, consentId, email), [consentId])

  return (
    <>
      {appConsentsLoading ? (
        <Loader />
      ) : appConsents?.length ? (
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
      ) : appDetailState.data && revisionDetailState.data ? (
        <>
          <Title>{name} Consents</Title>
          <div>
            <PersistentNotification className={elMb11} intent="secondary" isExpanded isFullWidth isInline>
              No record of any consents for this app - you can send these from the link below.
            </PersistentNotification>
          </div>
          <ButtonGroup alignment="left">
            <Button
              fixedWidth
              onClick={handleSendConstents(createConsentEmails, appConsentsRefresh, email)}
              intent="primary"
            >
              Send Requests
            </Button>
          </ButtonGroup>
        </>
      ) : null}
    </>
  )
}

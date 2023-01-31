import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  elMb11,
  elMt5,
  Loader,
  PersistentNotification,
  Subtitle,
  Table,
  useModal,
} from '@reapit/elements'
import {
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  AppDetailModel,
  AppRevisionConsentModel,
  AppRevisionModel,
  ApprovalModel,
  CreateAppRevisionConsentsModel,
  InstallationModelPagedResult,
  ResendAppRevisionConsentModel,
} from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { useReapitConnect } from '@reapit/connect-session'
import ResendConsentModal from './resend-consent-modal'
import { usePermissionsState } from '../../core/use-permissions-state'

export interface ConsentsProps {
  approval: ApprovalModel | null
}

export const handleSetConsentId =
  (
    setConsentId: Dispatch<SetStateAction<string | null>>,
    setSelectedConsent: (consent?: AppRevisionConsentModel) => void,
    consentId?: string,
  ) =>
  () => {
    if (consentId) {
      setConsentId(consentId)
    }
    setSelectedConsent(undefined)
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

export const handleSetResendConsents =
  (
    setSelectedConsent: Dispatch<SetStateAction<AppRevisionConsentModel | null>>,
    consent: AppRevisionConsentModel | null,
    openModal: () => void,
  ) =>
  () => {
    if (consent) {
      setSelectedConsent(consent)
      openModal()
    }
  }

export const handleCloseModal =
  (
    setSelectedConsent: Dispatch<SetStateAction<AppRevisionConsentModel | null>>,
    closeModal: () => void,
    emailResent?: boolean,
  ) =>
  () => {
    if (emailResent) {
      setSelectedConsent(null)
      closeModal()
    }
  }

export const AppConsents: FC<ConsentsProps> = ({ approval }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { hasReadAccess } = usePermissionsState()
  const [selectedConsent, setSelectedConsent] = useState<AppRevisionConsentModel | null>(null)
  const { Modal, openModal, closeModal } = useModal()
  const email = connectSession?.loginIdentity.email
  const appId = approval?.appId
  const revisionId = approval?.appRevisionId
  const consentId = selectedConsent?.id

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: {
      appId,
    },
    fetchWhenTrue: [appId],
  })

  const [appRevision] = useReapitGet<AppRevisionModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getRevisionById],
    uriParams: {
      revisionId,
      appId,
    },
    fetchWhenTrue: [revisionId, appId],
  })

  const developerId = appDetail?.developerId
  const name = appDetail?.name
  const pendingRevisions = appDetail?.pendingRevisions
  const isListed = appRevision?.isListed

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

  const [, , resendEmail, emailResent] = useReapitUpdate<ResendAppRevisionConsentModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.resendConsentEmail],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
      consentId,
    },
  })

  useEffect(handleCloseModal(setSelectedConsent, closeModal, emailResent), [emailResent])

  if (!approval) return null

  return (
    <>
      <Subtitle className={elMt5}>{name} Consents</Subtitle>
      {appConsentsLoading ? (
        <Loader />
      ) : appConsents?.length ? (
        <>
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
                icon: hasReadAccess ? undefined : 'emailSystem',
                onClick: hasReadAccess ? undefined : handleSetResendConsents(setSelectedConsent, consent, openModal),
              },
            }))}
          />
          <Modal title="Resent Consents For Client">
            <ResendConsentModal
              resendEmail={resendEmail}
              closeModal={closeModal}
              email={email}
              recipient={selectedConsent?.installedBy}
            />
          </Modal>
        </>
      ) : appDetail && appRevision ? (
        <>
          <div>
            <PersistentNotification className={elMb11} intent="secondary" isExpanded isFullWidth isInline>
              No record of any consents for this app - you can send these from the link below.
            </PersistentNotification>
          </div>
          <ButtonGroup alignment="center">
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

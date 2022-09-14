import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FormLayout,
  InputError,
  InputWrap,
  InputWrapFull,
  Label,
  Loader,
  Modal,
  PersistentNotification,
  Table,
  Title,
} from '@reapit/elements'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { emailRegex, GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import {
  AppRevisionConsentModel,
  CreateAppRevisionConsentsModel,
  InstallationModelPagedResult,
  ResendAppRevisionConsentModel,
} from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { selectAppRevisionDetail } from '../../selector/app-revisions'
import { selectAppDetailState } from '../../selector/app-detail'
import { useReapitConnect } from '@reapit/connect-session'
import { Form, Formik, Input } from '@reapit/elements'

export const handleResendEmail =
  (
    resendEmail: SendFunction<ResendAppRevisionConsentModel, boolean>,
    appConsentsRefresh: () => void,
    closeAll: () => void,
    consentId?: string | null,
    email?: string,
  ) =>
  () => {
    const sentEmail = async () => {
      const response = await resendEmail(
        { actionedBy: email },
        {
          uriParams: {
            consentId,
          },
        },
      )

      if (response) {
        appConsentsRefresh()
        closeAll()
      }
    }

    if (consentId) {
      sentEmail()
    }
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

const AddNewConsentModal: FC<{
  isOpen: boolean
  close: () => void
  closeAll: () => void
  appId: string
  consentId: string
  revisionId: string
  actionedBy: string
}> = ({ isOpen, close, appId: id, revisionId, consentId, actionedBy, closeAll }) => {
  const [loading, , send] = useReapitUpdate<{ email: string; actionedBy }, void>({
    action: updateActions(window.reapit.config.appEnv).appConsentApproveEmail,
    reapitConnectBrowserSession,
    uriParams: {
      id,
      revisionId,
      consentId,
    },
    method: 'POST',
  })

  const onSubmit = async (values: { email: string }) => {
    const result = await send({
      actionedBy,
      ...values,
    })

    if (result) {
      closeAll()
    }
  }

  return (
    <Modal isOpen={isOpen} onModalClose={close}>
      <Title>Additional Consent Email Address</Title>
      <BodyText>Send the consent email to an additional email address</BodyText>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={onSubmit}
        validate={(values) => {
          if (!values.email) {
            return {
              email: 'Please add an email address',
            }
          }

          if (!emailRegex.test(values.email)) {
            return {
              email: 'Please enter a valid email address',
            }
          }
        }}
      >
        {({ errors }) => {
          return (
            <Form>
              <FormLayout>
                <InputWrapFull>
                  <Label>Email</Label>
                  <Input type="text" id="email" name="email" />
                  {errors && errors.email && <InputError message={errors.email} />}
                </InputWrapFull>
                <InputWrap>
                  <Button intent="primary" loading={loading} disabled={loading}>
                    Send
                  </Button>
                </InputWrap>
              </FormLayout>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

const ResendEmailModal: FC<{
  close: () => void
  appId: string
  revisionId: string
  email: string
  appConsentsRefresh: () => void
  consent?: AppRevisionConsentModel
  handleResendEmail: () => void
}> = ({ close, appId, revisionId, consent, email, handleResendEmail }) => {
  const [additionalModalOpen, setAdditionalModalOpen] = useState<boolean>(false)

  return (
    <>
      <Modal isOpen={consent !== undefined} onModalClose={close}>
        {consent && (
          <>
            <Title>Resend Consent email</Title>
            <Label>Installed By</Label>
            <BodyText>{consent?.installedBy}</BodyText>
            <ButtonGroup>
              <Button intent="secondary" onClick={() => setAdditionalModalOpen(true)}>
                Add new recipient
              </Button>
              <Button intent="primary" onClick={handleResendEmail}>
                Send
              </Button>
            </ButtonGroup>
          </>
        )}
      </Modal>
      {consent && (
        <AddNewConsentModal
          isOpen={additionalModalOpen}
          close={() => setAdditionalModalOpen(false)}
          appId={appId as string}
          consentId={consent.id as string}
          revisionId={revisionId as string}
          actionedBy={email}
          closeAll={() => {
            setAdditionalModalOpen(false)
            close()
          }}
        />
      )}
    </>
  )
}

export const AppConsents: FC = () => {
  const revisionDetailState = useSelector(selectAppRevisionDetail)
  const appDetailState = useSelector(selectAppDetailState)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [selectedConsent, setSelectedConsent] = useState<AppRevisionConsentModel | undefined>()

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
    },
  })

  return (
    <>
      <Title>{name} Consents</Title>
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
                icon: 'emailSystem',
                onClick: () => setSelectedConsent(consent),
              },
            }))}
          />

          <ResendEmailModal
            close={() => setSelectedConsent(undefined)}
            consent={selectedConsent}
            appId={appId as string}
            revisionId={revisionId as string}
            appConsentsRefresh={appConsentsRefresh}
            email={email as string}
            handleResendEmail={handleResendEmail(
              resendEmail,
              appConsentsRefresh,
              () => {
                setSelectedConsent(undefined)
              },
              selectedConsent?.id,
              email,
            )}
          />
        </>
      ) : appDetailState.data && revisionDetailState.data ? (
        <>
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

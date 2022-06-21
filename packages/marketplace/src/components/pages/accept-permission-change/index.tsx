import { BodyText, Button, ButtonGroup, useModal } from '@reapit/elements'
import { AppDetailModel, ApproveAppRevisionConsentModel } from '@reapit/foundations-ts-definitions'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import React, { FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { useReapitConnect } from '@reapit/connect-session'

interface AcceptPermissionParams {
  appId: string
  revisionId: string
  consentId: string
}

export const handleApprove =
  (
    approveConsent: SendFunction<ApproveAppRevisionConsentModel, boolean>,
    closeModal: () => void,
    history: History,
    email?: string,
  ) =>
  async () => {
    const response = await approveConsent({ approvedBy: email })

    if (response) {
      closeModal()
      history.push(Routes.INSTALLED_APPS)
    }
  }

export const handleCancel = (closeModal: () => void, history: History) => () => {
  closeModal()
  history.push(Routes.INSTALLED_APPS)
}

export const handleOpenModal = (openModal: () => void) => () => {
  openModal()
}

export const AcceptPermissionChangePage: FC = () => {
  const { Modal, openModal, closeModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const history = useHistory()
  const { appId, revisionId, consentId } = useParams<AcceptPermissionParams>()
  const email = connectSession?.loginIdentity.email

  const [, , approveConsent] = useReapitUpdate<ApproveAppRevisionConsentModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.approveConsent],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
      consentId,
    },
  })

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: { appId },
    fetchWhenTrue: [appId],
  })

  useEffect(handleOpenModal(openModal), [])

  return (
    <Modal title="Requested Permissions">
      <BodyText hasGreyText>
        To accept the permissions as requested by {appDetail?.name} please click &lsquo;Accept&rsquo; below.
      </BodyText>
      <ButtonGroup alignment="center">
        <Button fixedWidth intent="low" onClick={handleCancel(closeModal, history)}>
          Ignore
        </Button>
        <Button fixedWidth intent="primary" onClick={handleApprove(approveConsent, closeModal, history, email)}>
          Accept
        </Button>
      </ButtonGroup>
    </Modal>
  )
}

export default AcceptPermissionChangePage

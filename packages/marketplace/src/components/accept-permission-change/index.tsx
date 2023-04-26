import { BodyText, Button, ButtonGroup, useModal } from '@reapit/elements'
import { AppDetailModel, ApproveAppRevisionConsentModel } from '@reapit/foundations-ts-definitions'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC, useEffect } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { RoutePaths } from '../../constants/routes'
import { useReapitConnect } from '@reapit/connect-session'

export const handleApprove =
  (
    approveConsent: SendFunction<ApproveAppRevisionConsentModel, boolean>,
    closeModal: () => void,
    navigate: NavigateFunction,
    email?: string,
  ) =>
  async () => {
    const response = await approveConsent({ approvedBy: email })

    if (response) {
      closeModal()
      navigate(RoutePaths.APPS_INSTALLED)
    }
  }

export const handleCancel = (closeModal: () => void, navigate: NavigateFunction) => () => {
  closeModal()
  navigate(RoutePaths.APPS_INSTALLED)
}

export const handleOpenModal = (openModal: () => void) => () => {
  openModal()
}

export const AcceptPermissionChangePage: FC = () => {
  const { Modal, openModal, closeModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()
  const { appId, revisionId, consentId } = useParams<'appId' | 'revisionId' | 'consentId'>()
  const email = connectSession?.loginIdentity.email

  const [, , approveConsent] = useReapitUpdate<ApproveAppRevisionConsentModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.approveConsent],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
      consentId,
    },
  })

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppById],
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
        <Button fixedWidth intent="low" onClick={handleCancel(closeModal, navigate)}>
          Ignore
        </Button>
        <Button fixedWidth intent="primary" onClick={handleApprove(approveConsent, closeModal, navigate, email)}>
          Accept
        </Button>
      </ButtonGroup>
    </Modal>
  )
}

export default AcceptPermissionChangePage

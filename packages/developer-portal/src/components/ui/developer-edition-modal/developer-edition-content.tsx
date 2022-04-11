import React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalProps, ButtonGroup, Content } from '@reapit/elements-legacy'
import { modalContent } from './modal-content'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import Routes from '../../../constants/routes'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../../../core/use-global-state'

export type DeveloperEditionContentProps = Pick<ModalProps, 'afterClose'> & {
  developer: Partial<DeveloperModel>
  loading: boolean
  handleOnConfirm: () => void
  desktopIsFree: boolean
}

export const DeveloperEditionContent: React.FC<DeveloperEditionContentProps> = ({
  developer,
  loading,
  afterClose,
  desktopIsFree,
  handleOnConfirm,
}) => {
  const { globalDataState } = useGlobalState()
  const { currentDeveloper, currentMember } = globalDataState
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isClientAndClientData = desktopIsFree && Boolean(connectSession?.loginIdentity.clientId !== 'SBOX')
  const costText = desktopIsFree
    ? 'By confirming the subscription below, a subscription will be added to your developer account but you will not be charged as an existing Reapit customer.'
    : 'By confirming the subscription below, a subscription of £300 will automatically be added to your monthly billing.'

  const billingContent =
    currentMember?.role &&
    currentDeveloper?.status &&
    modalContent?.[currentMember.role]?.[currentDeveloper.status]?.content

  const content = isClientAndClientData ? (
    <>
      <Content>
        Your account is currently set to use <strong>{developer.name}</strong>. In order to subscribe to the developer
        edition you will need to change your profile setting. Please{' '}
        <Link to={Routes.SETTINGS_PROFILE}>click here</Link> to update your information.
      </Content>
      <ButtonGroup hasSpacing isCentered>
        <Button variant="secondary" onClick={afterClose}>
          Cancel
        </Button>
      </ButtonGroup>
    </>
  ) : billingContent ? (
    <>
      <Content>{billingContent}</Content>
      <ButtonGroup hasSpacing isCentered>
        <Button variant="secondary" onClick={afterClose}>
          Cancel
        </Button>
      </ButtonGroup>
    </>
  ) : (
    <>
      <SubTitleH6 className="has-text-weight-normal">
        The Agency Cloud Developer Edition is a licensed product. {costText} For more information regarding the
        Developer Edition licence please refer to your Developer Registration{' '}
        <a href="/api-docs/developer-terms-and-conditions" rel="noreferrer" target="_blank">
          Terms and Conditions.
        </a>
        <br />
        <br />
        To proceed, please confirm your subscription below for <strong>{developer.name}</strong>
      </SubTitleH6>
      <ButtonGroup hasSpacing isCentered>
        <Button variant="secondary" onClick={afterClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleOnConfirm} loading={loading}>
          Confirm Subscription
        </Button>
      </ButtonGroup>
    </>
  )

  const heading = isClientAndClientData
    ? 'Unable to create subscription'
    : currentMember?.role &&
      currentDeveloper?.status &&
      modalContent?.[currentMember.role]?.[currentDeveloper.status]?.title
    ? modalContent?.[currentMember.role]?.[currentDeveloper.status]?.title
    : 'Agency Cloud Developer Edition'

  return (
    <>
      <ModalHeader title={heading} />
      <ModalBody body={content} />
    </>
  )
}

export default DeveloperEditionContent

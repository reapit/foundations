import * as React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalProps, ButtonGroup, Content } from '@reapit/elements-legacy'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '../../../selector/settings'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '../../../selector/current-member'
import { useSelector } from 'react-redux'
import { modalContent } from './modal-content'
import { Loader } from '@reapit/elements'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import Routes from '../../../constants/routes'
import { Link } from 'react-router-dom'

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
  const currentUser = useSelector(selectCurrentMemberData)
  const currentUserLoading = useSelector(selectCurrentMemberIsLoading)
  const currentDeveloper = useSelector(selectSettingsPageDeveloperInformation)
  const currentDeveloperLoading = useSelector(selectSettingsPageIsLoading)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isClientAndClientData = desktopIsFree && Boolean(connectSession?.loginIdentity.clientId !== 'SBOX')
  const costText = desktopIsFree
    ? 'By confirming the subscription below, a subscription will be added to your developer account but you will not be charged as an existing Reapit customer.'
    : 'By confirming the subscription below, a subscription of £300 will automatically be added to your monthly billing.'

  const billingContent =
    currentUser?.role &&
    currentDeveloper?.status &&
    modalContent?.[currentUser.role]?.[currentDeveloper.status]?.content

  const content =
    currentUserLoading || currentDeveloperLoading ? (
      <Loader label="Loading" />
    ) : isClientAndClientData ? (
      <>
        <Content>
          Your account is currently set to use <strong>{developer.name}</strong>. In order to subscribe to the developer
          edition you will need to change your profile setting. Please{' '}
          <Link to={Routes.SETTINGS_PROFILE_TAB}>click here</Link> to update your information.
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
    : currentUser?.role &&
      currentDeveloper?.status &&
      modalContent?.[currentUser.role]?.[currentDeveloper.status]?.title
    ? modalContent?.[currentUser.role]?.[currentDeveloper.status]?.title
    : 'Agency Cloud Developer Edition'

  return (
    <>
      <ModalHeader title={heading} />
      <ModalBody body={content} />
    </>
  )
}

export default DeveloperEditionContent

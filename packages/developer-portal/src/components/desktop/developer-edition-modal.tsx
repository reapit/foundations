import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { selectLoginIdentity } from '../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { SubscribingState } from '.'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { BodyText, Button, ButtonGroup, useModal } from '@reapit/elements'
import { useGlobalState } from '../../core/use-global-state'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import developerEditionGuide from '../../assets/files/developer-edition-guide.pdf'

export interface DeveloperEditionModalProps {
  setSubscribingState: Dispatch<SetStateAction<SubscribingState>>
  visible: boolean
}

export const HAS_SUB_MESSAGE = 'An identical subscription is already active'

export const handleDownload = () => {
  window.open(process.env.developerEditionDownloadUrl, '_self')
}

export const handleOnConfirm =
  (
    developer: Partial<Marketplace.DeveloperModel> | null,
    createSubscription: SendFunction<Marketplace.CreateSubscriptionModel, boolean>,
    setSubscribingState: Dispatch<SetStateAction<SubscribingState>>,
    email?: string,
  ) =>
  async () => {
    if (!email || !developer) return
    const subscription = await createSubscription({
      developerId: developer?.id || '',
      user: email,
      type: 'developerEdition',
    })

    if (subscription) {
      setSubscribingState('INITIAL')
    }
  }

export const handleCloseModal =
  (setSubscribingState: Dispatch<SetStateAction<SubscribingState>>, closeModal: () => void) => () => {
    setSubscribingState('INITIAL')
    closeModal()
  }

export const handleModalOpen = (openModal: () => void, visible: boolean) => () => {
  if (visible) {
    openModal()
  }
}

export const getTitle = (
  hasSubscription: boolean,
  subscriptionSuccessful: boolean,
  isClientAndClientData: boolean,
  currentDeveloper: Marketplace.DeveloperModel | null,
): string => {
  if (hasSubscription) {
    return 'Existing Subscription'
  }

  if (subscriptionSuccessful) {
    return 'Success'
  }

  if (isClientAndClientData) {
    return 'Unable to create subscription'
  }

  if (currentDeveloper?.status === 'incomplete') {
    return 'Account Information Required'
  }

  return 'Agency Cloud Developer Edition'
}

export const getBillingContent = (
  currentMember: Marketplace.MemberModel | null,
  currentDeveloper: Marketplace.DeveloperModel | null,
): ReactNode => {
  if (currentMember?.role === 'admin' && currentDeveloper?.status === 'incomplete') {
    return (
      <p>
        Before you can subscribe to the Developer Edition of Reapit CRM, we will first need to verify your account
        information. Please
        <a
          href="mailto:jhennessy@reapit.com?subject=Developer%20Edition%20of%20Reapit%20CRM%20Subscription"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          click here
        </a>{' '}
        to contact a member of the team.
      </p>
    )
  }

  if (currentMember?.role === 'user' && currentDeveloper?.status === 'incomplete') {
    return (
      <p>
        Before you can subscribe to the Developer Edition of Reapit CRM, billing information will need to be submitted.
        Please ask the Admin of your organisation to visit this page to contact a member of the team.
      </p>
    )
  }

  return null
}

export const getCostText = (desktopIsFree: boolean): string => {
  return desktopIsFree
    ? 'By confirming the subscription below, a subscription will be added to your developer account but you will not be charged as an existing Reapit customer.'
    : 'By confirming the subscription below, a subscription of £300 will automatically be added to your monthly billing.'
}

export const DeveloperEditionModal: FC<DeveloperEditionModalProps> = ({ visible, setSubscribingState }) => {
  const { globalDataState } = useGlobalState()
  const { Modal, openModal, closeModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)
  const { currentDeveloper, currentMember } = globalDataState
  const agencyCloudId = loginIdentity?.agencyCloudId
  const isSandbox = Boolean(agencyCloudId && agencyCloudId !== 'SBOX' && agencyCloudId !== 'SBXA')
  const desktopIsFree = isSandbox || currentDeveloper?.developerEditionSubscriptionCost === 0
  const isClientAndClientData = isSandbox && Boolean(connectSession?.loginIdentity.clientId !== 'SBOX')

  useEffect(handleModalOpen(openModal, visible), [visible])

  const [, subscriptionCreating, createSubscription, createSubscriptionSuccess, createSubscriptionError] =
    useReapitUpdate<Marketplace.CreateSubscriptionModel, boolean>({
      reapitConnectBrowserSession,
      action: updateActions[UpdateActionNames.createSubscription],
      method: 'POST',
    })

  const hasSubscription = Boolean(createSubscriptionError?.includes(HAS_SUB_MESSAGE))
  const billingContent = getBillingContent(currentMember, currentDeveloper)
  const title = getTitle(hasSubscription, Boolean(createSubscriptionSuccess), isClientAndClientData, currentDeveloper)
  const costText = getCostText(desktopIsFree)

  return (
    <Modal title={title}>
      {createSubscriptionSuccess ? (
        <>
          <BodyText hasGreyText>
            You have successfully subscribed 1 Agency Cloud user licence and an email has been sent to the following
            members of your organisation with instructions on how to get started.
          </BodyText>
          <BodyText hasGreyText>
            {currentMember?.name} -&nbsp;
            <a target="_blank" rel="noopener noreferrer" href={`mailto:${currentMember?.email}`}>
              {currentMember?.email}
            </a>
          </BodyText>
          <BodyText hasGreyText>
            We have added your subscription to your monthly billing. To manage your subscriptions please visit the
            &apos;Billing&apos; tab.
          </BodyText>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={handleCloseModal(setSubscribingState, closeModal)}>
              Close
            </Button>
            <Button intent="primary" type="submit" onClick={handleDownload}>
              Download
            </Button>
          </ButtonGroup>
        </>
      ) : hasSubscription ? (
        <>
          <BodyText hasGreyText>
            It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud. To
            download, please use the ‘Download Now’ button below. For more information or support using the Developer
            Edition, please&nbsp;
            <a target="_blank" rel="noopener noreferrer" href={developerEditionGuide}>
              click here
            </a>
          </BodyText>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={handleCloseModal(setSubscribingState, closeModal)}>
              Close
            </Button>
            <Button intent="primary" type="submit" onClick={handleDownload}>
              Download
            </Button>
          </ButtonGroup>
        </>
      ) : isClientAndClientData ? (
        <>
          <BodyText hasGreyText>
            Your account is currently set to use <strong>{currentDeveloper?.company}</strong>. In order to subscribe to
            the developer edition you will need to change your profile setting. Please{' '}
            <Link to={Routes.SETTINGS_PROFILE}>click here</Link> to update your information.
          </BodyText>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={handleCloseModal(setSubscribingState, closeModal)}>
              Cancel
            </Button>
          </ButtonGroup>
        </>
      ) : billingContent && !desktopIsFree ? (
        <>
          <BodyText hasGreyText>{billingContent}</BodyText>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={handleCloseModal(setSubscribingState, closeModal)}>
              Cancel
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <BodyText hasGreyText>
            The Agency Cloud Developer Edition is a licensed product. {costText} For more information regarding the
            Developer Edition licence please refer to your Developer Registration{' '}
            <a href="/api-docs/developer-terms-and-conditions" rel="noreferrer" target="_blank">
              Terms and Conditions.
            </a>
          </BodyText>
          <BodyText hasGreyText>
            To proceed, please confirm your subscription below for <strong>{currentMember?.name}</strong>
          </BodyText>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={handleCloseModal(setSubscribingState, closeModal)}>
              Cancel
            </Button>
            <Button
              intent="primary"
              type="submit"
              onClick={handleOnConfirm(currentDeveloper, createSubscription, setSubscribingState, currentMember?.email)}
              loading={subscriptionCreating}
              disabled={subscriptionCreating}
            >
              Confirm
            </Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  )
}

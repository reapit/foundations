import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreateDeveloperSubscriptionError,
} from '@/selector/developer-subscriptions'
import CallToAction from '@/components/ui/call-to-action'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalProps, SubTitleH6, ModalHeader, ModalBody, ModalFooter } from '@reapit/elements'
import { developerCreateSubscription, developerCreateSubscriptionClearError } from '@/actions/developer-subscriptions'
import linkStyles from '@/styles/elements/link.scss?mod'
import developerEditionStyles from '@/styles/blocks/developer-edition-modal.scss?mod'

const HELP_PAGE_LINK = 'https://marketplace.reapit.cloud/developer/help'

export interface DeveloperConfirmSubscriptionProps extends Pick<ModalProps, 'visible'> {
  developer?: DeveloperModel
  onDone: () => void
}

export const handleCreateSubscription = (dispatch, developer, setSuccess) => () => {
  dispatch(
    developerCreateSubscription({
      params: {
        developerId: developer.id || '',
        user: developer.email || '',
        applicationId: '', // TBC
        type: 'developerEdition',
      },
      onCreated: () => {
        setSuccess(true)
      },
    }),
  )
}

export const handleAfterCloseModal = (onDone, dispatch, setSuccess) => () => {
  onDone()
  dispatch(developerCreateSubscriptionClearError())
  setSuccess(false)
}

const DeveloperConfirmSubscription: React.FC<DeveloperConfirmSubscriptionProps> = ({ visible, developer, onDone }) => {
  if (!developer) return null
  const [isSuccess, setSuccess] = React.useState(false)
  const dispatch = useDispatch()
  const loading = useSelector(selectCreateDeveloperSubscriptionLoading)
  const hasError = useSelector(selectCreateDeveloperSubscriptionError)

  const subscriptionModal = (
    <>
      <ModalHeader title="Success" />
      <ModalBody
        body={
          <>
            <SubTitleH6 className={developerEditionStyles.subTitle}>
              You have successfully subscribed 1 Agency Cloud user licence and an email has been sent to the following
              members of your organisation with instructions on how to get started.
            </SubTitleH6>
            <SubTitleH6 className={developerEditionStyles.subTitle}>
              {developer.name} -{' '}
              <a
                className={linkStyles.link}
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${developer.email}`}
              >
                {developer.email}
              </a>
            </SubTitleH6>
            <SubTitleH6 className={developerEditionStyles.subTitle}>
              We have added your subscription to your monthly billing. To manage your subscriptions please visit the
              &apos;Billing&apos; tab.
            </SubTitleH6>
            <SubTitleH6 className={developerEditionStyles.subTitle}>
              Reminder: There is no charge for the Developer Edition Licence during the Beta Phase.
            </SubTitleH6>
            {hasError && (
              <SubTitleH6 className="has-text-danger">
                It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud.
                If you have not received your email with instructions on how to download, please let us know using the
                live chat feature on the{' '}
                <a className={linkStyles.link} target="_blank" rel="noopener noreferrer" href={HELP_PAGE_LINK}>
                  &apos;Help&apos;
                </a>{' '}
                page.
              </SubTitleH6>
            )}
          </>
        }
      />
      <ModalFooter
        footerItems={
          <Button
            variant="primary"
            loading={loading}
            type="button"
            onClick={handleCreateSubscription(dispatch, developer, setSuccess)}
          >
            CLOSE
          </Button>
        }
      />
    </>
  )

  const errorModal = (
    <>
      <ModalHeader title="Existing Subscription" />
      <ModalBody
        body={
          <SubTitleH6 className={developerEditionStyles.subTitle}>
            It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud. If
            you have not received your email with instructions on how to download, please let us know using the live
            chat feature on the{' '}
            <a className={linkStyles.link} target="_blank" rel="noopener noreferrer" href={HELP_PAGE_LINK}>
              &apos;Help&apos;
            </a>{' '}
            page.
          </SubTitleH6>
        }
      />
      <ModalFooter
        footerItems={
          <Button
            variant="primary"
            loading={loading}
            type="button"
            onClick={handleAfterCloseModal(onDone, dispatch, setSuccess)}
          >
            CLOSE
          </Button>
        }
      />
    </>
  )

  const successModal = (
    <CallToAction title="Success" buttonText="OK" onButtonClick={handleAfterCloseModal(onDone, dispatch, setSuccess)}>
      {/* TBC */}
    </CallToAction>
  )

  let content

  if (isSuccess) {
    content = successModal
  } else if (hasError) {
    content = errorModal
  } else {
    content = subscriptionModal
  }
  return (
    <Modal visible={visible} afterClose={handleAfterCloseModal(onDone, dispatch, setSuccess)} renderChildren>
      {content}
    </Modal>
  )
}

export default DeveloperConfirmSubscription

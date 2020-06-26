import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreateDeveloperSubscriptionError,
} from '@/selector/developer-subscriptions'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalProps, SubTitleH6 } from '@reapit/elements'
import { developerCreateSubscription, developerCreateSubscriptionClearError } from '@/actions/developer-subscriptions'
import linkStyles from '@/styles/elements/link.scss?mod'

const HELP_PAGE_LINK = 'https://marketplace.reapit.cloud/developer/help'

export interface DeveloperConfirmSubscriptionProps extends Pick<ModalProps, 'visible'> {
  developer?: DeveloperModel
  onDone: () => void
}

export const handleCreateSubscription = (dispatch, developer, onDone) => () => {
  dispatch(
    developerCreateSubscription({
      params: {
        developerId: developer.id || '',
        user: developer.email || '',
        applicationId: '', // TBC
        type: 'developerEdition',
      },
      onCreated: () => {
        onDone()
      },
    }),
  )
}

export const handleAfterCloseModal = (dispatch, onDone) => () => {
  dispatch(developerCreateSubscriptionClearError())
  onDone()
}

const DeveloperConfirmSubscription: React.FC<DeveloperConfirmSubscriptionProps> = ({ visible, developer, onDone }) => {
  if (!developer) return null
  const dispatch = useDispatch()
  const loading = useSelector(selectCreateDeveloperSubscriptionLoading)
  const hasError = useSelector(selectCreateDeveloperSubscriptionError)

  return (
    <Modal
      visible={visible}
      title="Success"
      afterClose={handleAfterCloseModal(dispatch, onDone)}
      footerItems={
        <Button
          variant="primary"
          loading={loading}
          type="button"
          onClick={handleCreateSubscription(dispatch, developer, onDone)}
        >
          CLOSE
        </Button>
      }
    >
      <>
        <SubTitleH6>
          You have successfully subscribed 1 Agency Cloud user licence and an email has been sent to the following
          members of your organisation with instructions on how to get started.
        </SubTitleH6>
        <SubTitleH6>
          {developer.name} -{' '}
          <a className={linkStyles.link} target="_blank" rel="noopener noreferrer" href={`mailto:${developer.email}`}>
            {developer.email}
          </a>
        </SubTitleH6>
        <SubTitleH6>
          We have added your subscription to your monthly billing. To manage your subscriptions please visit the
          &apos;Billing&apos; tab.
        </SubTitleH6>
        <SubTitleH6>Reminder: There is no charge for the Developer Edition Licence during the Beta Phase.</SubTitleH6>
        {hasError && (
          <SubTitleH6 className="has-text-danger">
            It looks as though you already have a subscription in place for the Developer Edition of Agency Cloud. If
            you have not received your email with instructions on how to download, please let us know using the live
            chat feature on the{' '}
            <a className={linkStyles.link} target="_blank" rel="noopener noreferrer" href={HELP_PAGE_LINK}>
              &apos;Help&apos;
            </a>{' '}
            page.
          </SubTitleH6>
        )}
      </>
    </Modal>
  )
}

export default DeveloperConfirmSubscription

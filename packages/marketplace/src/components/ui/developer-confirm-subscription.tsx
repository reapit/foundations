import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectCreateDeveloperSubscriptionLoading } from '@/selector/developer-subscriptions'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalProps, SubTitleH6 } from '@reapit/elements'
import linkStyles from '@/styles/elements/link.scss?mod'

export interface DeveloperConfirmSubscriptionProps extends Pick<ModalProps, 'visible'> {
  developer?: DeveloperModel
  handleCreateSubscription: (developer: DeveloperModel) => void
}

const DeveloperConfirmSubscription: React.FC<DeveloperConfirmSubscriptionProps> = ({
  visible,
  developer,
  handleCreateSubscription,
}) => {
  if (!developer) return null

  const loading = useSelector(selectCreateDeveloperSubscriptionLoading)

  return (
    <Modal
      visible={visible}
      title="Success"
      footerItems={
        <Button variant="primary" loading={loading} type="button" onClick={() => handleCreateSubscription(developer)}>
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
      </>
    </Modal>
  )
}

export default DeveloperConfirmSubscription

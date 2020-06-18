import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreatedDeveloperSubscription,
} from '@/selector/developer-subscriptions'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalProps, SubTitleH6 } from '@reapit/elements'
import { developerCreateSubscription } from '@/actions/developer-subscriptions'
import linkStyles from '@/styles/elements/link.scss?mod'

export interface DeveloperConfirmSubscriptionProps extends ModalProps {
  developer: DeveloperModel
}

export const handleSubmit = (dispatch, developer: DeveloperModel) => () => {
  dispatch(
    developerCreateSubscription({
      developerId: developer.id || '',
      user: developer.email || '',
      applicationId: '', // TBC
      type: 'developerEdition',
    }),
  )
}

const DeveloperConfirmSubscription: React.FC<DeveloperConfirmSubscriptionProps> = ({
  visible,
  title = 'Success',
  tapOutsideToDissmiss = false,
  developer,
  afterClose,
  ...rest
}) => {
  const dispatch = useDispatch()
  const loading = useSelector(selectCreateDeveloperSubscriptionLoading)
  const subscription = useSelector(selectCreatedDeveloperSubscription)

  React.useEffect(() => {
    if (!loading && subscription && afterClose) {
      afterClose()
    }
  }, [loading, subscription, afterClose])

  return (
    <Modal
      visible={visible}
      title={title}
      tapOutsideToDissmiss={tapOutsideToDissmiss}
      footerItems={
        <>
          <Button variant="primary" loading={loading} type="button" onClick={handleSubmit(dispatch, developer)}>
            CLOSE
          </Button>
        </>
      }
      {...rest}
    >
      <>
        <SubTitleH6>
          You have successfully subscribed 1 Agency Cloud user licences and an email has been sent to the following
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

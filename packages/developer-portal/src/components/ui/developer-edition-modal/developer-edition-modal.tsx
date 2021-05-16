import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalProps } from '@reapit/elements'
import { selectLoginIdentity } from '@/selector/auth'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreateDeveloperSubscriptionError,
} from '@/selector/developer-subscriptions'
import { developerCreateSubscription, developerCreateSubscriptionClearError } from '@/actions/developer-subscriptions'
import DeveloperEditionContent from './developer-edition-content'
import SuccessContent from './success-content'
import ErrorContent from './error-content'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { SetStateAction } from 'react'
import { SubscribingState } from '../../pages/desktop/desktop'

export type DeveloperEditionModalProps = Pick<ModalProps, 'visible'> & {
  setSubscribingState: React.Dispatch<SetStateAction<SubscribingState>>
}

export const handleOnCreated = (
  setSelectedDeveloper: React.Dispatch<React.SetStateAction<DeveloperModel | undefined>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => (developer: DeveloperModel) => () => {
  setSelectedDeveloper(developer)
  setSuccess(true)
}

export const handleOnConfirm = (
  developer: Partial<DeveloperModel>,
  dispatch: Dispatch,
  onCreated: (developer: DeveloperModel) => () => void,
) => () => {
  dispatch(
    developerCreateSubscription({
      params: {
        developerId: developer.id || '',
        user: developer.email || '',
        applicationId: '', // TBC
        type: 'developerEdition',
      },
      onCreated: onCreated(developer),
    }),
  )
}

export const handleAfterClose = (
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch,
  setSubscribingState: React.Dispatch<SetStateAction<SubscribingState>>,
) => () => {
  setSuccess(false)
  dispatch(developerCreateSubscriptionClearError())
  setSubscribingState('INITIAL')
}

export const DeveloperEditionModal: React.FC<DeveloperEditionModalProps> = ({
  visible = false,
  setSubscribingState,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  // For now just have 1 item: the current developer
  // Need to change to list of developer in organisation after finish "organisation" feature
  const developerName = loginIdentity?.name
  const developerId = loginIdentity?.developerId || ''
  const developerEmail = loginIdentity?.email

  const developer: Partial<DeveloperModel> = { id: developerId, name: developerName, email: developerEmail }

  const [isSuccess, setSuccess] = React.useState<boolean>(false)
  const [selectedDeveloper, setSelectedDeveloper] = React.useState<DeveloperModel | undefined>()
  const dispatch = useDispatch()
  const loading = useSelector(selectCreateDeveloperSubscriptionLoading)
  const hasError = useSelector(selectCreateDeveloperSubscriptionError)

  let content

  if (isSuccess) {
    content = (
      <SuccessContent
        developer={selectedDeveloper}
        afterClose={handleAfterClose(setSuccess, dispatch, setSubscribingState)}
      />
    )
  } else if (hasError) {
    content = <ErrorContent afterClose={handleAfterClose(setSuccess, dispatch, setSubscribingState)} />
  } else {
    content = (
      <DeveloperEditionContent
        developer={developer}
        loading={loading}
        afterClose={handleAfterClose(setSuccess, dispatch, setSubscribingState)}
        handleOnConfirm={handleOnConfirm(developer, dispatch, handleOnCreated(setSelectedDeveloper, setSuccess))}
      />
    )
  }

  return (
    <Modal visible={visible} afterClose={handleAfterClose(setSuccess, dispatch, setSubscribingState)} renderChildren>
      {content}
    </Modal>
  )
}

export default DeveloperEditionModal

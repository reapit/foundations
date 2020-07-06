import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalProps, SelectOption } from '@reapit/elements'
import { selectLoginIdentity } from '@/selector/auth'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreateDeveloperSubscriptionError,
} from '@/selector/developer-subscriptions'
import { developerCreateSubscription, developerCreateSubscriptionClearError } from '@/actions/developer-subscriptions'
import { FormValues } from './form-fields'
import DeveloperEditionContent from './developer-edition-content'
import SuccessContent from './success-content'
import ErrorContent from './error-content'

export type DeveloperEditionModalProps = Pick<ModalProps, 'afterClose' | 'visible'>

export const handleOnCreated = (
  setSelectedDeveloper: React.Dispatch<React.SetStateAction<DeveloperModel | undefined>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => developer => () => {
  setSelectedDeveloper(developer)
  setSuccess(true)
}

export const handleFormSubmit = (
  developerLists: Partial<DeveloperModel>[],
  dispatch: Dispatch,
  onCreated: (developer: DeveloperModel) => () => void,
) => (values: FormValues) => {
  const selectedDeveloperIds = values.developerList
  const selectedDevelopers = developerLists.filter(developer => selectedDeveloperIds.includes(developer.id || ''))
  // For now just call api with one developer
  const developer = selectedDevelopers[0]

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
  afterClose: (() => void) | undefined,
) => () => {
  setSuccess(false)
  dispatch(developerCreateSubscriptionClearError())
  afterClose && afterClose()
}

export const DeveloperEditionModal: React.FC<DeveloperEditionModalProps> = ({ visible = false, afterClose }) => {
  const loginIdentity = useSelector(selectLoginIdentity)
  // For now just have 1 item: the current developer
  // Need to change to list of developer in organisation after finish "organisation" feature
  const developerName = loginIdentity?.name
  const developerId = loginIdentity?.developerId || ''
  const developerEmail = loginIdentity?.email
  const developerLists: Partial<DeveloperModel>[] = [{ id: developerId, name: developerName, email: developerEmail }]

  const dropdownOptions: SelectOption[] = developerLists.map(({ id, name }) => ({
    value: id || '',
    label: name || '',
    description: name,
  }))

  const [isSuccess, setSuccess] = React.useState<boolean>(false)
  const [selectedDeveloper, setSelectedDeveloper] = React.useState<DeveloperModel | undefined>()
  const dispatch = useDispatch()
  const loading = useSelector(selectCreateDeveloperSubscriptionLoading)
  const hasError = useSelector(selectCreateDeveloperSubscriptionError)

  let content

  if (isSuccess) {
    content = (
      <SuccessContent developer={selectedDeveloper} afterClose={handleAfterClose(setSuccess, dispatch, afterClose)} />
    )
  } else if (hasError) {
    content = <ErrorContent afterClose={handleAfterClose(setSuccess, dispatch, afterClose)} />
  } else {
    content = (
      <DeveloperEditionContent
        dropdownOptions={dropdownOptions}
        loading={loading}
        afterClose={handleAfterClose(setSuccess, dispatch, afterClose)}
        onFormSubmit={handleFormSubmit(developerLists, dispatch, handleOnCreated(setSelectedDeveloper, setSuccess))}
      />
    )
  }

  return (
    <Modal visible={visible} afterClose={handleAfterClose(setSuccess, dispatch, afterClose)} renderChildren>
      {content}
    </Modal>
  )
}

export default DeveloperEditionModal

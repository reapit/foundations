import { CreateSubscriptionModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Modal, ModalProps } from '@reapit/elements-legacy'
import { selectLoginIdentity } from '../../../utils/auth'
import DeveloperEditionContent from './developer-edition-content'
import SuccessContent from './success-content'
import ErrorContent from './error-content'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubscribingState } from '../desktop'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'

export type DeveloperEditionModalProps = Pick<ModalProps, 'visible'> & {
  setSubscribingState: Dispatch<SetStateAction<SubscribingState>>
}

export const handleOnConfirm =
  (
    developer: Partial<DeveloperModel>,
    createSubscription: SendFunction<CreateSubscriptionModel, boolean>,
    setSelectedDeveloper: Dispatch<SetStateAction<DeveloperModel | undefined>>,
    setSuccess: Dispatch<SetStateAction<boolean>>,
  ) =>
  async () => {
    const subscription = await createSubscription({
      developerId: developer.id || '',
      user: developer.email || '',
      applicationId: '', // TBC
      type: 'developerEdition',
    })

    if (subscription) {
      setSelectedDeveloper(developer)
      setSuccess(true)
    }
  }

export const handleAfterClose = (setSuccess: Dispatch<SetStateAction<boolean>>) => () => {
  setSuccess(false)
}

export const DeveloperEditionModal: FC<DeveloperEditionModalProps> = ({ visible = false }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  // For now just have 1 item: the current developer
  // Need to change to list of developer in organisation after finish "organisation" feature
  const developerName = loginIdentity?.name
  const developerId = loginIdentity?.developerId || ''
  const developerEmail = loginIdentity?.email
  const agencyCloudId = loginIdentity.agencyCloudId

  const developer: Partial<DeveloperModel> = { id: developerId, name: developerName, email: developerEmail }
  const desktopIsFree = Boolean(agencyCloudId && agencyCloudId !== 'SBOX' && agencyCloudId !== 'SBXA')

  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperModel | undefined>()

  const [, subscriptionCreating, createSubscription, , createSubscriptionFailed] = useReapitUpdate<
    CreateSubscriptionModel,
    boolean
  >({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createSubscription],
    method: 'POST',
  })

  let content

  if (isSuccess) {
    content = <SuccessContent developer={selectedDeveloper} afterClose={handleAfterClose(setSuccess)} />
  } else if (createSubscriptionFailed) {
    content = <ErrorContent afterClose={handleAfterClose(setSuccess)} />
  } else {
    content = (
      <DeveloperEditionContent
        developer={developer}
        desktopIsFree={desktopIsFree}
        loading={Boolean(subscriptionCreating)}
        afterClose={handleAfterClose(setSuccess)}
        handleOnConfirm={handleOnConfirm(developer, createSubscription, setSelectedDeveloper, setSuccess)}
      />
    )
  }

  return (
    <Modal visible={visible} afterClose={handleAfterClose(setSuccess)} renderChildren>
      {content}
    </Modal>
  )
}

export default DeveloperEditionModal

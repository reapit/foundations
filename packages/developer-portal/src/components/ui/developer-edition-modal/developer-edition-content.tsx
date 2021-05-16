import * as React from 'react'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalProps, ButtonGroup, Content } from '@reapit/elements'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '../../../selector/settings'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '../../../selector/current-member'
import { useSelector } from 'react-redux'
import { modalContent } from './modal-content'
import { Loader } from '@reapit/elements/v3'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export type DeveloperEditionContentProps = Pick<ModalProps, 'afterClose'> & {
  developer: Partial<DeveloperModel>
  loading: boolean
  handleOnConfirm: () => void
}

export const DeveloperEditionContent: React.FC<DeveloperEditionContentProps> = ({
  developer,
  loading,
  afterClose,
  handleOnConfirm,
}) => {
  const currentUser = useSelector(selectCurrentMemberData)
  const currentUserLoading = useSelector(selectCurrentMemberIsLoading)
  const currentDeveloper = useSelector(selectSettingsPageDeveloperInformation)
  const currentDeveloperLoading = useSelector(selectSettingsPageIsLoading)

  const billingContent =
    currentUser?.role &&
    currentDeveloper?.status &&
    modalContent?.[currentUser.role]?.[currentDeveloper.status]?.content

  const content =
    currentUserLoading || currentDeveloperLoading ? (
      <Loader label="Loading" />
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
          The Agency Cloud Developer Edition is a licensed product. By confirming the subscription below, a subscription
          of £300 will automatically be added to your monthly billing. For more information regarding the Developer
          Edition licence please refer to your Developer Registration{' '}
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

  const heading =
    (currentUser?.role &&
      currentDeveloper?.status &&
      modalContent?.[currentUser.role]?.[currentDeveloper.status]?.title) ??
    'Agency Cloud Developer Edition'

  return (
    <>
      <ModalHeader title={heading} />
      <ModalBody body={content} />
    </>
  )
}

export default DeveloperEditionContent

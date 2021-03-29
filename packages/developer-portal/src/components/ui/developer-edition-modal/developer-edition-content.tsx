import * as React from 'react'
import { Formik } from 'formik'
import {
  Button,
  SubTitleH6,
  ModalHeader,
  Form,
  ModalBody,
  DropdownSelect,
  SelectOption,
  ModalProps,
  ButtonGroup,
  Loader,
  Content,
} from '@reapit/elements'
import { FormValues } from './form-fields'
import { formFields } from './form-fields'
import validationSchema from './validation-schema'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '../../../selector/settings'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '../../../selector/current-member'
import { useSelector } from 'react-redux'
import { modalContent } from './modal-content'

const { developerList } = formFields

export type DeveloperEditionContentProps = Pick<ModalProps, 'afterClose'> & {
  dropdownOptions: SelectOption[]
  loading: boolean
  onFormSubmit: (values: FormValues) => void
}

export const DeveloperEditionContent: React.FC<DeveloperEditionContentProps> = ({
  dropdownOptions,
  loading,
  afterClose,
  onFormSubmit,
}) => {
  const currentUser = useSelector(selectCurrentMemberData)
  const currentUserLoading = useSelector(selectCurrentMemberIsLoading)
  const currentDeveloper = useSelector(selectSettingsPageDeveloperInformation)
  const currentDeveloperLoading = useSelector(selectSettingsPageIsLoading)

  const initialValues: FormValues = {
    developerList: dropdownOptions.map(({ value }) => value),
  }
  const billingContent =
    currentUser?.role &&
    currentDeveloper?.status &&
    modalContent?.[currentUser.role]?.[currentDeveloper.status]?.content

  const content =
    currentUserLoading || currentDeveloperLoading ? (
      <Loader />
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
          To proceed, please confirm your subscription below
        </SubTitleH6>
        <Formik initialValues={initialValues} onSubmit={onFormSubmit} validationSchema={validationSchema}>
          <Form className="form">
            <DropdownSelect
              mode="multiple"
              options={dropdownOptions}
              name={developerList.name}
              id={developerList.name}
              placeholder={developerList.placeHolder}
              fixedPosition
              hasLabel={false}
            />
            <ButtonGroup hasSpacing isCentered>
              <Button variant="secondary" onClick={afterClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={loading}>
                Confirm Subscription
              </Button>
            </ButtonGroup>
          </Form>
        </Formik>
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

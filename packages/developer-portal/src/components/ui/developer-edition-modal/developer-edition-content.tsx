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
} from '@reapit/elements'
import { FormValues } from './form-fields'
import pdfLink from '@/assets/files/reapit-foundations-developer-agreement.pdf'
import { formFields } from './form-fields'
import validationSchema from './validation-schema'

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
  const initialValues: FormValues = {
    developerList: dropdownOptions.map(({ value }) => value),
  }

  return (
    <>
      <ModalHeader title="Agency Cloud Developer Edition" />
      <ModalBody
        body={
          <>
            <SubTitleH6 className="has-text-weight-normal">
              The Agency Cloud Developer Edition is a licensed product. However, there will be no charge for the licence
              during the Beta phase. For more information regarding the Developer Edition licence please refer to your
              Developer Registration&nbsp;
              <a href={pdfLink} rel="noreferrer" target="_blank">
                Terms and Conditions
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
        }
      />
    </>
  )
}

export default DeveloperEditionContent

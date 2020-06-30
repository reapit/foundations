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
  LevelRight,
} from '@reapit/elements'
import developerEditionStyles from '@/styles/blocks/developer-edition-modal.scss?mod'
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
            <SubTitleH6 className={developerEditionStyles.subTitle}>
              The Agency Cloud Developer Edition is used for testing your application and is a licenced product. The
              cost per licence is £300.00 (plus VAT) per month. It will be automatically added to your monthly billing
              and will auto renew until you cancel.
              <br />
              <br />
              There will be no charge for the licence during the Beta phase. For more information regarding the
              Developer Edition please refer to your Developer Registration&nbsp;
              <a href={pdfLink} rel="noreferrer" target="_blank">
                Terms and Conditions
              </a>
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
                <LevelRight>
                  <Button fullWidth variant="secondary" onClick={afterClose}>
                    Cancel
                  </Button>
                  <Button fullWidth variant="primary" type="submit" loading={loading}>
                    Confirm Subscription
                  </Button>
                </LevelRight>
              </Form>
            </Formik>
          </>
        }
      />
    </>
  )
}

export default DeveloperEditionContent

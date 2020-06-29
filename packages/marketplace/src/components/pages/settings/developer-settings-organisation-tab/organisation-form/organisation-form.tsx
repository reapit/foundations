import React from 'react'
import {
  FlexContainerResponsive,
  Content,
  FlexContainerBasic,
  Button,
  Formik,
  Form,
  LevelRight,
} from '@reapit/elements'
import { companyInformationFormSchema } from './form-schema/validation-schema'
import { formFields } from './form-schema/form-fields'
import CompanyInformationSection from './company-information-section'
import CompanyAddressSection from './company-address-section'

const {
  aboutField,
  countryIdField,
  companyNameField,
  iconImageUrlField,
  line1Field,
  line2Field,
  line3Field,
  line4Field,
  vatNumberField,
  noVatNumberField,
  officeEmailField,
  postCodeField,
  regField,
  noRegField,
  telField,
  websiteField,
  nationalInsuranceNumberField,
} = formFields

export type OrganisationFormValues = {
  [x: string]: string | boolean
}

const initialValues: OrganisationFormValues = {
  [aboutField.name]: '',
  [countryIdField.name]: '',
  [companyNameField.name]: '',
  [iconImageUrlField.name]: '',
  [line1Field.name]: '',
  [line2Field.name]: '',
  [line3Field.name]: '',
  [line4Field.name]: '',
  [vatNumberField.name]: '',
  [noVatNumberField.name]: false,
  [officeEmailField.name]: '',
  [postCodeField.name]: '',
  [regField.name]: '',
  [noRegField.name]: false,
  [telField.name]: '',
  [websiteField.name]: '',
  [nationalInsuranceNumberField.name]: '',
}

export type OrganisationFormProps = {}

const OrganisationForm: React.FC<OrganisationFormProps> = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <Formik
            initialValues={initialValues}
            validationSchema={companyInformationFormSchema}
            onSubmit={values => {
              // TBC
              console.log(values)
            }}
          >
            {({ values }) => {
              return (
                <Form>
                  <CompanyInformationSection formValues={values} />
                  <CompanyAddressSection />
                  <LevelRight>
                    <Button className="mt-8" type="submit">
                      Save
                    </Button>
                  </LevelRight>
                </Form>
              )
            }}
          </Formik>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default OrganisationForm

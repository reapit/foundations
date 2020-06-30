import React from 'react'
import { Button, Formik, Form, LevelRight, H3, FormSection } from '@reapit/elements'
import { companyInformationFormSchema } from './form-schema/validation-schema'
import { OrganisationFormValues } from './form-schema/form-fields'
import CompanyInformationSection from './company-information-section'
import CompanyAddressSection from './company-address-section'

export const initialValues: OrganisationFormValues = {
  about: '',
  countryId: '',
  companyName: '',
  iconImageUrl: '',
  line1: '',
  line2: '',
  line3: '',
  line4: '',
  vatNumber: '',
  noVatNumber: false,
  officeEmail: '',
  postCode: '',
  reg: '',
  noReg: false,
  tel: '',
  website: '',
  nationalInsuranceNumber: '',
}

export type OrganisationFormProps = {}

const OrganisationForm: React.FC<OrganisationFormProps> = () => {
  return (
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
            <H3 isHeadingSection>Company Information</H3>
            <FormSection>
              <CompanyInformationSection formValues={values} />
              <CompanyAddressSection />
              <LevelRight>
                <Button className="mt-8" type="submit">
                  Save
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default OrganisationForm

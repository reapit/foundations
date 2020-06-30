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

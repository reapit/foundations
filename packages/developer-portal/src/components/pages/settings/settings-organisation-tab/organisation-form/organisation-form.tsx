import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Formik, Form, LevelRight, H3, FormSection, Loader } from '@reapit/elements'
import { companyInformationFormSchema } from './form-schema/validation-schema'
import { OrganisationFormValues } from './form-schema/form-fields'
import CompanyInformationSection from './company-information-section'
import CompanyAddressSection from './company-address-section'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '@/selector/settings'

export const defaultInitialValues: OrganisationFormValues = {
  about: '',
  countryId: '',
  companyName: '',
  iconImageUrl: '',
  buildingName: '',
  buildingNumber: '',
  line1: '',
  line2: '',
  line3: '',
  line4: '',
  taxNumber: '',
  noTaxRegistration: false,
  email: '',
  postcode: '',
  registrationNumber: '',
  noRegistrationNumber: false,
  telephone: '',
  website: '',
  nationalInsurance: '',
}

export const generateInitialValues = ({
  developerInfo,
  defaultInitialValues,
}: {
  developerInfo: DeveloperModel | null
  defaultInitialValues: OrganisationFormValues
}): OrganisationFormValues => {
  if (!developerInfo) {
    return defaultInitialValues
  }
  const { companyAddress = {}, ...otherData } = developerInfo
  const {
    line1 = '',
    line2 = '',
    line3 = '',
    line4 = '',
    buildingName = '',
    buildingNumber = '',
    postcode = '',
    countryId = '',
  } = companyAddress
  const {
    about = '',
    companyName = '',
    iconImageUrl = '',
    taxNumber = '',
    noTaxRegistration = false,
    email = '',
    registrationNumber = '',
    noRegistrationNumber = false,
    telephone = '',
    website = '',
    nationalInsurance = '',
  } = otherData
  return {
    about,
    countryId,
    companyName,
    iconImageUrl,
    buildingName,
    buildingNumber,
    line1,
    line2,
    line3,
    line4,
    taxNumber,
    noTaxRegistration,
    email,
    postcode,
    registrationNumber,
    noRegistrationNumber,
    telephone,
    website,
    nationalInsurance,
  }
}

export type OrganisationFormProps = {}

const OrganisationForm: React.FC<OrganisationFormProps> = () => {
  const isLoading: boolean = useSelector(selectSettingsPageIsLoading)
  const developerInfo: DeveloperModel | null = useSelector(selectSettingsPageDeveloperInformation)

  if (isLoading) {
    return <Loader />
  }

  return (
    <Formik
      initialValues={generateInitialValues({ developerInfo, defaultInitialValues })}
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
                <Button type="submit">Save</Button>
              </LevelRight>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default OrganisationForm

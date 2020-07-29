import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Formik, Form, LevelRight, H3, FormSection, Loader } from '@reapit/elements'
import { companyInformationFormSchema } from './form-schema/validation-schema'
import { OrganisationFormValues } from './form-schema/form-fields'
import CompanyInformationSection from './company-information-section'
import CompanyAddressSection from './company-address-section'
import { DeveloperModel, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '@/selector/settings'
import { updateDeveloperData } from '@/actions/settings'

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
    company: companyName = '',
    taxNumber = '',
    noTaxRegistration = false,
    email = '',
    registrationNumber = '',
    telephone = '',
    website = '',
    nationalInsurance = '',
  } = otherData
  return {
    about,
    countryId,
    companyName,
    // TBC
    iconImageUrl: '',
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
    noRegistrationNumber: !registrationNumber,
    telephone,
    website,
    nationalInsurance,
  }
}

export type OrganisationFormProps = {}

export const handleSubmit = updateDeveloperDataDispatch => (values: OrganisationFormValues) => {
  const {
    line1,
    line2,
    line3,
    line4,
    buildingName,
    buildingNumber,
    postcode,
    countryId,
    noRegistrationNumber,
    ...otherData
  } = values

  const companyAddress = {
    line1,
    line2,
    line3,
    line4,
    buildingName,
    buildingNumber,
    postcode,
    countryId,
  }

  // reset all unncessary fields to '' when checked appropriate checkboxes
  if (noRegistrationNumber) {
    otherData.registrationNumber = ''
  }

  if (!noRegistrationNumber) {
    otherData.nationalInsurance = ''
  }

  if (otherData.noTaxRegistration) {
    otherData.taxNumber = ''
  }

  // TBC, exclude for now
  delete otherData.iconImageUrl
  const dataToSubmit: UpdateDeveloperModel = {
    ...otherData,
    companyAddress,
  }
  updateDeveloperDataDispatch(dataToSubmit)
}

const OrganisationForm: React.FC<OrganisationFormProps> = () => {
  const dispatch = useDispatch()
  const updateDeveloperDataDispatch = values => dispatch(updateDeveloperData(values))
  const isLoading: boolean = useSelector(selectSettingsPageIsLoading)
  const developerInfo: DeveloperModel | null = useSelector(selectSettingsPageDeveloperInformation)

  if (isLoading) {
    return <Loader />
  }

  return (
    <Formik
      initialValues={generateInitialValues({ developerInfo, defaultInitialValues })}
      validationSchema={companyInformationFormSchema}
      onSubmit={handleSubmit(updateDeveloperDataDispatch)}
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

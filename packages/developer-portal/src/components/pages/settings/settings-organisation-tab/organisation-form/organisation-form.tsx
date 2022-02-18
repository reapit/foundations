import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Formik, Form, LevelRight, H3, FormSection } from '@reapit/elements-legacy'
import { companyInformationFormSchema } from './form-schema/validation-schema'
import { OrganisationFormValues } from './form-schema/form-fields'
import CompanyInformationSection from './company-information-section'
import CompanyAddressSection from './company-address-section'
import { DeveloperModel, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectSettingsPageDeveloperInformation, selectSettingsPageIsLoading } from '@/selector/settings'
import { updateDeveloperData } from '@/actions/settings'
import FadeIn from '../../../../../styles/fade-in'
import { Loader } from '@reapit/elements'

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
  notificationsEmail: '',
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
    notificationsEmail = '',
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
    notificationsEmail,
    postcode,
    registrationNumber,
    noRegistrationNumber: Boolean(nationalInsurance),
    telephone,
    website,
    nationalInsurance,
  }
}

export type OrganisationFormProps = {
  onInviteNewMemberClick: () => void
}

export const handleSubmit = (updateDeveloperDataDispatch) => (values: OrganisationFormValues) => {
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
  debugger
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

const OrganisationForm: React.FC<OrganisationFormProps> = ({ onInviteNewMemberClick }) => {
  const dispatch = useDispatch()
  const updateDeveloperDataDispatch = (values) => dispatch(updateDeveloperData(values))
  const isLoading: boolean = useSelector(selectSettingsPageIsLoading)
  const developerInfo: DeveloperModel | null = useSelector(selectSettingsPageDeveloperInformation)

  if (isLoading) {
    return <Loader label="Loading" />
  }

  return (
    <Formik
      initialValues={generateInitialValues({ developerInfo, defaultInitialValues })}
      validationSchema={companyInformationFormSchema}
      onSubmit={handleSubmit(updateDeveloperDataDispatch)}
    >
      {({ values, errors }) => {
        console.log(values)
        console.log(errors)
        return (
          <Form>
            <H3 className="flex justify-between">
              <span>Company Information</span>
              <span>
                <Button type="button" variant="primary" onClick={onInviteNewMemberClick}>
                  Invite New Member
                </Button>
              </span>
            </H3>
            <FormSection>
              <FadeIn>
                <CompanyInformationSection formValues={values} />
              </FadeIn>
              <FadeIn>
                <CompanyAddressSection />
              </FadeIn>
              <FadeIn>
                <LevelRight>
                  <Button type="submit">Save</Button>
                </LevelRight>
              </FadeIn>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default OrganisationForm

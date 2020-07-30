import { FormFieldInfo } from '@reapit/elements'

export type FieldKeys =
  | 'taxNumberField'
  | 'noTaxRegistrationField'
  | 'nationalInsuranceField'
  | 'emailField'
  | 'companyNameField'
  | 'telephoneField'
  | 'websiteField'
  | 'registrationNumberField'
  | 'noRegistrationNumberField'
  | 'aboutField'
  | 'iconImageUrlField'
  | 'buildingNameField'
  | 'buildingNumberField'
  | 'line1Field'
  | 'line2Field'
  | 'line3Field'
  | 'line4Field'
  | 'countryIdField'
  | 'postcodeField'
export type FormFields = Partial<Record<FieldKeys, string>>

export type OrganisationFormValues = {
  taxNumber: string
  noTaxRegistration: boolean
  nationalInsurance: string
  email: string
  about: string
  companyName: string
  countryId: string
  iconImageUrl: string
  buildingName: string
  buildingNumber: string
  line1: string
  line2: string
  line3: string
  line4: string
  postcode: string
  registrationNumber: string
  noRegistrationNumber: boolean
  telephone: string
  website: string
}

export const formFields: Record<FieldKeys, FormFieldInfo> = {
  taxNumberField: {
    name: 'taxNumber',
    label: 'VAT Number',
  },
  noTaxRegistrationField: {
    name: 'noTaxRegistration',
    label: 'Not VAT Registered',
  },
  nationalInsuranceField: {
    name: 'nationalInsurance',
    label: 'National Insurance Number',
  },
  emailField: {
    name: 'email',
    label: 'Office Email',
    errorMessage: 'Office email is not valid',
  },
  aboutField: {
    name: 'about',
    label: 'About',
  },
  companyNameField: {
    name: 'companyName',
    label: 'Company Name',
    errorMessage: 'Company name is not valid',
  },
  countryIdField: {
    name: 'countryId',
    label: 'Country',
  },
  iconImageUrlField: {
    name: 'iconImageUrl',
    label: 'Upload Logo',
  },
  buildingNameField: {
    name: 'buildingName',
    label: 'Building Name',
  },
  buildingNumberField: {
    name: 'buildingNumber',
    label: 'Building Number',
  },
  line1Field: {
    name: 'line1',
    label: 'Address Line 1*',
  },
  line2Field: {
    name: 'line2',
    label: 'Address Line 2',
  },
  line3Field: {
    name: 'line3',
    label: 'Address Line 3',
  },
  line4Field: {
    name: 'line4',
    label: 'Address Line 4',
  },
  postcodeField: {
    name: 'postcode',
    label: 'Postcode',
  },
  registrationNumberField: {
    name: 'registrationNumber',
    label: 'Company registration number',
  },
  noRegistrationNumberField: {
    name: 'noRegistrationNumber',
    label: 'No Company registration number',
  },
  telephoneField: {
    name: 'telephone',
    label: 'Telephone',
  },
  websiteField: {
    name: 'website',
    label: 'Website',
    errorMessage: 'Website is not valid',
  },
}

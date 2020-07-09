import { FormFieldInfo } from '@reapit/elements'

export type FieldKeys =
  | 'vatNumberField'
  | 'noVatNumberField'
  | 'nationalInsuranceNumberField'
  | 'officeEmailField'
  | 'companyNameField'
  | 'telField'
  | 'websiteField'
  | 'regField'
  | 'noRegField'
  | 'aboutField'
  | 'iconImageUrlField'
  | 'buildingNameField'
  | 'buildingNumberField'
  | 'line1Field'
  | 'line2Field'
  | 'line3Field'
  | 'line4Field'
  | 'countryIdField'
  | 'postCodeField'
export type FormFields = Partial<Record<FieldKeys, string>>

export type OrganisationFormValues = {
  vatNumber: string
  noVatNumber: boolean
  nationalInsuranceNumber: string
  officeEmail: string
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
  postCode: string
  reg: string
  noReg: boolean
  tel: string
  website: string
}

export const formFields: Record<FieldKeys, FormFieldInfo> = {
  vatNumberField: {
    name: 'vatNumber',
    label: 'VAT Number',
  },
  noVatNumberField: {
    name: 'noVatNumber',
    label: 'Not VAT Registered',
  },
  nationalInsuranceNumberField: {
    name: 'nationalInsuranceNumber',
    label: 'National Insurance Number',
  },
  officeEmailField: {
    name: 'officeEmail',
    label: 'Office Email',
  },
  aboutField: {
    name: 'about',
    label: 'About',
  },
  companyNameField: {
    name: 'companyName',
    label: 'Company Name',
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
  postCodeField: {
    name: 'postCode',
    label: 'Postcode',
  },
  regField: {
    name: 'reg',
    label: 'Company registration number',
  },
  noRegField: {
    name: 'noReg',
    label: 'No Company registration number',
  },
  telField: {
    name: 'tel',
    label: 'Telephone',
  },
  websiteField: {
    name: 'website',
    label: 'Website',
  },
}

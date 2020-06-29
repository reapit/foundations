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
  | 'line1Field'
  | 'line2Field'
  | 'line3Field'
  | 'line4Field'
  | 'countryIdField'
  | 'postCodeField'
export type FormFields = Partial<Record<FieldKeys, string>>

export const formFields: Record<FieldKeys, FormFieldInfo> = {
  vatNumberField: {
    name: 'vatNumber',
    label: 'VAT Number',
  },
  noVatNumberField: {
    name: 'noVatNumber',
    label: 'No VAT Number',
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
  line1Field: {
    name: 'line1',
    label: 'Line 1*',
  },
  line2Field: {
    name: 'line2',
    label: 'Line 2',
  },
  line3Field: {
    name: 'line3',
    label: 'Line 3',
  },
  line4Field: {
    name: 'line4',
    label: 'Line 4',
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

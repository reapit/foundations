import { InputGroupProps } from '@reapit/elements'

export interface AppEditFormSchema {
  name: string
  categoryId: string
  telephone: string
  supportEmail: string
  launchUri: string
  authFlow: string
  iconImageUrl: string
  screen5ImageUrl: string
  screen4ImageUrl: string
  screen3ImageUrl: string
  screen2ImageUrl: string
  screen1ImageUrl: string
  homePage: string
  summary: string
  description: string
  termsAndConditionsUrl: string
  developerId: string
  scopes: string
  redirectUris: string
  signoutUris: string
  limitToClientIds: string
  desktopIntegrationTypeIds: string
  isFree: boolean
  privacyPolicyUrl: string
  pricingUrl: string
  products: string
  isListed: boolean
  isAgencyCloudIntegrated: boolean
  isPrivateApp: boolean
}

export const defaultValues: AppEditFormSchema = {
  categoryId: '',
  authFlow: '',
  screen5ImageUrl: '',
  screen4ImageUrl: '',
  screen3ImageUrl: '',
  screen2ImageUrl: '',
  screen1ImageUrl: '',
  name: '',
  telephone: '',
  supportEmail: '',
  launchUri: '',
  iconImageUrl: '',
  homePage: '',
  description: '',
  summary: '',
  developerId: '',
  scopes: '',
  redirectUris: '',
  signoutUris: '',
  limitToClientIds: '',
  desktopIntegrationTypeIds: '',
  isFree: false,
  privacyPolicyUrl: '',
  pricingUrl: '',
  termsAndConditionsUrl: '',
  products: '',
  isListed: false,
  isAgencyCloudIntegrated: false,
  isPrivateApp: false,
}

export const formFields: Record<keyof AppEditFormSchema, InputGroupProps & { name: string }> = {
  name: {
    name: 'name',
    label: 'Name',
    errorMessage: 'Should only contain letters and number',
    placeholder: 'The name of your app as it will appear to users',
    type: 'text',
  },
  categoryId: {
    name: 'categoryId',
    label: 'Category',
  },
  supportEmail: {
    name: 'supportEmail',
    label: 'Support email',
    placeholder: 'Email for customers to contact you',
    type: 'email',
  },
  telephone: {
    name: 'telephone',
    label: 'Telephone',
    placeholder: 'Number for customers to contact you',
    errorMessage: 'Invalid Telephone number',
    type: 'text',
  },
  homePage: {
    name: 'homePage',
    label: 'Home page',
    placeholder: 'Your company homepage. HTTP:// or HTTPS://',
    errorMessage: 'Invalid Home Page URL',
    type: 'text',
  },
  launchUri: {
    name: 'launchUri',
    label: 'Launch URI',
    placeholder: 'HTTPS or HTTP only for localhost',
    errorMessage: 'Invalid Launch URI',
    type: 'text',
  },
  summary: {
    name: 'summary',
    label: 'Summary',
    placeholder: 'A short strapline summary for your app listing. Must be between 50 and 150 characters',
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder:
      'A detailed description for your app listing. Must be between 150 and 20000 characters. Please note: As this field supports HTML, special characters will be included in the character count',
  },
  termsAndConditionsUrl: {
    name: 'termsAndConditionsUrl',
    label: 'Terms and Conditions',
    placeholder: 'URL to link to your Terms and Conditions',
    errorMessage: 'Invalid URL - has to be https://',
    type: 'text',
  },
  privacyPolicyUrl: {
    name: 'privacyPolicyUrl',
    label: 'Privacy Policy',
    placeholder: 'URL to link to your Privacy Policy',
    errorMessage: 'Invalid URL - has to be https://',
    type: 'text',
  },
  pricingUrl: {
    name: 'pricingUrl',
    label: 'Pricing Info',
    placeholder: 'URL to link to your Pricing Info',
    errorMessage: 'Invalid URL - has to be https://',
    type: 'text',
  },
  isFree: {
    name: 'isFree',
    label: 'This application is free',
    type: 'checkbox',
  },
  authFlow: {
    name: 'authFlow',
    label: 'AUTHENTICATION FLOW',
  },
  redirectUris: {
    name: 'redirectUris',
    label: 'Redirect URI(s)',
    placeholder: 'Enter your Redirect URI(s)',
    errorMessage: 'Invalid redirect uri(s)',
    type: 'text',
  },
  signoutUris: {
    name: 'signoutUris',
    label: 'Sign Out URI(s)',
    placeholder: 'Enter your Sign Out URI(s)',
    errorMessage: 'Invalid sign out uri(s)',
    type: 'text',
  },
  iconImageUrl: {
    name: 'iconImageUrl',
    label: 'Upload Icon Image',
    type: 'file',
  },
  screen1ImageUrl: {
    name: 'screen1ImageUrl',
    label: 'Upload Featured Image',
    type: 'file',
  },
  screen2ImageUrl: {
    name: 'screen2ImageUrl',
    label: 'Upload Other Listing Image',
    type: 'file',
  },
  screen3ImageUrl: {
    name: 'screen3ImageUrl',
    label: 'Upload Other Listing Image',
    type: 'file',
  },
  screen4ImageUrl: {
    name: 'screen4ImageUrl',
    label: 'Upload Other Listing Image',
    type: 'file',
  },
  screen5ImageUrl: {
    name: 'screen5ImageUrl',
    label: 'Upload Other Listing Image',
    type: 'file',
  },
  scopes: {
    name: 'scopes',
    label: 'Permissions',
    errorMessage: 'At least one Permission is required',
  },
  limitToClientIds: {
    name: 'limitToClientIds',
    label: 'Private App Client Ids',
    placeholder: 'Please enter the Customer ID. For multiple Customer ID’s, please separate using a comma',
    errorMessage: 'Invalid Customer ID(s). Each Customer ID should be between 3 and 15 characters.',
    type: 'text',
  },
  desktopIntegrationTypeIds: {
    name: 'desktopIntegrationTypeIds',
    label: 'Integration Type',
    placeholder: 'Please select',
  },
  isListed: {
    name: 'isListed',
    label: 'AppMarket Listed',
  },
  isAgencyCloudIntegrated: {
    name: 'isAgencyCloudIntegrated',
    label: 'AgencyCloud Integration',
  },
  isPrivateApp: {
    name: 'isPrivateApp',
    label: 'Private App',
  },
  developerId: {
    name: 'developerId',
    label: 'Developer ID',
  },
  products: {
    name: 'products',
    label: 'Reapit Products',
  },
}

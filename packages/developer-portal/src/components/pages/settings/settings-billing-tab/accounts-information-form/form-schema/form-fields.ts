import { FormFieldInfo } from '@reapit/elements'

type Field =
  | 'billingEmailField'
  | 'billingTelephoneField'
  | 'billingKeyContactField'
  | 'reapitReferenceField'
  | 'statusField'
  | 'hasReapitAccountsRefField'
  | 'hasDirectDebitField'

const formFields: Record<Field, FormFieldInfo> = {
  billingEmailField: {
    name: 'billingEmail',
    heading: 'Accounts Email',
    subHeading: 'This email will be used by our Accounts Department to send any account related correspondence',
    placeHolder: 'Please enter email address',
    errorMessage: 'Email is not valid',
  },
  billingTelephoneField: {
    name: 'billingTelephone',
    heading: 'Accounts Telephone',
    subHeading: 'If you have a specific telephone number for your accounts department, please enter here',
    placeHolder: 'Please enter telephone number',
    errorMessage: 'Invalid Telephone number',
  },
  billingKeyContactField: {
    name: 'billingKeyContact',
    heading: 'Accounts Contact',
    subHeading: 'If you have a key contact in your Accounts Department, please enter here',
    placeHolder: 'Please enter contact',
  },
  hasDirectDebitField: {
    name: 'hasDirectDebit',
    heading: 'Do you have a Direct Debit setup already?',
    subHeading: `If you have an existing Direct Debit setup, please select Yes below.
    If not, please select No and complete a Direct Debit form below:`,
    placeHolder: '',
    errorMessage: 'Please finish setting up Direct Debit',
  },
  hasReapitAccountsRefField: {
    name: 'hasReapitAccountsRef',
    label: 'Do you have a Reapit Accounts Ref?',
    heading: 'Reapit Reference',
    subHeading: `If you have an existing account with Reapit you will be able to find your
      Reapit reference on previous correspondence`,
    errorMessage: 'Please select one',
  },
  reapitReferenceField: {
    name: 'reapitReference',
    placeHolder: 'Please enter reference',
  },
  statusField: {
    name: 'status',
  },
}

export default formFields

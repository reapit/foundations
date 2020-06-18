import { FormFieldInfo } from '@reapit/elements'

type Field =
  | 'emailField'
  | 'hasReapitAccountsRefField'
  | 'reapitAccountsRefField'
  | 'phoneNumberField'
  | 'hasDirectDebitField'
  | 'contactField'

const formFields: Record<Field, FormFieldInfo> = {
  emailField: {
    name: 'email',
    heading: 'Accounts Email',
    subHeading: 'This email will be used by our Accounts Department to send any account related correspondence',
    placeHolder: 'Please enter email address',
  },
  phoneNumberField: {
    name: 'phoneNumber',
    heading: 'Accounts Telephone',
    subHeading: 'If you have a specific telephone number for your accounts department, please enter here',
    placeHolder: 'Please enter telephone number',
  },
  contactField: {
    name: 'contact',
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
  },
  hasReapitAccountsRefField: {
    name: 'hasReapitAccountsRef',
    label: 'Do you have a Reapit Accounts Ref?',
    heading: 'Reapit Reference',
    subHeading: `If you have an existing account with Reapit you will be able to find your 
      Reapit reference on previous correspondence`,
  },
  reapitAccountsRefField: {
    name: 'reapitAccountsRef',
    placeHolder: 'Please enter reference',
  },
}

export default formFields

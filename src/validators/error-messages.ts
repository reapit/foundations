export const minCharLengthErrMessage = (min: number = 0) => `The minimum length is ${min} characters`

export const maxCharLengthErrMessage = (max: number = 0) => `The maximum length is ${max} characters`

const errorMessages = {
  DEFAULT_SERVER_ERROR: 'Something went wrong fetching data',
  DEFAULT_COMPONENT_ERROR: 'Something went wrong with this component',
  FIELD_REQUIRED: 'Required',
  FIELD_WRONG_EMAIL_FORMAT: 'Invalid email format',
  FIELD_WRONG_URI_FORMAT: 'Invalid uri format',
  MINIMUM_CHARACTER_LENGTH: minCharLengthErrMessage,
  MAXIMUM_CHARACTER_LENGTH: maxCharLengthErrMessage
}

export default errorMessages

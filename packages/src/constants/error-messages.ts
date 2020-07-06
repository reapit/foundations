const errorMessages = {
  DEFAULT_SERVER_ERROR: 'Something went wrong fetching data',
  DEFAULT_COMPONENT_ERROR: 'Something went wrong with this component',
  FIELD_REQUIRED: 'Required',
  FIELD_WRONG_EMAIL_FORMAT: 'Invalid email format',
  FIELD_WRONG_URI_FORMAT: 'Invalid uri format',
  MINIMUM_CHARACTER_LENGTH: (min: number) => `The minimum length is ${min} characters`,
  MAXIMUM_CHARACTER_LENGTH: (max: number) => `The maximum length is ${max} characters`,
}

export default errorMessages

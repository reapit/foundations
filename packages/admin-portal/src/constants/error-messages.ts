const errorMessages = {
  DEFAULT_SERVER_ERROR: 'Something went wrong fetching data',
  DEFAULT_COMPONENT_ERROR: 'Something went wrong with this component',
  FIELD_REQUIRED: 'Required',
  FIELD_WRONG_EMAIL_FORMAT: 'Invalid email format',
  FIELD_WRONG_URI_FORMAT: 'Invalid URI format',
  MINIMUM_CHARACTER_LENGTH: (min: number) => `The minimum length is ${min} characters`,
  MAXIMUM_CHARACTER_LENGTH: (max: number) => `The maximum length is ${max} characters`,
  BETWEEN_MIN_MAX_CHARACTER_LENGTH: (min: number, max: number) => `Must be between ${min} and ${max} characters`,
  FIELD_INVALID_PASSWORD:
    'Your Password should be a minimum of 8 characters; must contain at ' +
    'least one lowercase letter, one uppercase letter and one number.',
  FIELD_INVALID_NAME: 'Invalid full name',
  FIELD_PHONE_NUMER: 'Invalid phone number',
}

export default errorMessages

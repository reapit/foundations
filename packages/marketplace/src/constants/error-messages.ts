const errorMessages = {
  DEFAULT_SERVER_ERROR: 'Something went wrong fetching data',
  DEFAULT_COMPONENT_ERROR: 'Something went wrong with this component',
  FIELD_REQUIRED: 'Required',
  FIELD_WRONG_EMAIL_FORMAT: 'Invalid email format',
  FIELD_WRONG_URI_FORMAT: 'Invalid uri format',
  MINIMUM_CHARACTER_LENGTH: (min: number) => `The minimum length is ${min} characters`,
  MAXIMUM_CHARACTER_LENGTH: (max: number) => `The maximum length is ${max} characters`,
  FIELD_INVALID_PASSWORD:
    'Your Password should be a minimum of 8 characters; must contain at least one lowercase letter, one uppercase letter and one number.',
  SERVER_LIMIT_UNLISTED_APPS:
    'Unable to register client app: Limit of unlisted apps against this account has been reached',
  CLIENT_LIMIT_UNLISTED_APPS:
    'We are unable to process this submission. You currently have reached your limit of unlisted apps. Please edit your existing apps to continue.'
}

export default errorMessages

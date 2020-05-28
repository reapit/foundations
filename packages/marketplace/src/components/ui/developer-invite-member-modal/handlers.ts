import { FIELD_NAMES, ERRORS_MESSAGES, MAX_MESSAGE_LENGTH } from './constants'
import { isEmail } from '@reapit/elements'

// typecheck: keyof values must be in FIELD_NAMES
export const validate = (values: { [key in keyof typeof FIELD_NAMES]: string }) => {
  const errors = {}
  const name = values[FIELD_NAMES.NAME]
  const email = values[FIELD_NAMES.EMAIL]
  const message = values[FIELD_NAMES.MESSAGE]

  if (!name) {
    errors[FIELD_NAMES.NAME] = ERRORS_MESSAGES.NAME
  }

  if (!isEmail(email)) {
    errors[FIELD_NAMES.EMAIL] = ERRORS_MESSAGES.EMAIL
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors[FIELD_NAMES.MESSAGE] = ERRORS_MESSAGES.MESSAGE
  }

  return errors
}

export const handleSubmit = values => {
  // TBC
  console.log('submit', values)
}

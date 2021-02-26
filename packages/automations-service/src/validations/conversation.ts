import { Schema } from 'express-validator'

const create = {
  telephoneNumber: {
    in: ['body'],
    isString: true,
    isMobilePhone: {
      errorMessage: 'Phone number must be a valid en-GB phone number',
      locale: 'en-GB',
    },
  },
  automatedMessage: {
    in: ['body'],
    isString: true,
  },
} as Schema

export { create }

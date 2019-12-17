import { AuthenticationError, UserInputError } from 'apollo-server'
import logger from '../logger'

const errorMessages = {
  badRequestError: '[E4000] Bad Request',
  notAuthorized: '[E4010] Not Authorized',
  forBidden: '[E4030] Forbidden',
  notFound: '[E4040] Not Found',
  requestTimeout: '[E4080] Request Timeout',
  internalServerError: '[E5000] Internal Server Error',
  gatewayTimeout: '[E5040] Gateway Timeout',
  unprocessableEntity: '[E4220] Unprocessable Entity',
}

export const generateAuthenticationError = (traceId?: string) => {
  const error = new AuthenticationError(`${traceId || ''} - ${errorMessages.notAuthorized}`)
  logger.info('generateAuthenticationError', { traceId, error })
  return error
}

export const generateUserInputError = (traceId?: string) => {
  const error = new UserInputError(`${traceId || ''} - ${errorMessages.unprocessableEntity}`)
  logger.info('generateAuthenticationError', { traceId, error })
  return error
}

const errors = {
  generateAuthenticationError,
  generateUserInputError,
}

export default errors

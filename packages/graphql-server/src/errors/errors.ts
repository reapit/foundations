import { AuthenticationError, UserInputError, ForbiddenError, ValidationError, ApolloError } from 'apollo-server'
import logger from '../logger'

export const errorMessages = {
  notAuthorized: '[E4010] Not Authorized',
  badRequestError: '[E4000] Bad Request',
  notFound: '[E4040] Not Found',
  forbidden: '[E4030] Forbidden',
  internalServerError: '[E5000] Internal Server Error',
}

export const generateAuthenticationError = (traceId?: string) => {
  const error = new AuthenticationError(`${traceId || ''} - ${errorMessages.notAuthorized}`)
  logger.info('generateAuthenticationError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateUserInputError = (traceId?: string) => {
  const error = new UserInputError(`${traceId || ''} - ${errorMessages.badRequestError}`)
  logger.info('generateAuthenticationError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateValidationError = (traceId?: string) => {
  const error = new ValidationError(`${traceId || ''} - ${errorMessages.badRequestError}`)
  logger.info('generateValidationError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateSyntaxError = (traceId?: string) => {
  const error = new SyntaxError(`${traceId || ''} - ${errorMessages.badRequestError}`)
  logger.info('generateSyntaxError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateForbiddenError = (traceId?: string) => {
  const error = new ForbiddenError(`${traceId || ''} - ${errorMessages.forbidden}`)
  logger.info('generateForbiddenError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateInternalServerError = (traceId?: string) => {
  const error = new ApolloError(`${traceId || ''} - ${errorMessages.internalServerError}`, 'INTERNAL_SERVER_ERROR')
  logger.info('generateInternalServerError', { traceId, error: JSON.stringify(error) })
  return error
}

const errors = {
  generateAuthenticationError,
  generateUserInputError,
  generateValidationError,
  generateSyntaxError,
  generateForbiddenError,
  generateInternalServerError,
}

export default errors

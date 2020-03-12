import { AuthenticationError, UserInputError, ForbiddenError, ValidationError, ApolloError } from 'apollo-server'
import logger from '../logger'

export const errorMessages = {
  notAuthorized: '[E4010] Not Authorized',
  badRequest: '[E4000] Bad Request',
  notFound: '[E4040] Not Found',
  forbidden: '[E4030] Forbidden',
  internalServer: '[E5000] Internal Server Error',
}

export const generateAuthenticationError = (traceId?: string) => {
  const error = new AuthenticationError(`${traceId || ''} - ${errorMessages.notAuthorized}`)
  logger.info('generateAuthenticationError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateUserInputError = (traceId?: string) => {
  const error = new UserInputError(`${traceId || ''} - ${errorMessages.badRequest}`)
  logger.info('generateAuthenticationError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateValidationError = (traceId?: string) => {
  const error = new ValidationError(`${traceId || ''} - ${errorMessages.badRequest}`)
  logger.info('generateValidationError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateForbiddenError = (traceId?: string) => {
  const error = new ForbiddenError(`${traceId || ''} - ${errorMessages.forbidden}`)
  logger.info('generateForbiddenError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateInternalServerError = (traceId?: string) => {
  const error = new ApolloError(`${traceId || ''} - ${errorMessages.internalServer}`, 'INTERNAL_SERVER_ERROR')
  logger.info('generateInternalServerError', { traceId, error: JSON.stringify(error) })
  return error
}

export const generateNotFoundError = (traceId?: string) => {
  const error = new ApolloError(`${traceId || ''} - ${errorMessages.notFound}`, 'NOT_FOUND')
  logger.info('generateNotFoundError', { traceId, error: JSON.stringify(error) })
  return error
}

const errors = {
  generateAuthenticationError,
  generateUserInputError,
  generateValidationError,
  generateForbiddenError,
  generateInternalServerError,
  generateNotFoundError,
}

export default errors

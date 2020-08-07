import { AuthenticationError, UserInputError, ForbiddenError, ValidationError, ApolloError } from 'apollo-server-lambda'
import { handleGraphQlError } from '@/utils/handle-error'
import logger from '../logger'

export const errorMessages = {
  notAuthorized: '[E4010] Not Authorized',
  badRequest: '[E4000] Bad Request',
  notFound: '[E4040] Not Found',
  forbidden: '[E4030] Forbidden',
  internalServer: '[E5000] Internal Server Error',
}

export const generateAuthenticationError = (traceId?: string) => {
  const error = new AuthenticationError(`${errorMessages.notAuthorized}`)
  error.extensions.traceId = traceId
  logger.info('generateAuthenticationError', { traceId, error: JSON.stringify(error) })
  handleGraphQlError({ error: JSON.stringify(error), traceId, caller: 'generateAuthenticationError' })
  return error
}

export const generateUserInputError = (traceId?: string) => {
  const error = new UserInputError(`${errorMessages.badRequest}`)
  error.extensions.traceId = traceId
  logger.info('generateUserInputError', { traceId, error: JSON.stringify(error) })
  handleGraphQlError({ error: JSON.stringify(error), traceId, caller: 'generateUserInputError' })
  return error
}

export const generateValidationError = (traceId?: string) => {
  const error = new ValidationError(`${errorMessages.badRequest}`)
  error.extensions.traceId = traceId
  logger.info('generateValidationError', { traceId, error: JSON.stringify(error) })
  handleGraphQlError({ error: JSON.stringify(error), traceId, caller: 'generateValidationError' })
  return error
}

export const generateForbiddenError = (traceId?: string) => {
  const error = new ForbiddenError(`${errorMessages.forbidden}`)
  error.extensions.traceId = traceId
  logger.info('generateForbiddenError', { traceId, error: JSON.stringify(error) })
  handleGraphQlError({ error: JSON.stringify(error), traceId, caller: 'generateForbiddenError' })
  return error
}

export const generateInternalServerError = (traceId?: string) => {
  const error = new ApolloError(`${errorMessages.internalServer}`, 'INTERNAL_SERVER_ERROR', { traceId })
  logger.info('generateInternalServerError', { traceId, error: JSON.stringify(error) })
  handleGraphQlError({ error: JSON.stringify(error), traceId, caller: 'generateInternalServerError' })
  return error
}

export const generateNotFoundError = (traceId?: string) => {
  const error = new ApolloError(`${errorMessages.notFound}`, 'NOT_FOUND', { traceId })
  logger.info('generateNotFoundError', { traceId, error: JSON.stringify(error) })
  handleGraphQlError({ error: JSON.stringify(error), traceId, caller: 'generateNotFoundError' })
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

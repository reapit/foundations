import { AuthenticationError, UserInputError, ForbiddenError, ValidationError, ApolloError } from 'apollo-server-lambda'

export const errorMessages = {
  notAuthorized: '401 - Not Authorized',
  badRequest: '400 - Bad Request',
  notFound: '404 - Not Found',
  forbidden: '403 - Forbidden',
  precondion: '412 - Precondition Failed',
  unprocessable: '422 - Unprocessable Entity',
  internalServer: '500 - Internal Server Error',
}

export const generateAuthenticationError = (traceId?: string) => {
  const error = new AuthenticationError(`${traceId || ''} - ${errorMessages.notAuthorized}`)
  return error
}

export const generateUserInputError = (traceId?: string) => {
  const error = new UserInputError(`${traceId || ''} - ${errorMessages.badRequest}`)
  return error
}

export const generateUnprocessableError = (traceId: string, reapitBackendError: any) => {
  const error = new UserInputError(`${traceId || ''} - ${errorMessages.unprocessable}`)
  if (error.extensions) {
    error.extensions.validationErrors = reapitBackendError
  }
  return error
}

export const generatePreconditionError = (traceId?: string) => {
  const error = new UserInputError(`${traceId || ''} - ${errorMessages.precondion}`)
  return error
}

export const generateValidationError = (traceId?: string) => {
  const error = new ValidationError(`${traceId || ''} - ${errorMessages.badRequest}`)
  return error
}

export const generateForbiddenError = (traceId?: string) => {
  const error = new ForbiddenError(`${traceId || ''} - ${errorMessages.forbidden}`)
  return error
}

export const generateInternalServerError = (traceId?: string) => {
  const error = new ApolloError(`${traceId || ''} - ${errorMessages.internalServer}`, 'INTERNAL_SERVER_ERROR')
  return error
}

export const generateNotFoundError = (traceId?: string) => {
  const error = new ApolloError(`${traceId || ''} - ${errorMessages.notFound}`, 'NOT_FOUND')
  return error
}

const errors = {
  generateAuthenticationError,
  generateUnprocessableError,
  generateValidationError,
  generateUserInputError,
  generatePreconditionError,
  generateForbiddenError,
  generateInternalServerError,
  generateNotFoundError,
}

export default errors

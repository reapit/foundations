import logger from '../logger'
import errors from '../errors'
import { ApolloError } from 'apollo-server-lambda'
import { AxiosError } from 'axios'
import { stringifyError } from '@reapit/node-utils'

export type HandleErrorParams = {
  error: AxiosError
  traceId: string
  caller: string
}

export const handleError = async ({ error, traceId, caller }: HandleErrorParams): Promise<ApolloError> => {
  const reapitBackendError = error?.response?.data

  await logger.error(caller, {
    traceId,
    // either a back-end error or system error (code crash)
    error: reapitBackendError ? JSON.stringify(reapitBackendError) : stringifyError(error),
    headers: JSON.stringify(error?.response?.headers),
  })
  if (error?.response?.status === 400) {
    return errors.generateValidationError(traceId)
  }
  if (error?.response?.status === 401) {
    return errors.generateAuthenticationError(traceId)
  }
  if (error?.response?.status === 403) {
    return errors.generateForbiddenError(traceId)
  }
  if (error?.response?.status === 404) {
    return errors.generateNotFoundError(traceId)
  }
  if (error?.response?.status === 412) {
    return errors.generateUserInputError(traceId)
  }
  if (error?.response?.status === 422) {
    return errors.generateUserInputError(traceId)
  }
  return errors.generateInternalServerError(traceId)
}

export type HandleGraphQlError = {
  error: string | Error
  traceId: string
  caller: string
}

export const handleGraphQlError = async ({ error, traceId, caller }: HandleGraphQlError): Promise<void> => {
  await logger.error(caller, {
    traceId,
    error: error instanceof Error ? JSON.stringify(error) : error,
  })
}

export default handleError

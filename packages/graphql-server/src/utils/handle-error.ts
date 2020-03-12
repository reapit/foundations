import logger from '../logger'
import errors from '../errors'
import { ApolloError } from 'apollo-server'
import { AxiosError } from 'axios'

export type HandleErrorParams = {
  error: AxiosError
  traceId: string
  caller: string
}

export const handleError = ({ error, traceId, caller }: HandleErrorParams): ApolloError => {
  logger.error(caller, { traceId, error: error?.response?.data, headers: error?.response?.headers })
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

export default handleError

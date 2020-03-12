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
  logger.error(caller, { traceId, error: error?.response?.data, headers: error.response?.headers })
  if (error?.response?.status === 401) {
    return errors.generateAuthenticationError(traceId)
  }
  return errors.generateInternalServerError(traceId)
}

export default handleError

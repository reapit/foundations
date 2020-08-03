import { errorMessages } from './constants/error-messages'

/**
 * return standard description error string
 * or DEFAULT_SERVER_ERROR
 */
export const extractNetworkErrString = err => {
  /**
   * response contain standard error object
   * {
   *   dataTime,
   *   description,
   *   statusCode
   * }
   */
  const standardErrDescriptionData = err?.response?.description
  if (err?.response?.description) {
    return standardErrDescriptionData
  }

  return errorMessages.DEFAULT_SERVER_ERROR
}

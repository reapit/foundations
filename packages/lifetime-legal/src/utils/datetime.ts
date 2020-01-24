import dayjs from 'dayjs'
import { toUTCTime, toLocalTime, DATE_TIME_FORMAT } from '@reapit/elements'
// @ts-ignore #49 Breaking changes to API
import { ContactIdentityCheckModel } from '@reapit/foundations-ts-definitions'

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is ContactIdentityCheckModel
 */
export const changeTimeZoneLocalForIdentityCheck = (
  identityChecks: ContactIdentityCheckModel,
): ContactIdentityCheckModel => {
  const documents = identityChecks.documents?.map(document => {
    return {
      ...document,
      expiry: toLocalTime(document.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
    }
  })
  const newIdentityChecks = {
    ...identityChecks,
    documents,
    checkDate: toLocalTime(identityChecks.checkDate as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
  }
  return newIdentityChecks
}

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is ContactIdentityCheckModel
 */
export const changeTimeZoneUTCForIdentityCheck = (
  identityChecks: ContactIdentityCheckModel,
): ContactIdentityCheckModel => {
  const documents = identityChecks.documents?.map(document => {
    return {
      ...document,
      expiry: toUTCTime(document.expiry as dayjs.ConfigType),
    }
  })
  const newIdentityChecks = {
    ...identityChecks,
    documents,
    checkDate: toUTCTime(identityChecks.checkDate as dayjs.ConfigType),
  }
  return newIdentityChecks
}

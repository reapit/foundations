import { ConfigType } from 'dayjs'
import { toUTCTime, toLocalTime, DATE_TIME_FORMAT } from '@reapit/elements'
import { IdentityCheckModel } from '@reapit/foundations-ts-definitions'

/**
 * This function created by backend required parse time to local time
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneLocalForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { identityDocument1, identityDocument2 } = identityChecks
  const newDocument1 = identityDocument1
    ? {
        ...identityDocument1,
        expiry: toLocalTime(identityDocument1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
    : undefined

  const newDocument2 = identityDocument2
    ? {
        ...identityDocument2,
        expiry: toLocalTime(identityDocument2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
    : undefined
  const newIdentityChecks = {
    ...identityChecks,
    identityDocument1: newDocument1,
    identityDocument2: newDocument2,
    checkDate: toLocalTime(identityChecks.checkDate as ConfigType, DATE_TIME_FORMAT.RFC3339),
  }
  return newIdentityChecks
}

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneUTCForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { identityDocument1, identityDocument2 } = identityChecks
  const newDocument1 = identityDocument1
    ? {
        ...identityDocument1,
        expiry: toUTCTime(identityDocument1.expiry as ConfigType),
      }
    : undefined

  const newDocument2 = identityDocument2
    ? {
        ...identityDocument2,
        expiry: toUTCTime(identityDocument2.expiry as ConfigType),
      }
    : undefined

  const newIdentityChecks = {
    ...identityChecks,
    identityDocument1: newDocument1,
    identityDocument2: newDocument2,
    checkDate: toUTCTime(identityChecks.checkDate as ConfigType),
  }
  return newIdentityChecks
}

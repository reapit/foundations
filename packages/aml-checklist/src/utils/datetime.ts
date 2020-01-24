import { ConfigType } from 'dayjs'
import { toUTCTime, toLocalTime, DATE_TIME_FORMAT } from '@reapit/elements'
import { IdentityCheckModel } from '@reapit/foundations-ts-definitions'

/**
 * This function created by backend required parse time to local time
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneLocalForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { document1, document2 } = identityChecks
  const newDocument1 = document1
    ? {
        ...document1,
        expiry: toLocalTime(document1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
    : undefined

  const newDocument2 = document2
    ? {
        ...document2,
        expiry: toLocalTime(document2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
    : undefined
  const newIdentityChecks = {
    ...identityChecks,
    document1: newDocument1,
    document2: newDocument2,
    checkDate: toLocalTime(identityChecks.checkDate as ConfigType, DATE_TIME_FORMAT.RFC3339)
  }
  return newIdentityChecks
}

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneUTCForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { document1, document2 } = identityChecks
  const newDocument1 = document1
    ? {
        ...document1,
        expiry: toUTCTime(document1.expiry as ConfigType)
      }
    : undefined

  const newDocument2 = document2
    ? {
        ...document2,
        expiry: toUTCTime(document2.expiry as ConfigType)
      }
    : undefined

  const newIdentityChecks = {
    ...identityChecks,
    document1: newDocument1,
    document2: newDocument2,
    checkDate: toUTCTime(identityChecks.checkDate as ConfigType)
  }
  return newIdentityChecks
}

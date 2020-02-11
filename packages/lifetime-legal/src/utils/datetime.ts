import dayjs from 'dayjs'
import { toUTCTime, toLocalTime, DATE_TIME_FORMAT } from '@reapit/elements'
import { IdentityCheckModel } from '@reapit/foundations-ts-definitions'

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneLocalForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { identityDocument1, identityDocument2 } = identityChecks
  return {
    ...identityChecks,
    identityDocument1: {
      ...identityDocument1,
      expiry: toLocalTime(identityDocument1?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
    },
    identityDocument2: {
      ...identityDocument2,
      expiry: toLocalTime(identityDocument2?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
    },
    checkDate: toLocalTime(identityChecks.checkDate as dayjs.ConfigType, DATE_TIME_FORMAT.DATE_FORMAT_1),
  }
}

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneUTCForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { identityDocument1, identityDocument2 } = identityChecks
  return {
    ...identityChecks,
    identityDocument1: {
      ...identityDocument1,
      expiry: toUTCTime(identityDocument1?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.DATE_FORMAT_1),
    },
    identityDocument2: {
      ...identityDocument2,
      expiry: toUTCTime(identityDocument2?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.DATE_FORMAT_1),
    },
    checkDate: toUTCTime(identityChecks.checkDate as dayjs.ConfigType, DATE_TIME_FORMAT.DATE_FORMAT_1),
  }
}

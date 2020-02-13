import dayjs from 'dayjs'
import { toUTCTime, toLocalTime, DATE_TIME_FORMAT } from '@reapit/elements'
import { IdentityCheckModel, ContactModel } from '@reapit/foundations-ts-definitions'

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneLocalForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { identityDocument1, identityDocument2 } = identityChecks
  const newIdentity = {
    ...identityChecks,
    checkDate: toLocalTime(identityChecks.checkDate as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
  }
  if (identityDocument1) {
    newIdentity.identityDocument1 = {
      ...identityDocument1,
      expiry: toLocalTime(identityDocument1?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
    }
  }
  if (identityDocument2) {
    newIdentity.identityDocument2 = {
      ...identityDocument2,
      expiry: toLocalTime(identityDocument2?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
    }
  }
  return newIdentity
}

/**
 * This function created by backend required parse time to UTC before submit
 * @param identityChecks is IdentityCheckModel
 */
export const changeTimeZoneUTCForIdentityCheck = (identityChecks: IdentityCheckModel): IdentityCheckModel => {
  const { identityDocument1, identityDocument2 } = identityChecks
  const newIdentity = {
    ...identityChecks,
    checkDate: toUTCTime(identityChecks.checkDate as dayjs.ConfigType, DATE_TIME_FORMAT.YYYY_MM_DD),
  }
  if (identityDocument1) {
    newIdentity.identityDocument1 = {
      ...identityDocument1,
      expiry: toUTCTime(identityDocument1?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.YYYY_MM_DD),
    }
  }
  if (identityDocument2) {
    newIdentity.identityDocument2 = {
      ...identityDocument2,
      expiry: toUTCTime(identityDocument2?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.YYYY_MM_DD),
    }
  }
  return newIdentity
}

export const formatDateForContact = (contact: ContactModel) => {
  return {
    ...contact,
    dateOfBirth: dayjs(contact.dateOfBirth).format(DATE_TIME_FORMAT.YYYY_MM_DD),
  }
}

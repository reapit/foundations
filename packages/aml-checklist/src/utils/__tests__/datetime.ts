import { ConfigType } from 'dayjs'
import { idCheck } from '@/sagas/__stubs__/contact'
import { DATE_TIME_FORMAT, toLocalTime, toUTCTime } from '@reapit/elements'
import { changeTimeZoneLocalForIdentityCheck, changeTimeZoneUTCForIdentityCheck } from '../datetime'

describe('datetime', () => {
  describe('changeTimeZoneLocalForIdentityCheck', () => {
    it('should run correctly', () => {
      const result = changeTimeZoneLocalForIdentityCheck(idCheck)
      const identityDocument1 = {
        ...idCheck.identityDocument1,

        expiry: toLocalTime(idCheck.identityDocument1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      const identityDocument2 = {
        ...idCheck.identityDocument2,

        expiry: toLocalTime(idCheck.identityDocument2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        identityDocument1,
        identityDocument2,
      })
    })

    it('should run correctly with undefined identityDocument1', () => {
      const result = changeTimeZoneLocalForIdentityCheck({ ...idCheck, identityDocument1: undefined })
      const identityDocument2 = {
        ...idCheck.identityDocument2,

        expiry: toLocalTime(idCheck.identityDocument2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        identityDocument1: undefined,
        identityDocument2,
      })
    })
    it('should run correctly with undefined identityDocument2', () => {
      const result = changeTimeZoneLocalForIdentityCheck({ ...idCheck, identityDocument2: undefined })
      const identityDocument1 = {
        ...idCheck.identityDocument1,

        expiry: toLocalTime(idCheck.identityDocument1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        identityDocument1,
        identityDocument2: undefined,
      })
    })
    it('should run correctly with both identityDocument1 and identityDocument2 undefined', () => {
      const result = changeTimeZoneLocalForIdentityCheck({
        ...idCheck,
        identityDocument1: undefined,
        identityDocument2: undefined,
      })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        identityDocument1: undefined,
        identityDocument2: undefined,
      })
    })
  })

  describe('changeTimeZoneUTCForIdentityCheck', () => {
    it('should run correctly', () => {
      const identityDocument1 = {
        ...idCheck.identityDocument1,
        expiry: toUTCTime(idCheck.identityDocument1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      const identityDocument2 = {
        ...idCheck.identityDocument2,
        expiry: toUTCTime(idCheck.identityDocument2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      const result = changeTimeZoneUTCForIdentityCheck(idCheck)
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        identityDocument1,
        identityDocument2,
      })
    })

    it('should run correctly with undefined identityDocument1', () => {
      const identityDocument2 = {
        ...idCheck.identityDocument2,
        expiry: toUTCTime(idCheck.identityDocument2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      const result = changeTimeZoneUTCForIdentityCheck({ ...idCheck, identityDocument1: undefined })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        identityDocument1: undefined,
        identityDocument2,
      })
    })

    it('should run correctly with undefined identityDocument2', () => {
      const identityDocument1 = {
        ...idCheck.identityDocument1,
        expiry: toUTCTime(idCheck.identityDocument1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339),
      }
      const result = changeTimeZoneUTCForIdentityCheck({ ...idCheck, identityDocument2: undefined })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        identityDocument2: undefined,
        identityDocument1,
      })
    })
    it('should run correctly with both identityDocument1 and identityDocument2 undefined', () => {
      const result = changeTimeZoneUTCForIdentityCheck({
        ...idCheck,
        identityDocument1: undefined,
        identityDocument2: undefined,
      })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        identityDocument1: undefined,
        identityDocument2: undefined,
      })
    })
  })
})

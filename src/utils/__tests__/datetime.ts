import { ConfigType } from 'dayjs'
import { idCheck } from '@/sagas/__stubs__/contact'
import { DATE_TIME_FORMAT, toLocalTime, toUTCTime } from '@reapit/elements'
import { changeTimeZoneLocalForIdentityCheck, changeTimeZoneUTCForIdentityCheck } from '../datetime'

describe('datetime', () => {
  describe('changeTimeZoneLocalForIdentityCheck', () => {
    it('should run correctly', () => {
      const result = changeTimeZoneLocalForIdentityCheck(idCheck)
      const document1 = {
        ...idCheck.document1,

        expiry: toLocalTime(idCheck.document1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      const document2 = {
        ...idCheck.document2,

        expiry: toLocalTime(idCheck.document2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        document1,
        document2
      })
    })

    it('should run correctly with undefined document1', () => {
      const result = changeTimeZoneLocalForIdentityCheck({ ...idCheck, document1: undefined })
      const document2 = {
        ...idCheck.document2,

        expiry: toLocalTime(idCheck.document2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        document1: undefined,
        document2
      })
    })
    it('should run correctly with undefined document2', () => {
      const result = changeTimeZoneLocalForIdentityCheck({ ...idCheck, document2: undefined })
      const document1 = {
        ...idCheck.document1,

        expiry: toLocalTime(idCheck.document1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        document1,
        document2: undefined
      })
    })
    it('should run correctly with both document1 and document2 undefined', () => {
      const result = changeTimeZoneLocalForIdentityCheck({ ...idCheck, document1: undefined, document2: undefined })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime(idCheck.checkDate, DATE_TIME_FORMAT.RFC3339),
        document1: undefined,
        document2: undefined
      })
    })
  })

  describe('changeTimeZoneUTCForIdentityCheck', () => {
    it('should run correctly', () => {
      const document1 = {
        ...idCheck.document1,
        expiry: toUTCTime(idCheck.document1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      const document2 = {
        ...idCheck.document2,
        expiry: toUTCTime(idCheck.document2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      const result = changeTimeZoneUTCForIdentityCheck(idCheck)
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        document1,
        document2
      })
    })

    it('should run correctly with undefined document1', () => {
      const document2 = {
        ...idCheck.document2,
        expiry: toUTCTime(idCheck.document2.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      const result = changeTimeZoneUTCForIdentityCheck({ ...idCheck, document1: undefined })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        document1: undefined,
        document2
      })
    })

    it('should run correctly with undefined document2', () => {
      const document1 = {
        ...idCheck.document1,
        expiry: toUTCTime(idCheck.document1.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
      }
      const result = changeTimeZoneUTCForIdentityCheck({ ...idCheck, document2: undefined })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        document2: undefined,
        document1
      })
    })
    it('should run correctly with both document1 and document2 undefined', () => {
      const result = changeTimeZoneUTCForIdentityCheck({ ...idCheck, document1: undefined, document2: undefined })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime(idCheck.checkDate),
        document1: undefined,
        document2: undefined
      })
    })
  })
})

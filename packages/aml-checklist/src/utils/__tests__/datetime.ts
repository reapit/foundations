import dayjs from 'dayjs'
import { DATE_TIME_FORMAT, toLocalTime, toUTCTime } from '@reapit/elements'
import MockDate from 'mockdate'
import { idCheck } from '@/sagas/__stubs__/id-check'
import { changeTimeZoneLocalForIdentityCheck, changeTimeZoneUTCForIdentityCheck } from '../datetime'

describe('daytime', () => {
  describe('changeTimeZoneLocalForIdentityCheck', () => {
    const TIME_OFFSET = 0
    MockDate.set(1570747191389, TIME_OFFSET)
    it('should run correctly', () => {
      const result = changeTimeZoneLocalForIdentityCheck(idCheck)
      const { identityDocument1, identityDocument2 } = idCheck
      expect(result).toEqual({
        ...idCheck,
        checkDate: '1-01-01',
        identityDocument1: {
          ...identityDocument1,
          expiry: toLocalTime(identityDocument1?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
        },
        identityDocument2: {
          ...identityDocument2,
          expiry: toLocalTime(identityDocument2?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.RFC3339),
        },
      })
    })
    MockDate.reset()
  })

  describe('changeTimeZoneUTCForIdentityCheck', () => {
    const TIME_OFFSET = 0
    MockDate.set(1570747191389, TIME_OFFSET)

    it('should run correctly', () => {
      const { identityDocument1, identityDocument2 } = idCheck
      const result = changeTimeZoneUTCForIdentityCheck(idCheck)
      expect(result).toEqual({
        ...idCheck,
        checkDate: '1-01-01',
        identityDocument1: {
          ...identityDocument1,
          expiry: toUTCTime(identityDocument1?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.YYYY_MM_DD),
        },
        identityDocument2: {
          ...identityDocument2,
          expiry: toUTCTime(identityDocument2?.expiry as dayjs.ConfigType, DATE_TIME_FORMAT.YYYY_MM_DD),
        },
      })
    })
    MockDate.reset()
  })
})

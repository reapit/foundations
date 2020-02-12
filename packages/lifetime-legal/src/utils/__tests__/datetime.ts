import dayjs from 'dayjs'
import { DATE_TIME_FORMAT, toLocalTime, toUTCTime } from '@reapit/elements'
import MockDate from 'mockdate'
import { identityCheck } from '@/sagas/__stubs__/identity-check'
import { changeTimeZoneLocalForIdentityCheck, changeTimeZoneUTCForIdentityCheck } from '../datetime'

describe('daytime', () => {
  describe('changeTimeZoneLocalForIdentityCheck', () => {
    const TIME_OFFSET = 0
    MockDate.set(1570747191389, TIME_OFFSET)
    it('should run correctly', () => {
      const result = changeTimeZoneLocalForIdentityCheck(identityCheck)
      const { identityDocument1, identityDocument2 } = identityCheck
      expect(result).toEqual({
        ...identityCheck,
        checkDate: '2020-01-13T03:00:00+00:00',
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
      const { identityDocument1, identityDocument2 } = identityCheck
      const result = changeTimeZoneUTCForIdentityCheck(identityCheck)
      expect(result).toEqual({
        ...identityCheck,
        checkDate: '2020-01-13',
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

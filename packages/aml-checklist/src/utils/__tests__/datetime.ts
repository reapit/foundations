import dayjs from 'dayjs'
import { DATE_TIME_FORMAT, toLocalTime, toUTCTime } from '@reapit/elements'
import MockDate from 'mockdate'
import { idCheck } from '@/sagas/__stubs__/id-check'
import {
  changeTimeZoneLocalForIdentityCheck,
  changeTimeZoneUTCForIdentityCheck,
  formatDateForContact,
} from '../datetime'
import { ContactModel } from '@reapit/foundations-ts-definitions'

describe('daytime', () => {
  describe('changeTimeZoneLocalForIdentityCheck', () => {
    const TIME_OFFSET = 0
    MockDate.set(1570747191389, TIME_OFFSET)
    it('should run correctly', () => {
      const result = changeTimeZoneLocalForIdentityCheck(idCheck)
      const { identityDocument1, identityDocument2 } = idCheck
      expect(result).toEqual({
        ...idCheck,
        checkDate: '1-01-01T00:00:00+00:00',
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

  describe('formatDateForContact', () => {
    it('should return the original input when field "dateOfBirth" is falsy', () => {
      const contact = {
        otherData: 'data',
      } as ContactModel
      expect(formatDateForContact(contact)).toEqual({
        otherData: 'data',
      })
    })

    it('should run correctly', () => {
      const contact = {
        otherData: 'data',
        dateOfBirth: '2020-02-13T11:14:40+00:00',
      } as ContactModel
      expect(formatDateForContact(contact)).toEqual({
        otherData: 'data',
        dateOfBirth: '2020-02-13',
      })
    })
  })
})

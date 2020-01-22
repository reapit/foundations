import { ConfigType } from 'dayjs'
import { idCheck } from '@/sagas/__stubs__/contact'
import { DATE_TIME_FORMAT, toLocalTime, toUTCTime } from '@reapit/elements'
import { changeTimeZoneLocalForIdentityCheck, changeTimeZoneUTCForIdentityCheck } from '../datetime'

describe('datetime', () => {
  describe('changeTimeZoneLocalForIdentityCheck', () => {
    it('should run correctly', () => {
      const result = changeTimeZoneLocalForIdentityCheck(idCheck)
      const documents = idCheck.documents?.map(document => {
        return {
          ...document,
          expiry: toLocalTime(document.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
        }
      })
      expect(result).toEqual({
        ...idCheck,
        checkDate: toLocalTime('2019-10-19T02:52:10', DATE_TIME_FORMAT.RFC3339),
        documents
      })
    })
  })

  describe('changeTimeZoneUTCForIdentityCheck', () => {
    it('should run correctly', () => {
      const documents = idCheck.documents?.map(document => {
        return {
          ...document,
          expiry: toUTCTime(document.expiry as ConfigType, DATE_TIME_FORMAT.RFC3339)
        }
      })
      const result = changeTimeZoneUTCForIdentityCheck(idCheck)
      expect(result).toEqual({
        ...idCheck,
        checkDate: toUTCTime('2019-10-19T02:52:10'),
        documents
      })
    })
  })
})

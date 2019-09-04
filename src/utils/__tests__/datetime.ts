import dayjs from 'dayjs'
import { getTime, getDate, isSameDay, closestTo } from '../datetime'

describe('datetime', () => {
  it('getTime', async () => {
    ;[['Fri, 30 Aug 2019 17:44:20', '05:44 PM', '17:44'], ['2019-07-05T00:37:40.220Z', '12:37 AM', '00:37']].forEach(
      ([input, expected, expectedFor24h]) => {
        expect(getTime(input)).toBe(expected)
        expect(getTime(input, true)).toBe(expectedFor24h)
      }
    )
  })

  it('getDate', async () => {
    ;[
      ['2019-07-05T00:37:40.220Z', undefined, '05 Jul 2019'],
      ['Fri, 30 Aug 2019 17:44:20', 'DD MMM YYYY', '30 Aug 2019'],
      ['2019-07-05T00:37:40.220Z', 'DD MMM', '05 Jul']
    ].forEach(([input, format, expected]) => {
      const result = getDate(input as dayjs.ConfigType, format)
      expect(result).toBe(expected)
    })
  })

  it('isSameDay', async () => {
    ;[['2019-12-18T16:30:00.220Z', true], ['Fri, 30 Aug 2019 17:44:20', false]].forEach(([input, expected]) => {
      const result = isSameDay(input as dayjs.ConfigType)
      expect(result).toBe(expected)
    })
  })
  it('closestToNow', async () => {
    const dateCompare = '2019-09-06T19:00:00'
    const datesArray = ['2019-09-06T10:00:00', '2019-09-06T15:00:00', '2019-09-06T21:00:00']
    const expected = '2019-09-06T21:00:00'
    const result = closestTo(dateCompare, datesArray)
    expect(result).toBe(expected)
  })
})

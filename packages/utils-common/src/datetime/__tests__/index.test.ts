import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getTime, getDate, isSameDay, toUTCTime, toLocalTime, DATE_TIME_FORMAT } from '..'
import MockDate from 'mockdate'
dayjs.extend(utc)

describe('getTime', () => {
  it('should return correctly for variants', () => {
    const variants = [
      ['Fri, 30 Aug 2019 17:44:20', '05:44 PM', '17:44'],
      ['2019-09-05T00:30:00', '12:30 AM', '00:30'],
    ]
    variants.forEach(([input, expected, expectedFor24h]) => {
      expect(getTime(input)).toBe(expected)
      expect(getTime(input, true)).toBe(expectedFor24h)
    })
  })
})

describe('getDate', () => {
  it('should return correctly for variants', () => {
    const variants = [
      ['2019-07-05T00:37:40.220Z', undefined, '05 Jul 2019'],
      ['Fri, 30 Aug 2019 17:44:20', 'DD MMM YYYY', '30 Aug 2019'],
      ['2019-07-05T00:37:40.220Z', 'DD MMM', '05 Jul'],
    ]
    variants.forEach(([input, format, expected]) => {
      const result = getDate(input as dayjs.ConfigType, format)
      expect(result).toBe(expected)
    })
  })
})

describe('getTime', () => {
  it('should return correctly for variants', () => {
    const TIME_OFFSET = 0
    MockDate.set('2019-12-18T16:30:00', TIME_OFFSET)
    const variants = [
      ['2019-12-18T10:30:00', true],
      ['Fri, 30 Aug 2019 17:44:20', false],
    ]
    variants.forEach(([input, expected]) => {
      const result = isSameDay(input as dayjs.ConfigType)
      expect(result).toBe(expected)
    })
    MockDate.reset()
  })
})

describe('toUTCTime', () => {
  it('should run correctly with Dayjs', () => {
    const date = dayjs('2019-09-06T19:00:00+07:00')
    const result = toUTCTime(date)
    expect(result).toEqual('2019-09-06T12:00:00+00:00')
  })

  it('should run correctly with string', () => {
    const date = '2019-09-06T19:00:00+07:00'
    const result = toUTCTime(date)
    expect(result).toEqual('2019-09-06T12:00:00+00:00')
  })
  it('should run correctly with string and format', () => {
    const date = '2019-09-06T19:00:00+07:00'
    const result = toUTCTime(date, DATE_TIME_FORMAT.DATE_TIME_FORMAT)
    expect(result).toEqual('06 Sep 2019 12:00')
  })
})

describe('toLocal', () => {
  it('should run correctly with Dayjs', () => {
    const date = dayjs('2019-09-06T19:00:00+07:00')
    const result = toLocalTime(date)
    expect(result).toEqual('06 Sep 2019 12:00')
  })

  it('should run correctly with string', () => {
    const date = '2019-09-06T19:00:00+07:00'
    const result = toLocalTime(date)
    expect(result).toEqual('06 Sep 2019 12:00')
  })

  it('should run correctly with string and format', () => {
    const date = '2019-09-06T19:00:00+07:00'
    const result = toLocalTime(date, DATE_TIME_FORMAT.RFC3339)
    expect(result).toEqual('2019-09-06T12:00:00+00:00')
  })
})

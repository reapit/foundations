import dayjs from 'dayjs'
import { formatRenderDate, formatRequestDate, generatePreviousTransactionDate } from '../utils'

const inputDayjs = dayjs('2020-01-01T00:00:00.000')
const developerCreatedDayjs = dayjs('2019-10-01T00:00:00.000')

describe('transacion history utils', () => {
  describe('formatRenderDate', () => {
    it('formatRenderDate should run correctly', () => {
      expect(formatRenderDate(inputDayjs)).toBe('January 2020')
    })
    it('formatRequestDate should run correctly', () => {
      expect(formatRequestDate(inputDayjs)).toBe('2020-01')
    })
  })

  describe('generatePreviousTransactionDate', () => {
    it('generatePreviousTransactionDate should run correctly', () => {
      expect(
        generatePreviousTransactionDate({ currentDate: inputDayjs, developerCreateDate: developerCreatedDayjs }),
      ).toEqual([dayjs('2019-12-01T00:00:00.000'), dayjs('2019-11-01T00:00:00.000'), dayjs('2019-10-01T00:00:00.000')])
    })
    it('generatePreviousTransactionDate should run correctly', () => {
      expect(
        generatePreviousTransactionDate({
          currentDate: dayjs('2020-08-12T00:00:00.000'),
          developerCreateDate: dayjs('2020-08-03T00:00:00.000'),
        }),
      ).toEqual([])
    })
  })
})

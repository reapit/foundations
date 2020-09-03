import { officesDataStub } from '../stubs/offices'
import {
  filterNegotiatorsIdByOffice,
  GenerateWorkingSlotFromTimeRangeParams,
  generateAppoinmenSlotDatesFromTimeRange,
} from '../utils'

describe('appointment planner utils', () => {
  test('filterNegotiatorsIdByOffice', () => {
    const input = ['AASD', 'ABCD', 'ABC']
    const output = ['AASD', 'ABCD']
    expect(filterNegotiatorsIdByOffice(officesDataStub, input)).toEqual(output)
  })

  test('generateAppoinmenSlotDatesFromTimeRange', () => {
    /**
     * 31-01 -> 02/02
     */
    const input: GenerateWorkingSlotFromTimeRangeParams = {
      dateTo: '2020-01-31T17:00:00.000Z',
      dateFrom: '2020-02-02T17:00:00.000Z',
      appointmentLength: 60 * 4, // 4hrs
      appointmentTimeGap: 60 * 4, // 4hrs
    }

    /**
     * start of the day of week is 8h AM
     * end of the day of week is 8h PM
     *
     * [A-B] - A = start appointment date time, B = end appointment date time
     * result should be:
     * 31 - 01 [8h - 12h00] [4h gap] [16h - 20h]
     * 01 - 02 [8h - 12h00] [4h gap] [16h - 20h]
     */
    const output = [
      {
        date: '2020-01-31T17:00:00.000Z',
        slots: [
          { dateTimeStart: '2020-01-31T08:00:00.000Z', dateTimeEnd: '2020-01-31T12:00:00.000Z' },
          { dateTimeStart: '2020-01-31T16:00:00.000Z', dateTimeEnd: '2020-01-31T20:00:00.000Z' },
        ],
      },
      {
        date: '2020-02-01T17:00:00.000Z',
        slots: [
          { dateTimeStart: '2020-02-01T08:00:00.000Z', dateTimeEnd: '2020-02-01T12:00:00.000Z' },
          { dateTimeStart: '2020-02-01T16:00:00.000Z', dateTimeEnd: '2020-02-01T20:00:00.000Z' },
        ],
      },
    ]

    expect(generateAppoinmenSlotDatesFromTimeRange(input)).toEqual(output)
  })
  /**
   * test
   * input: dateTo: 2
   *  dateFrom: 5
   * timeGap = 60*4 - every 4 hours
   * timeLength 60* - every 4 hours
   *
   * case 1 normal
   *
   * 2020-02-31T17:00:00.000Z
   */
})

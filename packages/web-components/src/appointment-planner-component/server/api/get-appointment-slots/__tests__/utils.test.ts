import { officesStub } from '../stubs/offices'
import {
  filterNegotiatorsIdByOffice,
  GenerateWorkingSlotFromTimeRangeParams,
  generateWorkingSlotFromTimeRange,
} from '../utils'

describe('appointment planner utils', () => {
  test('filterNegotiatorsIdByOffice', () => {
    const input = ['AASD', 'ABCD', 'ABC']
    const output = ['AASD', 'ABCD']
    expect(filterNegotiatorsIdByOffice(officesStub, input)).toEqual(output)
  })
  test('filterNegotiatorsIdByOffice', () => {
    // input
    // import input
    const input: GenerateWorkingSlotFromTimeRangeParams = {
      dateTo: '2020-01-31T17:00:00.000Z',
      dateFrom: '2020-02-01T17:00:00.000Z',
      appointmentLength: 60 * 4, // 4hrs
      appointmentTimeGap: 60 * 4, // 4hrs
    }

    // prep output
    const output = [
      {
        date: '2020-01-31T17:00:00.000Z',
        slots: [
          { dateTimeStart: '2020-01-31T08:00:00.000Z', dateTimeEnd: '2020-09-27T08:00:00.000Z' },
          { dateTimeStart: '2020-01-31T16:00:00.000Z', dateTimeEnd: '2020-09-27T16:00:00.000Z' },
        ],
      },
    ]

    expect(generateWorkingSlotFromTimeRange(input)).toEqual(output)
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

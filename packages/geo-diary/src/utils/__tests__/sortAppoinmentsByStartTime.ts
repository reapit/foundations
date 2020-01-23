import { sortAppoinmentsByStartTime } from '../sortAppoinmentsByStartTime'
import { appoinmentsStub } from '../__stubs__/appointments'

describe('sortAppoinmentsByStartTime', () => {
  it('sort appoinments correctly', () => {
    const inputs = appoinmentsStub
    const outputStartDates = ['2019-04-11T16:30:00', '2019-05-11T16:30:00', '2019-05-11T17:30:00']

    const resultSortAppoinmentsByStartTime = sortAppoinmentsByStartTime(inputs)
    const startDatesOfResultSortAppoinmentsByStartTime = resultSortAppoinmentsByStartTime.map(
      appoinment => appoinment.start,
    )
    expect(startDatesOfResultSortAppoinmentsByStartTime).toEqual(outputStartDates)
  })
})

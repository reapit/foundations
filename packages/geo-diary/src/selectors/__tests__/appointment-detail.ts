import { ReduxState } from '@/types/core'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import { selectAppointmentDetail } from '../appointment-detail'

describe('appointment-detail selector', () => {
  describe('selectAppointmentDetail', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick property need for test
      const input = {
        appointmentDetail: {
          appointmentDetail: appointmentDataStub,
        },
      } as ReduxState
      const output = appointmentDataStub
      const result = selectAppointmentDetail(input)
      expect(result).toEqual(output)
    })
  })
})

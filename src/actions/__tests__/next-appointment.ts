import { nextAppointmentClear, nextAppointmentValidate, nextAppointmentValidateSuccess } from '../next-appointment'
import ActionTypes from '../../constants/action-types'
import { nextAppointmentDataStub } from '@/sagas/__stubs__/next-appointment'
import { NextAppointment } from '@/reducers/next-appointment'

describe('next-appointments actions', () => {
  it('should create a nextAppointmentClear action', () => {
    expect(nextAppointmentClear.type).toEqual(ActionTypes.NEXT_APPOINTMENT_CLEAR)
    expect(nextAppointmentClear().data).toEqual(undefined)
  })

  it('should create a nextAppointmentValidate action', () => {
    expect(nextAppointmentValidate.type).toEqual(ActionTypes.NEXT_APPOINTMENT_VALIDATE)
    expect(nextAppointmentValidate('WALK').data).toEqual('WALK')
  })

  it('should create a appointmentsRequestData action', () => {
    expect(nextAppointmentValidateSuccess.type).toEqual(ActionTypes.NEXT_APPOINTMENT_VALIDATE_SUCCESS)
    expect(nextAppointmentValidateSuccess(nextAppointmentDataStub.data as NextAppointment).data).toEqual(
      nextAppointmentDataStub.data
    )
  })
})

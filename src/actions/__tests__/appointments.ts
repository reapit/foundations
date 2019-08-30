import {
  appointmentsLoading,
  appointmentsReceiveData,
  appointmentsRequestData,
  appointmentsClearData
} from '../appointments'
import ActionTypes from '../../constants/action-types'
import { appointmentsDataStub } from '../../sagas/__stubs__/appointments'

describe('appointments actions', () => {
  it('should create a appointmentsLoading action', () => {
    expect(appointmentsLoading.type).toEqual(ActionTypes.APPOINTMENTS_LOADING)
    expect(appointmentsLoading(true).data).toEqual(true)
  })

  it('should create a appointmentsReceiveData action', () => {
    expect(appointmentsReceiveData.type).toEqual(ActionTypes.APPOINTMENTS_RECEIVE_DATA)
    expect(appointmentsReceiveData(appointmentsDataStub).data).toEqual(appointmentsDataStub)
  })

  it('should create a appointmentsRequestData action', () => {
    expect(appointmentsRequestData.type).toEqual(ActionTypes.APPOINTMENTS_REQUEST_DATA)
    expect(appointmentsRequestData({ time: 'Today' }).data).toEqual({ time: 'Today' })
  })

  it('should create a appointmentsClearData action', () => {
    expect(appointmentsClearData.type).toEqual(ActionTypes.APPOINTMENTS_CLEAR_DATA)
    expect(appointmentsClearData(null).data).toEqual(null)
  })
})

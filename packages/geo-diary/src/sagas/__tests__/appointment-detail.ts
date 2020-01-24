import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  AppointmentDetailRequestParams,
  appointmentDetailLoading,
  appointmentDetailShowModal,
  appointmentDetailHideModal,
  appointmentDetailReceiveData,
  appointmentDetailRequestDataFailure,
  showConfirmModalSubmitting,
  showHideConfirmModal,
} from '@/actions/appointment-detail'
import { appointmentsRequestData } from '@/actions/appointments'
import { put, call, takeLatest, all, fork, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import appointmentDetailSagas, {
  appointmentDetailDataFetch,
  appointmentDetailDataListen,
  cancelAppointmentListen,
  cancelAppointmentRequest,
} from '../appointment-detail'
import { appointmentDataStub, appointmentDataStubWithNegotiatorsOfficesProperty } from '@/sagas/__stubs__/appointment'
import ActionTypes from '@/constants/action-types'
import { selectAppointmentDetail } from '@/selectors/appointment-detail'
import { selectAppointmentsFilterTime, selectAppointmentWithId } from '@/selectors/appointments'
import { fetchAppointment, updateAppointment } from '../api'

jest.mock('../../core/store')

const params: Action<AppointmentDetailRequestParams> = {
  data: {
    id: '1',
  },
  type: 'APPOINTMENT_DETAIL_REQUEST_DATA',
}
describe('appointment-detail', () => {
  describe('appointmentDetailDataFetch', () => {
    const id = '1'
    const gen = cloneableGenerator(appointmentDetailDataFetch)(params)
    expect(gen.next().value).toEqual(put(appointmentDetailShowModal()))
    expect(gen.next().value).toEqual(put(appointmentDetailLoading(true)))
    expect(gen.next().value).toEqual(call(fetchAppointment, { id }))
    it('api call sucessfully', () => {
      const clone = gen.clone()

      expect(clone.next(appointmentDataStub as any).value).toEqual(
        select(selectAppointmentWithId, appointmentDataStub.id || ''),
      )

      const { property, offices, negotiators } = appointmentDataStubWithNegotiatorsOfficesProperty
      expect(clone.next(appointmentDataStubWithNegotiatorsOfficesProperty).value).toEqual(
        put(appointmentDetailReceiveData({ ...appointmentDataStub, property, offices, negotiators })),
      )
      expect(clone.next().value).toEqual(put(appointmentDetailLoading(false)))
      expect(clone.next().done).toEqual(true)
    })
    it('api call fail', () => {
      const clone = gen.clone()
      expect(clone.next(undefined).value).toEqual(put(appointmentDetailRequestDataFailure()))
      expect(clone.next().done).toEqual(true)
    })
    it('api fail sagas', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(appointmentDetailRequestDataFailure()),
      )
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().done).toBe(true)
    })
  })
  describe('appointmentDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = appointmentDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppointmentDetailRequestParams>>(
          ActionTypes.APPOINTMENT_DETAIL_REQUEST_DATA,
          appointmentDetailDataFetch,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appointmentDetailSagas', () => {
    it('should listen data request', () => {
      const gen = appointmentDetailSagas()

      expect(gen.next().value).toEqual(all([fork(appointmentDetailDataListen), fork(cancelAppointmentListen)]))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appointmentDetailSagas', () => {
    it('should listen data request', () => {
      const gen = appointmentDetailSagas()

      expect(gen.next().value).toEqual(all([fork(appointmentDetailDataListen), fork(cancelAppointmentListen)]))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('cancelAppointmentListen', () => {
    it('should trigger request data when called', () => {
      const gen = cancelAppointmentListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<void>>(ActionTypes.CANCEL_APPOINTMENT, cancelAppointmentRequest),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('cancelAppointmentRequest', () => {
    const gen = cloneableGenerator(cancelAppointmentRequest)()
    expect(gen.next().value).toEqual(put(showConfirmModalSubmitting(true)))
    expect(gen.next().value).toEqual(select(selectAppointmentDetail))
    const newAppointment = {
      ...appointmentDataStub,
      cancelled: true,
    }
    expect(gen.next(appointmentDataStub).value).toEqual(call(updateAppointment, newAppointment))
    it('api call sucessfully', () => {
      const clone = gen.clone()
      expect(clone.next(true as any).value).toEqual(call(fetchAppointment, { id: appointmentDataStub.id }))
      expect(clone.next(appointmentDataStub).value).toEqual(put(appointmentDetailReceiveData(appointmentDataStub)))
      expect(clone.next().value).toEqual(put(showHideConfirmModal(false)))
      expect(clone.next().value).toEqual(put(appointmentDetailHideModal()))
      expect(clone.next().value).toEqual(select(selectAppointmentsFilterTime))
      expect(clone.next('Today').value).toEqual(put(appointmentsRequestData({ time: 'Today' })))
      expect(clone.next().value).toEqual(put(showConfirmModalSubmitting(false)))
      expect(clone.next().done).toEqual(true)
    })
    it('api call fail', () => {
      const clone = gen.clone()
      expect(
        // @ts-ignore
        clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value,
      ).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(showConfirmModalSubmitting(false)))
      expect(clone.next().done).toEqual(true)
    })
  })
})

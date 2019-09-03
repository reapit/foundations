import { cloneableGenerator } from '@redux-saga/testing-utils'
import { URLS, APPOINTMENTS_HEADERS, REAPIT_API_BASE_URL } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import {
  AppointmentDetailRequestParams,
  appointmentDetailLoading,
  appointmentDetailShowModal,
  appointmentDetailReceiveData,
  appointmentDetailRequestDataFailure
} from '@/actions/appointment-detail'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import appointmentDetailSagas, { appointmentDetailDataFetch, appointmentDetailDataListen } from '../appointment-detail'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import ActionTypes from '@/constants/action-types'

jest.mock('../../core/store')

const mockHeaders = {
  Authorization: '123'
}

const params: Action<AppointmentDetailRequestParams> = {
  data: {
    id: '1'
  },
  type: 'APPOINTMENT_DETAIL_REQUEST_DATA'
}
describe('appointment-detail', () => {
  describe('appointmentDetailDataFetch', () => {
    const id = '1'
    const gen = cloneableGenerator(appointmentDetailDataFetch)(params)
    expect(gen.next().value).toEqual(put(appointmentDetailShowModal()))
    expect(gen.next().value).toEqual(put(appointmentDetailLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(
      call(fetcher, {
        url: `${URLS.appointments}/${id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )
    it('api call sucessfully', () => {
      const clone = gen.clone()
      expect(clone.next(appointmentDataStub as any).value).toEqual(
        put(appointmentDetailReceiveData(appointmentDataStub))
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
        put(appointmentDetailRequestDataFailure())
      )
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
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
          appointmentDetailDataFetch
        )
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appointmentDetailSagas', () => {
    it('should listen data request', () => {
      const gen = appointmentDetailSagas()

      expect(gen.next().value).toEqual(all([fork(appointmentDetailDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})

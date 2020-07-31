import { Action } from '@/types/core'
import {
  fetchWebComponentConfigFailed,
  fetchWebComponentConfigSuccess,
  updateWebComponentConfigFailed,
  updateWebComponentConfigSuccess,
} from '@/actions/web-component'
import ActionTypes from '@/constants/action-types'
import { webComponentStub } from '@/sagas/__stubs__/web-component'
import {
  fetchWebComponentConfigApi,
  FetchWebComponentConfigParams,
  updateWebComponentConfigApi,
  UpdateWebComponentConfigParams,
} from '@/services/web-component'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import webComponentSagas, {
  fetchWebComponentConfigSaga,
  updateWebComponentConfigSaga,
  webComponentSagasListen,
} from '../web-component'

describe('web-components', () => {
  describe('fetchWebComponentConfigSaga', () => {
    const params = {
      data: {
        customerId: '123',
        applicationId: '123',
      },
      type: ActionTypes.FETCH_WEB_COMPONENT_CONFIG as 'FETCH_WEB_COMPONENT_CONFIG',
    }
    const gen = cloneableGenerator(fetchWebComponentConfigSaga)(params)
    expect(gen.next().value).toEqual(call(fetchWebComponentConfigApi, { ...params.data }))
    it('should call success', () => {
      const clone = gen.clone()
      expect(clone.next(webComponentStub).value).toEqual(put(fetchWebComponentConfigSuccess(webComponentStub)))
      expect(clone.next().done).toEqual(true)
    })
    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchWebComponentConfigFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('updateWebComponentConfigSaga', () => {
    const params = {
      data: {
        appId: 'string',
        appointmentLength: 1,
        appointmentTimeGap: 1,
        appointmentTypes: [],
        customerId: 'string',
        daysOfWeek: ['1', '2', '3'],
        negotiatorIds: ['string'],
      },
      type: ActionTypes.UPDATE_WEB_COMPONENT_CONFIG as 'UPDATE_WEB_COMPONENT_CONFIG',
    }
    const gen = cloneableGenerator(updateWebComponentConfigSaga)(params)
    expect(gen.next().value).toEqual(call(updateWebComponentConfigApi, params.data))
    it('should call success', () => {
      const clone = gen.clone()
      expect(clone.next(webComponentStub).value).toEqual(put(updateWebComponentConfigSuccess()))
      expect(clone.next().value).toEqual(put(fetchWebComponentConfigSuccess(webComponentStub)))
      expect(clone.next().done).toEqual(true)
    })
    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(updateWebComponentConfigFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })
  describe('fetchNegotiatorsListen', () => {
    it('should trigger request data when called', () => {
      const gen = webComponentSagasListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchWebComponentConfigParams>>(
          ActionTypes.FETCH_WEB_COMPONENT_CONFIG,
          fetchWebComponentConfigSaga,
        ),
      )
      expect(gen.next().value).toEqual(
        takeLatest<Action<UpdateWebComponentConfigParams>>(
          ActionTypes.UPDATE_WEB_COMPONENT_CONFIG,
          updateWebComponentConfigSaga,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('negotiatorsSagas', () => {
    it('should listen data request', () => {
      const gen = webComponentSagas()
      expect(gen.next().value).toEqual(all([fork(webComponentSagasListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})

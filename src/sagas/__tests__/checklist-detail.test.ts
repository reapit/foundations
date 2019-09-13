import { fetcher } from '@reapit/elements'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { checklistDetailLoading, checklistDetailReceiveData } from '@/actions/checklist-detail'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { URLS, REAPIT_API_BASE_URL, mockHeader } from '@/constants/api'
import { checklistDetailDataFetch, checklistDetailDataListen, checklistDetailSagas } from '../checklist-detail'
import { contact } from '../__stubs__/contact'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

describe('checklist-detail fetch data', () => {
  const id = '123'
  const gen = cloneableGenerator(checklistDetailDataFetch)({ data: id })
  expect(gen.next().value).toEqual(put(checklistDetailLoading(true)))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: mockHeader
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveData({ contact })))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(put(checklistDetailLoading(false)))
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

describe('check-list sagas', () => {
  describe('checklist detail listen', () => {
    it('should request data when called', () => {
      const gen = checklistDetailDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, checklistDetailDataFetch)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('checklistDetailSagas', () => {
    it('should listen data request', () => {
      const gen = checklistDetailSagas()

      expect(gen.next().value).toEqual(all([fork(checklistDetailDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})

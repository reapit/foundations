import { fetcher } from '@reapit/elements'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailSubmitForm,
  checkListDetailHideModal
} from '@/actions/checklist-detail'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { URLS, REAPIT_API_BASE_URL } from '@/constants/api'
import {
  checklistDetailDataFetch,
  updateChecklistDetail,
  checklistDetailDataListen,
  checklistDetailSagas,
  checkListDetailUpdateListen,
  checkListDetailAddressUpdateListen,
  updateAddressHistory
} from '../checklist-detail'
import { contact } from '../__stubs__/contact'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { ContactModel } from '@/types/contact-api-schema'

jest.mock('../../core/store')

const mockHeaders = {
  Authorization: '123'
}

describe('checklist-detail fetch data', () => {
  const id = 'MKC16000098"'
  const gen = cloneableGenerator(checklistDetailDataFetch)({ data: id })
  expect(gen.next().value).toEqual(put(checklistDetailLoading(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: mockHeaders
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

describe('checklist-detail updateChecklistDetail', () => {
  const id = 'MKC16000098'
  const gen = cloneableGenerator(updateChecklistDetail)({ data: contact })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  const mockBody = {
    ...contact
  }
  delete mockBody.id
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: mockHeaders,
      body: mockBody
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true as any).value).toEqual(
      call(fetcher, {
        url: `${URLS.contacts}/${id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )
    expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveData({ contact })))
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().value).toEqual(put(checkListDetailHideModal()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(checkListDetailSubmitForm(false))
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

describe('checklist-detail updateAddressHistory', () => {
  const id = 'MKC16000098'
  const gen = cloneableGenerator(updateAddressHistory)({ data: { id, addresses: contact.addresses } })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: mockHeaders,
      body: { addresses: contact.addresses }
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true as any).value).toEqual(
      call(fetcher, {
        url: `${URLS.contacts}/${id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )
    expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveData({ contact })))
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(checkListDetailSubmitForm(false))
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

  describe('checklist detail update listen', () => {
    it('should request data when called', () => {
      const gen = checkListDetailUpdateListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, updateChecklistDetail)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('checklist detail update listen', () => {
    it('should request data when called', () => {
      const gen = checkListDetailAddressUpdateListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA, updateAddressHistory)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('checklistDetailSagas', () => {
    it('should listen data request', () => {
      const gen = checklistDetailSagas()

      expect(gen.next().value).toEqual(
        all([
          fork(checklistDetailDataListen),
          fork(checkListDetailUpdateListen),
          fork(checkListDetailAddressUpdateListen)
        ])
      )
      expect(gen.next().done).toBe(true)
    })
  })
})

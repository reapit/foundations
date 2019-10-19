import { fetcher } from '@reapit/elements'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  checklistDetailLoading,
  checkListDetailSubmitForm,
  checklistDetailRequestData,
  checkListDetailUpdateData
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
  updateAddressHistory,
  mapAddressToMetaData,
  mapArrAddressToUploadImageFunc,
  updatePrimaryIdListen,
  updateSecondaryIdListen,
  updateSecondaryId,
  updatePrimaryId
} from '../checklist-detail'
import { contact } from '../__stubs__/contact'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { ContactModel } from '@/types/contact-api-schema'
import { selectCheckListDetailContact } from '@/selectors/checklist-detail'

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
  // test('api call success', () => {
  //   const clone = gen.clone()
  //   expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveData({ contact, idCheck: null })))
  //   expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
  //   expect(clone.next().done).toBe(true)
  // })
  // test('api call fail', () => {
  //   const clone = gen.clone()
  //   // @ts-ignore
  //   expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(put(checklistDetailLoading(false)))
  //   expect(clone.next().value).toEqual(
  //     put(
  //       errorThrownServer({
  //         type: 'SERVER',
  //         message: errorMessages.DEFAULT_SERVER_ERROR
  //       })
  //     )
  //   )
  //   expect(clone.next().done).toBe(true)
  // })
})
describe('checklist-detail updateChecklistDetail', () => {
  const gen = cloneableGenerator(updateChecklistDetail as any)({ data: contact })
  expect(gen.next().value).toEqual(select(selectCheckListDetailContact))
  expect(gen.next(contact as any).value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url: `${URLS.contacts}/${contact.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: mockHeaders,
      body: contact
    })
  )
  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true as any).value).toEqual(put(checklistDetailRequestData(contact.id)))
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
describe('mapAddressToMetaData', () => {
  it('should run correctly', () => {
    const mockParams = {
      addressesMeta: contact.metadata.addresses,
      responseUploadImages: [
        { Url: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg' }
      ]
    }
    const result = mapAddressToMetaData(mockParams)
    expect(result).toEqual(contact.metadata.addresses)
  })
  it('should return []', () => {
    const mockParams = {
      addressesMeta: undefined,
      responseUploadImages: [
        { Url: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg' }
      ]
    }
    const result = mapAddressToMetaData(mockParams)
    expect(result).toEqual([])
  })
})
describe('mapAddressToMetaData', () => {
  it('should run correctly', () => {
    const mockParams = {
      addresses: contact.addresses,
      headers: mockHeaders,
      addressesMeta: contact.metadata.addresses
    }
    const result = mapArrAddressToUploadImageFunc(mockParams)
    expect(result).toEqual([null])
  })
  it('should run correctly', () => {
    const mockParams = {
      addresses: contact.addresses,
      headers: mockHeaders,
      addressesMeta: [
        {
          ...contact.metadata.addresses[0],
          documentFileInput: '123'
        },
        {
          ...contact.metadata.addresses[0]
        }
      ]
    }
    const result = mapArrAddressToUploadImageFunc(mockParams)
    expect(result).toHaveLength(1)
  })
  it('should return []', () => {
    const mockParams = {
      addresses: undefined,
      headers: mockHeaders,
      addressesMeta: undefined
    }
    const result = mapArrAddressToUploadImageFunc(mockParams)
    expect(result).toEqual([])
  })
})
describe('checklist-detail updateAddressHistory', () => {
  const gen = cloneableGenerator(updateAddressHistory as any)({
    data: { addresses: contact.addresses } as ContactModel
  })
  expect(gen.next().value).toEqual(select(selectCheckListDetailContact))
  expect(gen.next(contact as any).value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(all([]))
  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next([{ Url: 'test' }] as any).value).toEqual(
      put(checkListDetailUpdateData({ id: contact.id, addresses: contact.addresses, metadata: { addresses: [] } }))
    )
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
          fork(checkListDetailAddressUpdateListen),
          fork(updatePrimaryIdListen),
          fork(updateSecondaryIdListen)
        ])
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('checklist-detail updatePrimaryId', () => {
    const gen = cloneableGenerator(updatePrimaryId as any)({
      data: {
        typeId: '123',
        details: '123',
        expiry: new Date('2019-10-15T10:00:00Z'),
        fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
      }
    })
    expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({ Url: 'test' } as any).value).toEqual(
        put(
          checkListDetailUpdateData({
            id: undefined,
            metadata: {
              primaryId: [
                {
                  documents: [
                    {
                      typeId: '123',
                      details: '123',
                      expiry: new Date('2019-10-15T10:00:00Z'),
                      fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
                    }
                  ]
                }
              ]
            }
          })
        )
      )
      clone.next()
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
  describe('checklist-detail updateSecondaryId', () => {
    const gen = cloneableGenerator(updateSecondaryId as any)({
      data: {
        typeId: '123',
        details: '123',
        expiry: new Date('2019-10-15T10:00:00Z'),
        fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
      }
    })
    expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({ Url: 'test' } as any).value).toEqual(
        put(
          checkListDetailUpdateData({
            id: undefined,
            metadata: {
              secondaryId: [
                {
                  documents: [
                    {
                      typeId: '123',
                      details: '123',
                      expiry: new Date('2019-10-15T10:00:00Z'),
                      fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
                    }
                  ]
                }
              ]
            }
          })
        )
      )
      clone.next()
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
})

import { idCheck, contact } from '../__stubs__/contact'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  checklistDetailLoading,
  checkListDetailSubmitForm,
  contactReceiveData,
  identityCheckReceiveData,
} from '@/actions/checklist-detail'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import {
  checklistDetailDataFetch,
  updateChecklistDetail,
  checklistDetailDataListen,
  checklistDetailSagas,
  checkListDetailUpdateListen,
  checkListDetailAddressUpdateListen,
  updateAddressHistory,
  mapAddressToMetaData,
  updatePrimaryIdListen,
  updateSecondaryIdListen,
  updateSecondaryId,
  updatePrimaryId,
  updateAgentCheckListen,
  updateAgentCheck,
  mapArrAddressToUploadImageFunc,
} from '../checklist-detail'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import ActionTypes from '@/constants/action-types'
import { selectUserCode } from '@/selectors/auth'
import { fetchContact, fetchIdentityCheck, updateContact, updateIdentityCheck } from '../api'

jest.mock('../../core/store')

const mockHeaders = {
  Authorization: '123',
}

describe('check-list detail', () => {
  describe('mapArrAddressToUploadImageFunc', () => {
    it('should run correctly', () => {
      const mockParams = {
        addresses: contact.addresses,
        headers: mockHeaders,
        addressesMeta: contact.metadata.addresses,
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
            documentFileInput: '123',
          },
          {
            ...contact.metadata.addresses[0],
          },
        ],
      }
      const result = mapArrAddressToUploadImageFunc(mockParams)
      expect(result).toHaveLength(1)
    })
  })

  describe('mapAddressToMetaData', () => {
    it('should run correctly', () => {
      const mockParams = {
        addressesMeta: contact.metadata.addresses,
        responseUploadImages: [
          { Url: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg' },
        ],
      }
      const result = mapAddressToMetaData(mockParams)
      expect(result).toEqual(contact.metadata.addresses)
    })
    it('should return []', () => {
      const mockParams = {
        addressesMeta: undefined,
        responseUploadImages: [
          { Url: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg' },
        ],
      }
      const result = mapAddressToMetaData(mockParams)
      expect(result).toEqual([])
    })
  })

  describe('checklist-detail fetch data', () => {
    const gen = cloneableGenerator(checklistDetailDataFetch as any)({ data: contact.id })
    expect(gen.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(
      all([
        call(fetchContact, { contactId: contact.id, headers: mockHeaders }),
        call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }),
      ]),
    )
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next([contact, idCheck] as any).value).toEqual(put(contactReceiveData(contact)))
      expect(clone.next().value).toEqual(put(identityCheckReceiveData(idCheck)))
      expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
      expect(clone.next().done).toBe(true)
    })
    test('api call fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updateChecklistDetail', () => {
    const gen = cloneableGenerator(updateChecklistDetail as any)({ data: contact })
    expect(gen.next(contact as any).value).toEqual(put(checkListDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
    expect(gen.next(contact as any).value).toEqual(
      call(updateContact, { contactId: contact.id, headers: mockHeaders, contact: contact }),
    )
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(true as any).value).toEqual(put(checklistDetailLoading(true)))
      expect(clone.next(true as any).value).toEqual(call(fetchContact, { contactId: contact.id, headers: mockHeaders }))
      expect(clone.next(contact as any).value).toEqual(put(contactReceiveData(contact)))
      expect(clone.next(true as any).value).toEqual(put(checklistDetailLoading(false)))
      expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
    test('api call fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updateAddressHistory', () => {
    const gen = cloneableGenerator(updateAddressHistory as any)({
      data: { addresses: contact.addresses, metadata: contact.metadata } as ContactModel,
    })
    expect(gen.next(contact as any).value).toEqual(put(checkListDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
    expect(gen.next(contact as any).value).toEqual(all([null]))
    test('api call success', () => {
      const clone = gen.clone()
      const newContact = {
        id: contact.id,
        addresses: contact.addresses,
        metadata: { addresses: contact.metadata.addresses },
      }
      expect(clone.next().value).toEqual(
        call(updateContact, { contactId: contact.id, contact: newContact, headers: mockHeaders }),
      )
      expect(clone.next(true as any).value).toEqual(put(checklistDetailLoading(true)))
      expect(clone.next().value).toEqual(call(fetchContact, { contactId: contact.id, headers: mockHeaders }))
      expect(clone.next(contact as any).value).toEqual(put(contactReceiveData(contact)))
      expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
      expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
    test('api call fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })
})

describe('checklist-detail updatePrimaryId', () => {
  const gen = cloneableGenerator(updatePrimaryId as any)({
    data: {
      typeId: '123',
      details: '123',
      expiry: new Date('2019-10-15T10:00:00Z'),
      fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
    },
  })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailIdCheck))
  expect(gen.next(idCheck as any).value).toEqual(select(selectCheckListDetailContact))

  test('api call success', () => {
    const clone = gen.clone()
    const baseValues = {
      metadata: {
        primaryIdUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
        secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
      },
      documents: idCheck.documents,
    }
    expect(clone.next(contact as any).value).toEqual(
      call(updateIdentityCheck, {
        headers: mockHeaders,
        identityChecks: {
          contactId: contact.id,
          ...idCheck,
          ...baseValues,
        },
      }),
    )
    expect(clone.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
    expect(clone.next(idCheck as any).value).toEqual(put(identityCheckReceiveData(idCheck)))
    expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toBe(true)
  })
  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toBe(true)
  })
})
describe('checklist-detail updateSecondaryId', () => {
  const gen = cloneableGenerator(updateSecondaryId as any)({
    data: {
      typeId: '123',
      details: '123',
      expiry: new Date('2019-10-15T10:00:00Z'),
      fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
    },
  })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailIdCheck))
  expect(gen.next(idCheck as any).value).toEqual(select(selectCheckListDetailContact))

  test('api call success', () => {
    const clone = gen.clone()
    const baseValues = {
      metadata: {
        primaryIdUrl: undefined,
        secondaryIdUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
      },
      documents: idCheck.documents,
    }
    expect(clone.next(contact as any).value).toEqual(
      call(updateIdentityCheck, {
        headers: mockHeaders,
        identityChecks: {
          contactId: contact.id,
          ...idCheck,
          ...baseValues,
        },
      }),
    )
    expect(clone.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
    expect(clone.next(idCheck as any).value).toEqual(put(identityCheckReceiveData(idCheck)))
    expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toBe(true)
  })
  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toBe(true)
  })
})

describe('checklist-detail updateAgentCheck', () => {
  const data = {
    referralType: 'Vendor Compliance',
    timeSelection: '10:00',
    clientType: 'Individual',
    placeMeet: 'Home Address',
    isUKResident: 'Yes',
  }
  const gen = cloneableGenerator(updateAgentCheck)({
    data,
  })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
  expect(gen.next(contact as any).value).toEqual(select(selectCheckListDetailIdCheck))
  expect(gen.next(idCheck as any).value).toEqual(select(selectUserCode))

  test('api call success', () => {
    const clone = gen.clone()
    const newIdCheck = {
      contactId: contact.id,
      ...idCheck,
      metadata: {
        ...idCheck.metadata,
        ...data,
      },
    }
    expect(clone.next('mockCode' as any).value).toEqual(
      call(updateIdentityCheck, { identityChecks: newIdCheck, headers: mockHeaders }),
    )
    expect(clone.next(true as any).value).toEqual(put(checklistDetailLoading(true)))
    expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
    expect(clone.next(idCheck as any).value).toEqual(put(identityCheckReceiveData(idCheck)))
    expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toEqual(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
    expect(clone.next().done).toBe(true)
  })
})

describe('check-list sagas', () => {
  describe('checklist detail listen', () => {
    it('should request data when called', () => {
      const gen = checklistDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, checklistDetailDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('checklist detail update listen', () => {
    it('should request data when called', () => {
      const gen = checkListDetailUpdateListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, updateChecklistDetail),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('checklist detail update listen', () => {
    it('should request data when called', () => {
      const gen = checkListDetailAddressUpdateListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA, updateAddressHistory),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('checklist detail agent update listen', () => {
    it('should request data when called', () => {
      const gen = updateAgentCheckListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_AGENT_CHECK_UPDATE_DATA, updateAgentCheck),
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
          fork(updateSecondaryIdListen),
          fork(updateAgentCheckListen),
        ]),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})

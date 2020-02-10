import { contact } from '../__stubs__/contact'
import { identityCheck } from '../__stubs__/identity-check'
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
  updatePrimaryIdListen,
  updateSecondaryIdListen,
  updateSecondaryId,
  updatePrimaryId,
  updateAgentCheckListen,
  updateAgentCheck,
} from '../checklist-detail'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { selectContact, selectIdentityCheck } from '@/selectors/checklist-detail'
import ActionTypes from '@/constants/action-types'
import { selectUserCode } from '@/selectors/auth'
import { fetchContact, fetchIdentityCheck, updateContact, updateIdentityCheck } from '../api'

jest.mock('../../core/store')

const mockHeaders = {
  Authorization: '123',
  'If-Match': '9CBE436919C6BE89A8642BC70A7CFAEE',
}

describe('check-list detail', () => {
  describe('checklist-detail fetch data', () => {
    const gen = cloneableGenerator(checklistDetailDataFetch as any)({ data: contact.id })
    expect(gen.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders).value).toEqual(
      all([
        call(fetchContact, { contactId: contact.id, headers: mockHeaders }),
        call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }),
      ]),
    )
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next([contact, identityCheck]).value).toEqual(put(contactReceiveData(contact)))
      expect(clone.next().value).toEqual(put(identityCheckReceiveData(identityCheck)))
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
    expect(gen.next(contact).value).toEqual(put(checkListDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders).value).toEqual(select(selectContact))
    expect(gen.next(contact).value).toEqual(
      call(updateContact, { contactId: contact.id, headers: mockHeaders, contact: contact }),
    )
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(true).value).toEqual(put(checklistDetailLoading(true)))
      expect(clone.next(true).value).toEqual(call(fetchContact, { contactId: contact.id, headers: mockHeaders }))
      expect(clone.next(contact).value).toEqual(put(contactReceiveData(contact)))
      expect(clone.next(true).value).toEqual(put(checklistDetailLoading(false)))
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
      data: {
        primaryAddress: contact.primaryAddress,
        secondaryAddress: contact.secondaryAddress,
        metadata: contact.metadata,
      } as ContactModel,
    })
    expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders).value).toEqual(select(selectContact))

    test('api call success', () => {
      const clone = gen.clone()
      const newContact = {
        id: contact.id,
        primaryAddress: contact.primaryAddress,
        secondaryAddress: contact.secondaryAddress,
        metadata: contact.metadata,
      }
      expect(clone.next(contact).value).toEqual(
        call(updateContact, { contactId: contact.id, contact: newContact, headers: mockHeaders }),
      )
      expect(clone.next(true).value).toEqual(put(checklistDetailLoading(true)))
      expect(clone.next().value).toEqual(call(fetchContact, { contactId: contact.id, headers: mockHeaders }))
      expect(clone.next(contact).value).toEqual(put(contactReceiveData(contact)))
      expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
      expect(clone.next().value).toEqual(put(checkListDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      const newContact = {
        id: contact.id,
        primaryAddress: contact.primaryAddress,
        secondaryAddress: contact.secondaryAddress,
        metadata: contact.metadata,
      }
      expect(clone.next(contact).value).toEqual(
        call(updateContact, { contactId: contact.id, contact: newContact, headers: mockHeaders }),
      )
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
      documentId: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
    },
  })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders).value).toEqual(select(selectIdentityCheck))
  expect(gen.next(identityCheck).value).toEqual(select(selectContact))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(contact).value).toEqual(
      call(updateIdentityCheck, {
        headers: mockHeaders,
        identityCheck: {
          id: 'RPT20000004',
          typeId: '123',
          details: '123',
          expiry: new Date('2019-10-15T10:00:00Z'),
          documentId: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
        },
      }),
    )
    expect(clone.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
    expect(clone.next(identityCheck).value).toEqual(put(identityCheckReceiveData(identityCheck)))
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
      documentId: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
    },
  })
  expect(gen.next().value).toEqual(put(checkListDetailSubmitForm(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders).value).toEqual(select(selectIdentityCheck))
  expect(gen.next(identityCheck).value).toEqual(select(selectContact))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(contact).value).toEqual(
      call(updateIdentityCheck, {
        headers: mockHeaders,
        identityCheck: {
          id: 'RPT20000004',
          typeId: '123',
          details: '123',
          expiry: new Date('2019-10-15T10:00:00Z'),
          documentId: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
        },
      }),
    )
    expect(clone.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
    expect(clone.next(identityCheck).value).toEqual(put(identityCheckReceiveData(identityCheck)))
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
  expect(gen.next(mockHeaders).value).toEqual(select(selectContact))
  expect(gen.next(contact).value).toEqual(select(selectIdentityCheck))
  expect(gen.next(identityCheck).value).toEqual(select(selectUserCode))

  test('api call success', () => {
    const clone = gen.clone()
    const newIdentityCheck = {
      contactId: contact.id,
      ...identityCheck,
      metadata: {
        ...identityCheck.metadata,
        ...data,
      },
    }
    expect(clone.next('mockCode').value).toEqual(
      call(updateIdentityCheck, { identityCheck: newIdentityCheck, headers: mockHeaders }),
    )
    expect(clone.next(true).value).toEqual(put(checklistDetailLoading(true)))
    expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
    expect(clone.next(identityCheck).value).toEqual(put(identityCheckReceiveData(identityCheck)))
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

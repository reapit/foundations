import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  checklistDetailLoading,
  checklistDetailSubmitForm,
  pepSearchResult,
  checklistDetailReceiveContact,
  checklistDetailReceiveIdentityCheck,
  checklistDetailHideModal,
  checklistDetailShowModal,
  UpdateContactParams
} from '@/actions/checklist-detail'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import {
  checklistDetailSagas,
  mapAddressToMetaData,
  mapArrAddressToUploadImageFunc,
  checkListDetailDeclarationAndRiskUpdateListen,
  checkListDetailPepSearchListen,
  updatePrimaryIdListen,
  updateSecondaryIdListen,
  pepSearch,
  fetchDataPepSearch,
  fetchInitialData,
  fetchChecklist,
  fetchIdentityCheck,
  onUpdateChecklist,
  updateChecklist,
  onUpdateAddressHistory,
  onUpdateDeclarationAndRisk,
  updatePrimaryId,
  updateIdentityCheck,
  updateSecondaryId,
  updateChecklistListen,
  updateAddressHistoryListen,
  fetchInitialDataListen,
  updateIdentityCheckStatusListen
} from '../checklist-detail'
import { contact, idCheck } from '../__stubs__/contact'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { ContactModel } from '@/types/contact-api-schema'
import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import { handlePepSearchStatus } from '@/utils/pep-search'

const mockHeaders = {
  Authorization: '123'
}

describe('checklist-detail', () => {
  describe('mapArrAddressToUploadImageFunc', () => {
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
  })

  describe('mapAddressToMetaData', () => {
    it('should run correctly', () => {
      const mockParams = {
        addressesMeta: contact.metadata.addresses,
        responseUpload: [
          { Url: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg' }
        ]
      }
      const result = mapAddressToMetaData(mockParams)
      expect(result).toEqual(contact.metadata.addresses)
    })
    it('should return []', () => {
      const mockParams = {
        addressesMeta: undefined,
        responseUpload: [
          { Url: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg' }
        ]
      }
      const result = mapAddressToMetaData(mockParams)
      expect(result).toEqual([])
    })
  })

  describe('checklist-detail fetchInitialData', () => {
    const gen = cloneableGenerator(fetchInitialData as any)({ data: contact.id })
    expect(gen.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(
      all([
        call(fetchChecklist, { id: contact.id, headers: mockHeaders }),
        call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders })
      ])
    )
    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next([contact, idCheck] as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
      expect(clone.next().value).toEqual(put(checklistDetailReceiveIdentityCheck(idCheck)))
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
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().value).toEqual(put(checklistDetailLoading(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail onUpdateChecklist', () => {
    describe('onHideModal', () => {
      const gen = cloneableGenerator(onUpdateChecklist as any)({ data: { contact } })
      expect(gen.next(contact as any).value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(call(updateChecklist, { contact: contact, headers: mockHeaders }))
      test('api call success', () => {
        const clone = gen.clone()
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailHideModal()))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
      test('api call fail', () => {
        const clone = gen.clone()
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })

    describe('onShowModal', () => {
      const gen = cloneableGenerator(onUpdateChecklist as any)({ data: { contact, nextSection: 'mockNextSection' } })
      expect(gen.next(contact as any).value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(call(updateChecklist, { contact: contact, headers: mockHeaders }))
      test('api call success', () => {
        const clone = gen.clone()
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailShowModal('mockNextSection')))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
      test('api call fail', () => {
        const clone = gen.clone()
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
  })

  describe('checklist-detail updateAddressHistory', () => {
    describe('onHideModal', () => {
      const gen = cloneableGenerator(onUpdateAddressHistory as any)({
        data: { contact: { addresses: contact.addresses, metadata: contact.metadata } } as ContactModel
      })
      expect(gen.next(contact as any).value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(all([null]))
      test('api call success', () => {
        const clone = gen.clone()
        expect(clone.next().value).toEqual(call(updateChecklist, { contact, headers: mockHeaders }))
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailHideModal()))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
      test('api call fail', () => {
        const clone = gen.clone()
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })

    describe('onNextSection', () => {
      const gen = cloneableGenerator(onUpdateAddressHistory as any)({
        data: {
          nextSection: 'nextSection',
          contact: { addresses: contact.addresses, metadata: contact.metadata }
        } as ContactModel
      })
      expect(gen.next(contact as any).value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(all([null]))
      test('api call success', () => {
        const clone = gen.clone()
        expect(clone.next().value).toEqual(call(updateChecklist, { contact: contact, headers: mockHeaders }))
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailShowModal('nextSection')))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
      test('api call fail', () => {
        const clone = gen.clone()
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
  })

  describe('checklist-detail onUpdateDeclarationAndRisk', () => {
    describe('onHideModal', () => {
      const gen = cloneableGenerator(onUpdateDeclarationAndRisk as any)({
        data: { contact: { metadata: contact.metadata } }
      })
      expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(all([null, null]))

      test('api call success', () => {
        const clone = gen.clone()
        expect(clone.next([] as any).value).toEqual(call(updateChecklist, { headers: mockHeaders, contact }))
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailHideModal()))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })

      test('api call fail', () => {
        const clone = gen.clone()
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
    describe('onNextSection', () => {
      const gen = cloneableGenerator(onUpdateDeclarationAndRisk as any)({
        data: { contact: { metadata: contact.metadata }, nextSection: 'nextSection' }
      })
      expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(all([null, null]))

      test('api call success', () => {
        const clone = gen.clone()
        expect(clone.next([] as any).value).toEqual(call(updateChecklist, { headers: mockHeaders, contact }))
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailShowModal('nextSection')))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })

      test('api call fail', () => {
        const clone = gen.clone()
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
  })

  describe('checklist-detail pepSearch', () => {
    const gen = cloneableGenerator(pepSearch as any)({ data: 'mockName' })
    expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(contact as any).value).toEqual(
        call(fetchDataPepSearch, { name: 'mockName', headers: mockHeaders })
      )
      expect(clone.next([] as any).value).toEqual(call(handlePepSearchStatus, contact.id, 'passed'))
      expect(clone.next().value).toEqual(put(pepSearchResult({ searchParam: 'mockName', searchResults: [] })))
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updatePrimaryId', () => {
    const gen = cloneableGenerator(updatePrimaryId as any)({
      data: {
        identityChecks: {
          typeId: '123',
          details: '123',
          expiry: new Date('2019-10-15T10:00:00Z'),
          fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
        }
      }
    })
    expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailIdCheck))
    expect(gen.next(idCheck as any).value).toEqual(select(selectCheckListDetailContact))
    test('api call success', () => {
      const clone = gen.clone()
      const baseValues = {
        metadata: {
          primaryIdUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg'
        },
        documents: idCheck.documents
      }
      expect(clone.next(contact as any).value).toEqual(
        call(updateIdentityCheck, {
          contactId: contact.id,
          headers: mockHeaders,
          identityChecks: {
            ...idCheck,
            ...baseValues
          }
        })
      )
      expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
      expect(clone.next(idCheck as any).value).toEqual(put(checklistDetailReceiveIdentityCheck(idCheck)))
      expect(clone.next().value).toEqual(put(checklistDetailHideModal()))
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
    test('api call fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updateSecondaryId', () => {
    const gen = cloneableGenerator(updateSecondaryId as any)({
      data: {
        identityChecks: {
          typeId: '123',
          details: '123',
          expiry: new Date('2019-10-15T10:00:00Z'),
          fileUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
        }
      }
    })
    expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailIdCheck))
    expect(gen.next(idCheck as any).value).toEqual(select(selectCheckListDetailContact))

    test('api call success', () => {
      const clone = gen.clone()
      const baseValues = {
        metadata: {
          primaryIdUrl: undefined,
          secondaryIdUrl: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA'
        },
        documents: idCheck.documents
      }
      expect(clone.next(contact as any).value).toEqual(
        call(updateIdentityCheck, {
          contactId: contact.id,
          headers: mockHeaders,
          identityChecks: {
            ...idCheck,
            ...baseValues
          }
        })
      )
      expect(clone.next().value).toEqual(call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }))
      expect(clone.next(idCheck as any).value).toEqual(put(checklistDetailReceiveIdentityCheck(idCheck)))
      expect(clone.next().value).toEqual(put(checklistDetailHideModal()))
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
    test('api call fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })
  describe('check-list sagas', () => {
    describe('checklist detail listen', () => {
      it('should request data when called', () => {
        const gen = fetchInitialDataListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, fetchInitialData)
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail update listen', () => {
      it('should request data when called', () => {
        const gen = updateChecklistListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateContactParams>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, onUpdateChecklist)
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail update listen', () => {
      it('should request data when called', () => {
        const gen = updateAddressHistoryListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateContactParams>>(
            ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA,
            onUpdateAddressHistory
          )
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail declarationRisk update listen', () => {
      it('should request data when called', () => {
        const gen = checkListDetailDeclarationAndRiskUpdateListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateContactParams>>(
            ActionTypes.CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA,
            onUpdateDeclarationAndRisk
          )
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail checkListDetailPepSearchListen update listen', () => {
      it('should request data when called', () => {
        const gen = checkListDetailPepSearchListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateContactParams>>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP, pepSearch)
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklistDetailSagas', () => {
      it('should listen data request', () => {
        const gen = checklistDetailSagas()
        expect(gen.next().value).toEqual(
          all([
            fork(fetchInitialDataListen),
            fork(updateChecklistListen),
            fork(updateAddressHistoryListen),
            fork(checkListDetailDeclarationAndRiskUpdateListen),
            fork(checkListDetailPepSearchListen),
            fork(updatePrimaryIdListen),
            fork(updateSecondaryIdListen),
            fork(updateIdentityCheckStatusListen)
          ])
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})

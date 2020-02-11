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
  UpdateContactParams,
  UpdateIdentityCheckParams,
} from '@/actions/checklist-detail'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import {
  checklistDetailSagas,
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
  updateIdentityCheckStatusListen,
  updateIdentityCheckStatus,
} from '../checklist-detail'
import { contact, idCheck } from '../__stubs__/contact'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import { handlePepSearchStatus } from '@/utils/pep-search'
import { EntityType, DynamicLinkParams } from '@reapit/elements'

jest.mock('../../core/store.ts')

const mockHeaders = {
  Authorization: '123',
}

describe('checklist-detail', () => {
  describe('checklist-detail fetchInitialData', () => {
    const gen = cloneableGenerator(fetchInitialData as any)({ data: contact.id })
    expect(gen.next().value).toEqual(put(checklistDetailLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(
      all([
        call(fetchChecklist, { id: contact.id, headers: mockHeaders }),
        call(fetchIdentityCheck, { contactId: contact.id, headers: mockHeaders }),
      ]),
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
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
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
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
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
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
  })

  describe('checklist-detail updateAddressHistory', () => {
    describe('onHideModal', () => {
      const gen = cloneableGenerator(onUpdateAddressHistory as any)({
        data: {
          contact: {
            primaryAddress: contact.primaryAddress,
            secondaryAddress: contact.secondaryAddress,
            metadata: contact.metadata || {
              primaryIdUrl: undefined,
              secondaryIdUrl: undefined,
            },
          },
        } as ContactModel,
      })
      expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))

      test('api call success', () => {
        const clone = gen.clone()
        const newContact = {
          id: contact.id,
          _eTag: contact._eTag,
          primaryAddress: contact.primaryAddress,
          secondaryAddress: contact.secondaryAddress,
          metadata: contact.metadata,
        }
        expect(clone.next(contact).value).toEqual(call(updateChecklist, { contact: newContact, headers: mockHeaders }))
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailHideModal()))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
      test('api call fail', () => {
        const clone = gen.clone()
        const newContact = {
          id: contact.id,
          _eTag: contact._eTag,
          primaryAddress: contact.primaryAddress,
          secondaryAddress: contact.secondaryAddress,
          metadata: contact.metadata,
        }
        expect(clone.next(contact).value).toEqual(call(updateChecklist, { contact: newContact, headers: mockHeaders }))
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })

    describe('onNextSection', () => {
      const gen = cloneableGenerator(onUpdateAddressHistory as any)({
        data: {
          nextSection: 'nextSection',
          contact: {
            primaryAddress: contact.primaryAddress,
            secondaryAddress: contact.secondaryAddress,
            metadata: contact.metadata || {
              primaryIdUrl: undefined,
              secondaryIdUrl: undefined,
            },
          },
        } as ContactModel,
      })
      expect(gen.next(contact as any).value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      test('api call success', () => {
        const clone = gen.clone()
        const newContact = {
          id: contact.id,
          _eTag: contact._eTag,
          primaryAddress: contact.primaryAddress,
          secondaryAddress: contact.secondaryAddress,
          metadata: contact.metadata,
        }
        expect(clone.next(contact).value).toEqual(call(updateChecklist, { contact: newContact, headers: mockHeaders }))
        expect(clone.next(true as any).value).toEqual(call(fetchChecklist, { id: contact.id, headers: mockHeaders }))
        expect(clone.next(contact as any).value).toEqual(put(checklistDetailReceiveContact(contact)))
        expect(clone.next().value).toEqual(put(checklistDetailShowModal('nextSection')))
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
      test('api call fail', () => {
        const clone = gen.clone()
        const newContact = {
          id: contact.id,
          _eTag: contact._eTag,
          primaryAddress: contact.primaryAddress,
          secondaryAddress: contact.secondaryAddress,
          metadata: contact.metadata,
        }
        expect(clone.next(contact).value).toEqual(call(updateChecklist, { contact: newContact, headers: mockHeaders }))
        // @ts-ignore
        expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
  })

  describe('checklist-detail onUpdateDeclarationAndRisk', () => {
    describe('onHideModal', () => {
      const gen = cloneableGenerator(onUpdateDeclarationAndRisk as any)({
        data: {
          contact: {
            metadata: contact.metadata || {
              primaryIdUrl: undefined,
              secondaryIdUrl: undefined,
            },
          },
        },
      })
      expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(all([null, null]))

      test('api call success', () => {
        const clone = gen.clone()
        const contactWithMeta = {
          ...contact,
          metadata: {
            declarationRisk: {
              declarationForm: undefined,
              reason: undefined,
              riskAssessmentForm: undefined,
              type: undefined,
            },
          },
        } as ContactModel
        expect(clone.next([] as any).value).toEqual(
          call(updateChecklist, { headers: mockHeaders, contact: contactWithMeta }),
        )
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
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
        )
        expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
        expect(clone.next().done).toBe(true)
      })
    })
    describe('onNextSection', () => {
      const gen = cloneableGenerator(onUpdateDeclarationAndRisk as any)({
        data: {
          contact: {
            metadata: contact.metadata || {
              primaryIdUrl: undefined,
              secondaryIdUrl: undefined,
            },
          },
          nextSection: 'nextSection',
        },
      })
      expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
      expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
      expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailContact))
      expect(gen.next(contact as any).value).toEqual(all([null, null]))

      test('api call success', () => {
        const clone = gen.clone()
        const contactWithMeta = {
          ...contact,
          metadata: {
            declarationRisk: {
              declarationForm: undefined,
              reason: undefined,
              riskAssessmentForm: undefined,
              type: undefined,
            },
          },
        } as ContactModel
        expect(clone.next([] as any).value).toEqual(
          call(updateChecklist, {
            headers: mockHeaders,
            contact: contactWithMeta,
          }),
        )
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
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
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
        call(fetchDataPepSearch, { name: 'mockName', headers: mockHeaders }),
      )
      expect(clone.next([] as any).value).toEqual(
        call(handlePepSearchStatus, { id: contact.id, param: 'mockName', result: [] }),
      )
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
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updatePrimaryId', () => {
    const gen = cloneableGenerator(updatePrimaryId as any)({
      data: {
        identityChecks: {
          typeId: 'CI',
          details: '123',
          expiry: new Date('2020-02-07'),
          documentId: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
        },
      },
    })
    expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailIdCheck))
    expect(gen.next(idCheck as any).value).toEqual(select(selectCheckListDetailContact))
    test('api call success', () => {
      const clone = gen.clone()
      const newIdentityDocument = {
        typeId: 'CI',
        details: '123',
        expiry: new Date('2020-02-07'),
      } as any
      expect(clone.next(contact as any).value).toEqual(
        call(updateIdentityCheck, {
          headers: mockHeaders,
          identityChecks: {
            _eTag: '"51F8EECB09FB89903C42CAB63E3D5D0C"',
            id: 'RPT19000104',
            identityDocument1: newIdentityDocument,
          },
        }),
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
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updateSecondaryId', () => {
    const gen = cloneableGenerator(updateSecondaryId as any)({
      data: {
        identityChecks: {
          typeId: 'CI',
          details: '123',
          expiry: new Date('2019-12-21'),
          documentId: 'data:image/jpeg;base64,/9j/4S/+RXhpZgAATU0AKgAAAA',
        },
      },
    })
    expect(gen.next().value).toEqual(put(checklistDetailSubmitForm(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(select(selectCheckListDetailIdCheck))
    expect(gen.next(idCheck as any).value).toEqual(select(selectCheckListDetailContact))

    test('api call success', () => {
      const clone = gen.clone()
      const newIdentityDocument = {
        typeId: 'CI',
        expiry: new Date('2019-12-21'),
        details: '123',
      } as any
      expect(clone.next(contact as any).value).toEqual(
        call(updateIdentityCheck, {
          headers: mockHeaders,
          identityChecks: {
            _eTag: '"51F8EECB09FB89903C42CAB63E3D5D0C"',
            id: 'RPT19000104',
            identityDocument2: newIdentityDocument,
          },
        }),
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
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(checklistDetailSubmitForm(false)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('checklist-detail updateIdentityCheckStatus', () => {
    const params = {
      dynamicLinkParams: { appMode: 'DESKTOP', entityType: EntityType.CONTACT },
      idCheck: { status: 'pass' },
    }
    const gen = cloneableGenerator(updateIdentityCheckStatus as any)({
      data: params,
    })
    expect(gen.next().value).toEqual(select(selectCheckListDetailIdCheck))
    expect(gen.next(idCheck as any).value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders as any).value).toEqual(put(checklistDetailSubmitForm(true)))

    test('api call success', () => {
      const clone = gen.clone()

      expect(clone.next(true as any).value).toEqual(
        call(updateIdentityCheck, {
          headers: mockHeaders,
          identityChecks: {
            ...idCheck,
            ...params.idCheck,
          },
        }),
      )
      expect(clone.next({ ...idCheck, ...params.idCheck } as any).value).toEqual(
        put(checklistDetailReceiveIdentityCheck({ ...idCheck, ...params.idCheck })),
      )
    })
  })

  describe('check-list sagas', () => {
    describe('checklist detail listen', () => {
      it('should request data when called', () => {
        const gen = fetchInitialDataListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, fetchInitialData),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail update listen', () => {
      it('should request data when called', () => {
        const gen = updateChecklistListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateContactParams>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, onUpdateChecklist),
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
            onUpdateAddressHistory,
          ),
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
            onUpdateDeclarationAndRisk,
          ),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail checkListDetailPepSearchListen update listen', () => {
      it('should request data when called', () => {
        const gen = checkListDetailPepSearchListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateContactParams>>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP, pepSearch),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail updatePrimaryIdListen', () => {
      it('should request data when called', () => {
        const gen = updatePrimaryIdListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateIdentityCheckParams>>(
            ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA,
            updatePrimaryId,
          ),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail updateSecondaryIdListen', () => {
      it('should request data when called', () => {
        const gen = updateSecondaryIdListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UpdateIdentityCheckParams>>(
            ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA,
            updateSecondaryId,
          ),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('checklist detail updateIdentityCheckStatusListen', () => {
      it('should request data when called', () => {
        const gen = updateIdentityCheckStatusListen()
        expect(gen.next().value).toEqual(
          takeLatest<
            Action<{
              idCheck: IdentityCheckModel
              dynamicLinkParams: DynamicLinkParams
            }>
          >(ActionTypes.CHECKLIST_DETAIL_IDENTITY_CHECK_UPDATE_DATA, updateIdentityCheckStatus),
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
            fork(updateIdentityCheckStatusListen),
          ]),
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})

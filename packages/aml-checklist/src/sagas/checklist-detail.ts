import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import { isBase64, navigateDynamicApp, DynamicLinkParams, isEmptyObject, notification } from '@reapit/elements'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import {
  checklistDetailLoading,
  checklistDetailReceiveContact,
  checklistDetailReceiveIdentityCheck,
  checklistDetailSubmitForm,
  pepSearchResult,
  checklistDetailShowModal,
  checklistDetailHideModal,
  UpdateContactParams,
  UpdateIdentityCheckParams,
} from '../actions/checklist-detail'
import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { handlePepSearchStatus } from '@/utils/pep-search'
import dayjs from 'dayjs'
import { ID_STATUS } from '@/components/ui/modal/modal'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'
import {
  createIdentityCheck,
  fetchChecklist,
  fetchIdentityCheck,
  updateChecklist,
  updateIdentityCheck,
  uploadImage,
} from './api'
import { extractNetworkErrString } from '@reapit/utils'

export const fetchInitialData = function*({ data: id }) {
  yield put(checklistDetailLoading(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const [contact, identityChecks] = yield all([
      call(fetchChecklist, { id, headers }),
      call(fetchIdentityCheck, { contactId: id, headers }),
    ])
    yield put(checklistDetailReceiveContact(contact))
    yield put(checklistDetailReceiveIdentityCheck(identityChecks))
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailLoading(false))
  }
}

export type OnUpdateChecklistParams = {
  data: UpdateContactParams
}

export const onUpdateChecklist = function*({ data: { nextSection, contact } }: OnUpdateChecklistParams) {
  yield put(checklistDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const currentContact = yield select(selectCheckListDetailContact)
    const newContact: ContactModel = {
      ...currentContact,
      ...contact,
    }
    if (isEmptyObject(newContact.metadata)) {
      delete newContact.metadata
    }
    const response = yield call(updateChecklist, { contact: newContact, headers })
    if (response) {
      const responseContact = yield call(fetchChecklist, { id: currentContact.id, headers })
      yield put(checklistDetailReceiveContact(responseContact))
      if (nextSection) {
        yield put(checklistDetailShowModal(nextSection))
      } else {
        yield put(checklistDetailHideModal())
      }
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export type OnUpdateAddressHistoryParams = {
  data: UpdateContactParams
}

export const onUpdateAddressHistory = function*({
  data: {
    nextSection,
    contact: { primaryAddress, secondaryAddress, metadata },
  },
}: OnUpdateAddressHistoryParams) {
  yield put(checklistDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  const currentContact = yield select(selectCheckListDetailContact)
  try {
    const newContact = {
      id: currentContact.id,
      _eTag: currentContact._eTag,
      primaryAddress,
      secondaryAddress,
      metadata: {
        ...currentContact.metadata,
        ...metadata,
      },
    } as any
    if (isBase64(metadata?.primaryAddress?.documentImage)) {
      const primaryAddressDocumentUrl = yield call(uploadImage, {
        headers,
        name: `${currentContact.id}-primary-address-id`,
        imageData: metadata?.primaryAddress?.documentImage,
      })
      newContact.metadata.primaryAddress.documentImage = primaryAddressDocumentUrl?.Url
    }

    if (isBase64(metadata?.secondaryAddress?.documentImage)) {
      const secondaryAddressDocumentUrl = yield call(uploadImage, {
        headers,
        name: `${currentContact.id}-secondary-address-id`,
        imageData: metadata?.secondaryAddress?.documentImage,
      })
      newContact.metadata.secondaryAddress.documentImage = secondaryAddressDocumentUrl?.Url
    }
    const responseUpdate = yield call(updateChecklist, { contact: newContact, headers })
    if (responseUpdate) {
      const responseContact = yield call(fetchChecklist, { id: currentContact.id, headers })
      yield put(checklistDetailReceiveContact(responseContact))
      if (nextSection) {
        yield put(checklistDetailShowModal(nextSection))
      } else {
        yield put(checklistDetailHideModal())
      }
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export type OnUpdateDeclarationAndRisk = {
  data: UpdateContactParams
}

export const onUpdateDeclarationAndRisk = function*({
  data: {
    nextSection,
    contact: { metadata },
  },
}: OnUpdateDeclarationAndRisk) {
  yield put(checklistDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  const currentContact = yield select(selectCheckListDetailContact)
  try {
    const { type, reason, declarationForm, riskAssessmentForm } = metadata?.declarationRisk || {}
    const [declarationResponse, riskAssessmentResponse] = yield all([
      isBase64(declarationForm)
        ? call(uploadImage, { headers, name: `declaration-${type}-${reason}`, imageData: declarationForm })
        : null,
      isBase64(riskAssessmentForm)
        ? call(uploadImage, { headers, name: `riskAssessment-${type}-${reason}`, imageData: riskAssessmentForm })
        : null,
    ])

    const newContact = {
      ...currentContact,
      metadata: {
        ...currentContact.metadata,
        declarationRisk: {
          reason,
          type,
          declarationForm: (declarationResponse && declarationResponse.Url) || declarationForm,
          riskAssessmentForm: (riskAssessmentResponse && riskAssessmentResponse.Url) || riskAssessmentForm,
        },
      },
    }

    const responseUpdate = yield call(updateChecklist, { headers, contact: newContact })
    if (responseUpdate) {
      const responseContact = yield call(fetchChecklist, { id: currentContact.id, headers })
      yield put(checklistDetailReceiveContact(responseContact))
      if (nextSection) {
        yield put(checklistDetailShowModal(nextSection))
      } else {
        yield put(checklistDetailHideModal())
      }
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

// TODO: should write test for api call func
export const fetchDataPepSearch = async ({ name, headers }) => {
  console.log(name, headers)
  try {
    // TODO: Duong Pham will replace by fetch API when API ready
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve([])
      }, 1000)
    })
    return result
  } catch (err) {
    return err
  }
}

export const pepSearch = function*({ data }) {
  yield put(checklistDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const contact = yield select(selectCheckListDetailContact)
    const searchResults = yield call(fetchDataPepSearch, { name: data, headers })
    // Change Pep search status in localstorage
    yield call(handlePepSearchStatus, { id: contact.id, param: data, result: searchResults })
    yield put(pepSearchResult({ searchParam: data, searchResults }))
    if (data.nextSection) {
      yield put(checklistDetailShowModal(data.nextSection))
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export type FileUploaderResponse = {
  Url: string
}

export const getFileExtensions = (data: string | undefined) => {
  if (!isBase64(data) || !data) {
    return ''
  }
  const base64ArrayData = data.split('/')
  const extensionArray = base64ArrayData?.[1]?.split(';')
  const extension = extensionArray[0]
  return extension
}

export const updatePrimaryId = function*({ data: { nextSection, identityChecks } }: Action<UpdateIdentityCheckParams>) {
  yield put(checklistDetailSubmitForm(true))

  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const contact: ContactModel = yield select(selectCheckListDetailContact)
    const fileData = identityChecks.documentId
    const newIdentityDocument = {
      typeId: identityChecks.typeId,
      expiry: identityChecks.expiry,
      details: identityChecks.details,
    } as any
    if (isBase64(identityChecks.documentId)) {
      const extension = getFileExtensions(fileData)
      newIdentityDocument.fileData = fileData
      newIdentityDocument.name = `${contact.id}-${identityChecks.typeId}-${identityChecks.details}.${extension}`
    }
    if (idCheck) {
      yield call(updateIdentityCheck, {
        headers,
        identityChecks: {
          id: idCheck.id,
          _eTag: idCheck._eTag,
          identityDocument1: newIdentityDocument,
        },
      })
    }
    if (!idCheck) {
      const session: ReapitConnectSession = yield call(reapitConnectBrowserSession.connectSession)
      yield call(createIdentityCheck, {
        headers,
        identityChecks: {
          identityDocument1: newIdentityDocument,
          contactId: contact.id,
          status: 'pending',
          checkDate: dayjs()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          negotiatorId: session.loginIdentity.userCode,
        },
      })
    }
    const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
    if (responseIdentityCheck) {
      yield put(checklistDetailReceiveIdentityCheck(responseIdentityCheck))
    }
    if (nextSection) {
      yield put(checklistDetailShowModal(nextSection))
    } else {
      yield put(checklistDetailHideModal())
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export const updateSecondaryId = function*({
  data: { nextSection, identityChecks },
}: Action<UpdateIdentityCheckParams>) {
  yield put(checklistDetailSubmitForm(true))

  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const contact: ContactModel = yield select(selectCheckListDetailContact)
    const fileData = identityChecks.documentId
    const newIdentityDocument = {
      typeId: identityChecks.typeId,
      expiry: identityChecks.expiry,
      details: identityChecks.details,
    } as any
    if (isBase64(identityChecks.documentId)) {
      const extension = getFileExtensions(fileData)
      newIdentityDocument.fileData = fileData
      newIdentityDocument.name = `${contact.id}-${identityChecks.typeId}-${identityChecks.details}.${extension}`
    }

    if (idCheck) {
      yield call(updateIdentityCheck, {
        headers,
        identityChecks: {
          id: idCheck.id,
          _eTag: idCheck._eTag,
          identityDocument2: newIdentityDocument,
        },
      })
    } else {
      const session: ReapitConnectSession = yield call(reapitConnectBrowserSession.connectSession)
      yield call(createIdentityCheck, {
        headers,
        identityChecks: {
          identityDocument2: newIdentityDocument,
          contactId: contact.id,
          status: 'pending',
          checkDate: dayjs()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          negotiatorId: session.loginIdentity.userCode,
        },
      })
    }
    const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
    if (responseIdentityCheck) {
      yield put(checklistDetailReceiveIdentityCheck(responseIdentityCheck))
    }
    if (nextSection) {
      yield put(checklistDetailShowModal(nextSection))
    } else {
      yield put(checklistDetailHideModal())
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export const fetchInitialDataListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, fetchInitialData)
}

export const updateChecklistListen = function*() {
  yield takeLatest<Action<UpdateContactParams>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, onUpdateChecklist)
}

export const updateIdentityCheckStatus = function*({
  data: { idCheck, dynamicLinkParams },
}: Action<{
  idCheck: IdentityCheckModel
  dynamicLinkParams: DynamicLinkParams
}>) {
  try {
    const existingIdCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const headers = yield call(initAuthorizedRequestHeaders)
    yield put(checklistDetailSubmitForm(true))

    if (idCheck) {
      const newIdCheck = {
        ...existingIdCheck,
        ...idCheck,
      }
      // delete metadata to avoid validation error
      if (newIdCheck?.metadata && Object.keys(newIdCheck?.metadata).length < 1) {
        delete newIdCheck.metadata
      }
      const responseIdentityCheck = yield call(updateIdentityCheck, {
        headers,
        identityChecks: newIdCheck,
      })
      if (responseIdentityCheck) {
        yield put(checklistDetailReceiveIdentityCheck(newIdCheck))
      }
      if (dynamicLinkParams.appMode === 'DESKTOP') {
        yield call(navigateDynamicApp, dynamicLinkParams)
      }
      yield put(checklistDetailShowModal(ID_STATUS.SUCCESS))
    }
  } catch (err) {
    yield call(notification.error, {
      message: extractNetworkErrString(err),
      placement: 'bottomRight',
    })
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export const updateAddressHistoryListen = function*() {
  yield takeLatest<Action<UpdateContactParams>>(
    ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA,
    onUpdateAddressHistory,
  )
}

export const checkListDetailDeclarationAndRiskUpdateListen = function*() {
  yield takeLatest<Action<UpdateContactParams>>(
    ActionTypes.CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA,
    onUpdateDeclarationAndRisk,
  )
}

export const checkListDetailPepSearchListen = function*() {
  yield takeLatest<Action<UpdateContactParams>>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP, pepSearch)
}

export const updatePrimaryIdListen = function*() {
  yield takeLatest<Action<UpdateIdentityCheckParams>>(
    ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA,
    updatePrimaryId,
  )
}

export const updateSecondaryIdListen = function*() {
  yield takeLatest<Action<UpdateIdentityCheckParams>>(
    ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA,
    updateSecondaryId,
  )
}

export const updateIdentityCheckStatusListen = function*() {
  yield takeLatest<
    Action<{
      idCheck: IdentityCheckModel
      dynamicLinkParams: DynamicLinkParams
    }>
  >(ActionTypes.CHECKLIST_DETAIL_IDENTITY_CHECK_UPDATE_DATA, updateIdentityCheckStatus)
}

export const checklistDetailSagas = function*() {
  yield all([
    fork(fetchInitialDataListen),
    fork(updateChecklistListen),
    fork(updateAddressHistoryListen),
    fork(checkListDetailDeclarationAndRiskUpdateListen),
    fork(checkListDetailPepSearchListen),
    fork(updatePrimaryIdListen),
    fork(updateSecondaryIdListen),
    fork(updateIdentityCheckStatusListen),
  ])
}

export default checklistDetailSagas

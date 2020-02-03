import { selectUserCode } from '@/selectors/auth'
import { selectContact, selectIdentityCheck } from '@/selectors/checklist-detail'
import { isBase64, toUTCTime } from '@reapit/elements'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
import {
  checklistDetailLoading,
  contactReceiveData,
  identityCheckReceiveData,
  checkListDetailSubmitForm,
} from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'
import { ContactModel, IdentityCheckModel, IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import { ErrorData } from '@/reducers/error'
import store from '@/core/store'
import dayjs from 'dayjs'
import {
  fetchContact,
  fetchIdentityCheck,
  updateContact,
  updateIdentityCheck,
  createIdentityCheck,
  uploadImage,
} from './api'
import { logger } from '@/utils/error-logger'

export const checklistDetailDataFetch = function*({ data: id }) {
  yield put(checklistDetailLoading(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const [contact, idCheck] = yield all([
      call(fetchContact, { contactId: id, headers }),
      call(fetchIdentityCheck, { contactId: id, headers }),
    ])
    yield put(contactReceiveData(contact))
    yield put(identityCheckReceiveData(idCheck))
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(checklistDetailLoading(false))
  }
}

export type UpdateCheckListDetailParams = {
  data: ContactModel
}

export const updateChecklistDetail = function*({ data: { metadata, ...rest } }: UpdateCheckListDetailParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  const contact: ContactModel = yield select(selectContact)
  try {
    const newContact = {
      ...contact,
      ...rest,
      metadata: {
        ...contact.metadata,
        ...metadata,
      },
    }
    const responseUpdate = yield call(updateContact, {
      contactId: contact.id,
      headers: { ...headers, 'If-Match': contact._eTag },
      contact: newContact,
    })
    if (responseUpdate) {
      yield put(checklistDetailLoading(true))
      const responseContact = yield call(fetchContact, { contactId: contact.id, headers })
      if (responseContact) {
        yield put(contactReceiveData(responseContact))
      }
      yield put(checklistDetailLoading(false))
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export type UpdateAddressHistoryParams = {
  data: ContactModel
}

export const updateAddressHistory = function*({
  data: { primaryAddress, secondaryAddress, metadata },
}: UpdateAddressHistoryParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  const currentContact: ContactModel = yield select(selectContact)
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

    const responseUpdate = yield call(updateContact, {
      contactId: currentContact.id,
      contact: newContact,
      headers: { ...headers, 'If-Match': currentContact._eTag },
    })
    if (responseUpdate) {
      yield put(checklistDetailLoading(true))
      const responseContact = yield call(fetchContact, { contactId: currentContact.id, headers })
      if (responseContact) {
        yield put(contactReceiveData(responseContact))
      }
      yield put(checklistDetailLoading(false))
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(checkListDetailSubmitForm(false))
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

export const updatePrimaryId = function*({ data }: Action<IdentityDocumentModel>) {
  yield put(checkListDetailSubmitForm(true))
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const identityCheck: IdentityCheckModel | null = yield select(selectIdentityCheck)
    const contact: ContactModel = yield select(selectContact)
    const fileData = data.documentId
    const newIdentityDocument = {
      typeId: data.typeId,
      expiry: data.expiry,
      details: data.details,
    } as any
    if (isBase64(data.documentId)) {
      const extension = getFileExtensions(fileData)
      newIdentityDocument.fileData = fileData
      newIdentityDocument.name = `${contact.id}-${data.typeId}.${extension}`
    }
    // Updated if existed
    if (identityCheck) {
      yield call(updateIdentityCheck, {
        headers: { ...headers, 'If-Match': identityCheck._eTag },
        identityCheck: {
          id: identityCheck.id,
          identityDocument1: newIdentityDocument,
        },
      })
    }
    // Create if not existed
    if (!identityCheck) {
      yield call(createIdentityCheck, {
        headers,
        identityChecks: {
          contactId: contact.id,
          identityDocument1: newIdentityDocument,
          status: 'pending',
          checkDate: toUTCTime(dayjs().startOf('day')),
          negotiatorId: selectUserCode(store.state),
        },
      })
    }
    yield put(checklistDetailLoading(true))
    const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
    if (responseIdentityCheck) {
      yield put(identityCheckReceiveData(responseIdentityCheck))
    }
    yield put(checklistDetailLoading(false))
  } catch (err) {
    logger(err)
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    }
    yield put(errorThrownServer(result))
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export const updateSecondaryId = function*({ data }: Action<IdentityDocumentModel>) {
  yield put(checkListDetailSubmitForm(true))
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const identityCheck: IdentityCheckModel | null = yield select(selectIdentityCheck)
    const contact: ContactModel = yield select(selectContact)
    const fileData = data.documentId
    const newIdentityDocument = {
      typeId: data.typeId,
      expiry: data.expiry,
      details: data.details,
    } as any
    if (isBase64(data.documentId)) {
      const extension = getFileExtensions(fileData)
      newIdentityDocument.fileData = fileData
      newIdentityDocument.name = `${contact.id}-${data.typeId}.${extension}`
    }
    // Update identityCheck
    if (identityCheck) {
      yield call(updateIdentityCheck, {
        headers: { ...headers, 'If-Match': identityCheck._eTag },
        identityCheck: {
          id: identityCheck.id,
          identityDocument2: newIdentityDocument,
        },
      })
    }
    // Create IdentityCheck If not existed
    if (!identityCheck) {
      yield call(createIdentityCheck, {
        headers,
        identityChecks: {
          contactId: contact.id,
          identityDocument2: newIdentityDocument,
          status: 'pending',
          checkDate: toUTCTime(dayjs().startOf('day')),
          negotiatorId: selectUserCode(store.state),
        },
      })
    }
    yield put(checklistDetailLoading(true))
    const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
    if (responseIdentityCheck) {
      yield put(identityCheckReceiveData(responseIdentityCheck))
    }
    yield put(checklistDetailLoading(false))
  } catch (err) {
    logger(err)
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    }
    yield put(errorThrownServer(result))
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export const updateAgentCheck = function*({ data }: any) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const contact = yield select(selectContact)
    const identityCheck = yield select(selectIdentityCheck)
    const negotiatorId: string | undefined = yield select(selectUserCode)
    let responseUpdate = null
    if (identityCheck) {
      const newIdentityCheck = {
        ...identityCheck,
        metadata: {
          ...identityCheck.metadata,
          ...data,
        },
      }
      responseUpdate = yield call(updateIdentityCheck, {
        identityCheck: newIdentityCheck,
        headers: { ...headers, 'If-Match': identityCheck._eTag },
      })
    }
    if (!identityCheck) {
      const newIdCheck = {
        contactId: contact.id,
        status: 'pending',
        checkDate: toUTCTime(dayjs().startOf('day')),
        negotiatorId: negotiatorId,
        metadata: {
          ...data,
        },
      }
      responseUpdate = yield call(createIdentityCheck, { identityChecks: newIdCheck, headers })
    }
    if (responseUpdate) {
      yield put(checklistDetailLoading(true))
      const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
      if (responseIdentityCheck) {
        yield put(identityCheckReceiveData(responseIdentityCheck))
      }
      yield put(checklistDetailLoading(false))
    }
  } catch (error) {
    logger(error)
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    }
    yield put(errorThrownServer(result))
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export const checklistDetailDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, checklistDetailDataFetch)
}

export const checkListDetailUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, updateChecklistDetail)
}

export const checkListDetailAddressUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA, updateAddressHistory)
}

export const updatePrimaryIdListen = function*() {
  yield takeLatest<Action<IdentityDocumentModel>>(ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA, updatePrimaryId)
}

export const updateSecondaryIdListen = function*() {
  yield takeLatest<Action<IdentityDocumentModel>>(
    ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA,
    updateSecondaryId,
  )
}

export const updateAgentCheckListen = function*() {
  yield takeLatest<Action<any>>(ActionTypes.CHECKLIST_DETAIL_AGENT_CHECK_UPDATE_DATA, updateAgentCheck)
}

export const checklistDetailSagas = function*() {
  yield all([
    fork(checklistDetailDataListen),
    fork(checkListDetailUpdateListen),
    fork(checkListDetailAddressUpdateListen),
    fork(updatePrimaryIdListen),
    fork(updateSecondaryIdListen),
    fork(updateAgentCheckListen),
  ])
}

export default checklistDetailSagas

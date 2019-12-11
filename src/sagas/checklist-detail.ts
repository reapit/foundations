import { selectUserCode } from '@/selectors/auth'
import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import { fetcher, isBase64 } from '@reapit/elements'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { URLS, REAPIT_API_BASE_URL, UPLOAD_FILE_BASE_URL } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
import {
  checklistDetailLoading,
  contactReceiveData,
  identityCheckReceiveData,
  checkListDetailSubmitForm
} from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'
import {
  ContactModel,
  ContactAddressModel,
  ContactIdentityDocumentModel,
  ContactIdentityCheckModel
} from '@/types/contact-api-schema'
import { ErrorData } from '@/reducers/error'
import store from '@/core/store'
import dayjs from 'dayjs'

export const fetchContact = async ({ contactId, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}

export const fetchIdentityCheck = async ({ headers, contactId }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}${URLS.idChecks}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })
    return response?.data?.[0] || null
  } catch (err) {
    console.error(err)
    return err
  }
}

export const uploadImage = async ({ name, imageData, headers }) => {
  try {
    const responseUploadImage = await fetcher({
      url: '/',
      api: UPLOAD_FILE_BASE_URL,
      method: 'POST',
      headers: headers,
      body: {
        name,
        imageData
      }
    })
    return responseUploadImage
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export const updateContact = async ({ contactId, headers, contact }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: contact
    })
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}

export const updateIdentityCheck = async ({ contactId, identityChecks, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}${URLS.idChecks}/${identityChecks.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: identityChecks
    })
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}

export const createIdentityCheck = async ({ contactId, identityChecks, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}${URLS.idChecks}`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers: headers,
      body: identityChecks
    })
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}

export const mapArrAddressToUploadImageFunc = ({ addresses, headers, addressesMeta }): Promise<any>[] => {
  if (!addresses || !addressesMeta) {
    return []
  }
  return addresses.map((address: ContactAddressModel, index) => {
    if (!isBase64(addressesMeta && addressesMeta[index] && addressesMeta[index].documentImage)) {
      return null
    }
    return call(uploadImage, {
      headers,
      name: `${address.type}-${address.buildingNumber}-${address.buildingName}-${address.postcode}`,
      imageData: addressesMeta[index].documentImage
    })
  })
}

export const mapAddressToMetaData = ({ addressesMeta, responseUploadImages }) => {
  if (!addressesMeta) {
    return []
  }
  return addressesMeta.map((addressMeta, index) => {
    return {
      documentImage:
        responseUploadImages && responseUploadImages[index] && responseUploadImages[index].Url
          ? responseUploadImages[index].Url
          : addressMeta.documentImage,
      year: addressMeta.year,
      month: addressMeta.month,
      documentType: addressMeta.documentType
    }
  })
}

export const checklistDetailDataFetch = function*({ data: id }) {
  yield put(checklistDetailLoading(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const [contact, idCheck] = yield all([
      call(fetchContact, { contactId: id, headers }),
      call(fetchIdentityCheck, { contactId: id, headers })
    ])
    yield put(contactReceiveData(contact))
    yield put(identityCheckReceiveData(idCheck))
  } catch (err) {
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(checklistDetailLoading(false))
  }
}

export type UpdateCheckListDetailParams = {
  data: ContactModel
}

export const updateChecklistDetail = function*({ data: { id, metadata, ...rest } }: UpdateCheckListDetailParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  const contact: ContactModel = yield select(selectCheckListDetailContact)
  try {
    const newContact = {
      ...contact,
      ...rest,
      metadata: {
        ...contact.metadata,
        ...metadata
      }
    }
    const responseUpdate = yield call(updateContact, { contactId: contact.id, headers, contact: newContact })
    if (responseUpdate) {
      yield put(checklistDetailLoading(true))
      const responseContact = yield call(fetchContact, { contactId: contact.id, headers })
      if (responseContact) {
        yield put(contactReceiveData(responseContact))
      }
      yield put(checklistDetailLoading(false))
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export type UpdateAddressHistoryParams = {
  data: ContactModel
}

export const updateAddressHistory = function*({ data: { addresses = [], metadata } }: UpdateAddressHistoryParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  const contact: ContactModel = yield select(selectCheckListDetailContact)
  try {
    const formattedAddresses: ContactAddressModel[] = addresses.map((address, index) => {
      if (index > 0) {
        return {
          ...address,
          type: 'secondary'
        }
      }
      return address
    })
    const addressesMeta = metadata && metadata.addresses
    const uploadImageFunc = mapArrAddressToUploadImageFunc({ headers, addresses: formattedAddresses, addressesMeta })
    const responseUploadImages = yield all(uploadImageFunc)
    const addressMeta = mapAddressToMetaData({ addressesMeta, responseUploadImages })
    const newContact = {
      id: contact.id,
      addresses: formattedAddresses,
      metadata: { addresses: addressMeta }
    }
    const responseUpdate = yield call(updateContact, { contactId: contact.id, contact: newContact, headers })
    if (responseUpdate) {
      yield put(checklistDetailLoading(true))
      const responseContact = yield call(fetchContact, { contactId: contact.id, headers })
      if (responseContact) {
        yield put(contactReceiveData(responseContact))
      }
      yield put(checklistDetailLoading(false))
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export type FileUploaderResponse = {
  Url: string
}

export const updateSecondaryId = function*({ data }: Action<any>) {
  yield put(checkListDetailSubmitForm(true))
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: ContactIdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const contact: ContactModel = yield select(selectCheckListDetailContact)
    const secondaryIdUrl = data.fileUrl
    let uploaderDocument: FileUploaderResponse | null = null
    if (isBase64(data.fileUrl)) {
      uploaderDocument = yield call(uploadImage, {
        headers,
        name: `${contact.id}-${data.details}`,
        imageData: data.fileUrl
      })
    }
    const currentPrimaryIdUrl = idCheck?.metadata?.primaryIdUrl
    const documents = idCheck?.documents || []
    delete data.fileUrl
    if (documents.length <= 1) {
      documents.push(data)
    }
    if (documents.length > 1) {
      documents[1] = data
    }

    const baseValues = {
      metadata: {
        primaryIdUrl: currentPrimaryIdUrl,
        secondaryIdUrl: uploaderDocument ? uploaderDocument.Url : secondaryIdUrl
      },
      documents
    } as ContactIdentityCheckModel

    if (idCheck) {
      yield call(updateIdentityCheck, {
        contactId: contact.id,
        headers,
        identityChecks: {
          ...idCheck,
          ...baseValues
        }
      })
    } else {
      yield call(createIdentityCheck, {
        headers,
        contactId: contact.id,
        identityChecks: {
          ...baseValues,
          status: 'pending',
          checkDate: dayjs()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          negotiatorId: selectUserCode(store.state)
        }
      })
    }
    yield put(checklistDetailLoading(true))
    const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
    if (responseIdentityCheck) {
      yield put(identityCheckReceiveData(responseIdentityCheck))
    }
    yield put(checklistDetailLoading(false))
  } catch (err) {
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
    }
    yield put(errorThrownServer(result))
  } finally {
    yield put(checkListDetailSubmitForm(false))
  }
}

export const updatePrimaryId = function*({ data }: Action<any>) {
  yield put(checkListDetailSubmitForm(true))
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: ContactIdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const contact: ContactModel = yield select(selectCheckListDetailContact)
    const primaryIdUrl = data.fileUrl
    let uploaderDocument: FileUploaderResponse | null = null
    if (isBase64(data.fileUrl)) {
      uploaderDocument = yield call(uploadImage, {
        headers,
        name: `${contact.id}-${data.details}`,
        imageData: data.fileUrl
      })
    }
    const currentSecondaryIdUrl = idCheck?.metadata?.secondaryIdUrl
    const documents = idCheck?.documents || []
    delete data.fileUrl
    if (documents.length === 0) {
      documents.push(data)
    }
    if (documents.length > 0) {
      documents[0] = data
    }

    const baseValues = {
      metadata: {
        // @ts-ignore
        primaryIdUrl: uploaderDocument ? uploaderDocument.Url : primaryIdUrl,
        secondaryIdUrl: currentSecondaryIdUrl
      },
      documents
    } as ContactIdentityCheckModel
    if (idCheck) {
      yield call(updateIdentityCheck, {
        contactId: contact.id,
        headers,
        identityChecks: {
          ...idCheck,
          ...baseValues
        }
      })
    } else {
      yield call(createIdentityCheck, {
        headers,
        contactId: contact.id,
        identityChecks: {
          ...baseValues,
          status: 'pending',
          checkDate: dayjs()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          negotiatorId: selectUserCode(store.state)
        }
      })
    }
    yield put(checklistDetailLoading(true))
    const responseIdentityCheck = yield call(fetchIdentityCheck, { contactId: contact.id, headers })
    if (responseIdentityCheck) {
      yield put(identityCheckReceiveData(responseIdentityCheck))
    }
    yield put(checklistDetailLoading(false))
  } catch (err) {
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
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
    const contact = yield select(selectCheckListDetailContact)
    const idCheck = yield select(selectCheckListDetailIdCheck)
    const negotiatorId: string | undefined = yield select(selectUserCode)
    let responseUpdate = null
    if (idCheck) {
      const newIdCheck = {
        ...idCheck,
        metadata: {
          ...idCheck.metadata,
          ...data
        }
      }
      responseUpdate = yield call(updateIdentityCheck, { contactId: contact.id, identityChecks: newIdCheck, headers })
    } else {
      const newIdCheck = {
        status: 'pending',
        checkDate: dayjs()
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm:ss'),
        negotiatorId: negotiatorId,
        metadata: {
          ...data
        }
      }
      responseUpdate = yield call(createIdentityCheck, { contactId: contact.id, identityChecks: newIdCheck, headers })
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
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
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
  yield takeLatest<Action<ContactIdentityDocumentModel>>(
    ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA,
    updatePrimaryId
  )
}

export const updateSecondaryIdListen = function*() {
  yield takeLatest<Action<ContactIdentityDocumentModel>>(
    ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA,
    updateSecondaryId
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
    fork(updateAgentCheckListen)
  ])
}

export default checklistDetailSagas

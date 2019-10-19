import { selectUserCode } from '@/selectors/auth'
import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import { fetcher } from '@reapit/elements'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { oc } from 'ts-optchain'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { URLS, REAPIT_API_BASE_URL, UPLOAD_FILE_BASE_URL } from '@/constants/api'
import { initAuthorizedRequestHeaders, isBase64 } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailSubmitForm,
  checklistDetailRequestData,
  checkListDetailUpdateData
} from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'
import {
  ContactModel,
  AddressModel,
  CreateIdentityDocumentModel,
  IdentityDocumentModel,
  IdentityCheckModel,
  CreateIdentityCheckModel
} from '@/types/contact-api-schema'
import { IdentificationFormValues } from '@/components/ui/forms/identification'
import { ErrorData } from '@/reducers/error'

export const checklistDetailDataFetch = function*({ data: id }) {
  yield put(checklistDetailLoading(true))

  const headers = yield call(initAuthorizedRequestHeaders)

  try {
    const contact = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })

    const identityChecks = yield call(fetcher, {
      url: `${URLS.contacts}/${id}${URLS.idChecks}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })

    const idCheck = oc(identityChecks).data[0](null)

    yield put(checklistDetailReceiveData({ contact, idCheck }))
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
  const contact: ContactModel = yield select(selectCheckListDetailContact)
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const responseUpdate = yield call(fetcher, {
      url: `${URLS.contacts}/${contact.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: { ...contact, ...rest, metadata: { ...contact.metadata, ...metadata } }
    })
    if (responseUpdate) {
      yield put(checklistDetailRequestData(contact.id as string))
    }
    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    console.error(err.message)
    yield put(checkListDetailSubmitForm(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export type UpdateAddressHistoryParams = {
  data: ContactModel
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

export const mapArrAddressToUploadImageFunc = ({ addresses, headers, addressesMeta }): Promise<any>[] => {
  if (!addresses || !addressesMeta) {
    return []
  }
  return addresses.map((address: AddressModel, index) => {
    if (!isBase64(addressesMeta[index].documentImage)) {
      return null
    }
    return uploadImage({
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

export const updateAddressHistory = function*({ data: { addresses = [], metadata } }: UpdateAddressHistoryParams) {
  const contact: ContactModel = yield select(selectCheckListDetailContact)
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const formattedAddresses: AddressModel[] = addresses.map((address, index) => {
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
    if (responseUploadImages) {
      yield put(
        checkListDetailUpdateData({
          id: contact.id,
          addresses: formattedAddresses,
          metadata: { addresses: addressMeta }
        })
      )
    }
  } catch (err) {
    console.error(err.message)
    yield put(checkListDetailSubmitForm(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

interface FileUploaderResponse {
  Url: string
}

export const updatePrimaryId = function*({ data }: Action<IdentificationFormValues>) {
  yield put(checkListDetailSubmitForm(true))

  // TODO: we just allow 1 document right now - will be replaced when updating
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const contact: ContactModel = yield select(selectCheckListDetailContact)

    let uploaderDocument: FileUploaderResponse = { Url: data.fileUrl || '' }
    if (isBase64(data.fileUrl)) {
      uploaderDocument = yield uploadImage({
        headers,
        name: `${contact.id}-${data.details}`,
        imageData: data.fileUrl
      })
    }

    const updatedDocument = {
      typeId: data.typeId,
      expiry: data.expiry,
      details: data.details,
      fileUrl: uploaderDocument.Url
    } as CreateIdentityDocumentModel

    const updatedDocuments: CreateIdentityDocumentModel[] = []
    updatedDocuments.push(updatedDocument)

    const currentMetadata = contact.metadata ? contact.metadata : undefined

    const updatedValues = {
      id: contact.id,
      metadata: {
        ...currentMetadata,
        primaryId: [
          {
            documents: updatedDocuments
          }
        ]
      }
    }

    yield put(checkListDetailUpdateData(updatedValues))
    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
    }
    yield put(checkListDetailSubmitForm(false))
    yield put(errorThrownServer(result))
  }
}

export const updateSecondaryId = function*({ data }: Action<IdentificationFormValues>) {
  yield put(checkListDetailSubmitForm(true))

  // TODO: we just allow 1 document right now - will be replaced when updating
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const contactModel: ContactModel = yield select(selectCheckListDetailContact)

    let uploaderDocument: FileUploaderResponse = { Url: data.fileUrl || '' }
    if (isBase64(data.fileUrl)) {
      uploaderDocument = yield uploadImage({
        headers,
        name: `${contactModel.id}-${data.details}`,
        imageData: data.fileUrl
      })
    }

    const updatedDocument = {
      typeId: data.typeId,
      expiry: data.expiry,
      details: data.details,
      fileUrl: uploaderDocument.Url
    } as CreateIdentityDocumentModel

    const updatedDocuments: CreateIdentityDocumentModel[] = []
    updatedDocuments.push(updatedDocument)

    const currentMetadata = contactModel.metadata ? contactModel.metadata : undefined

    const updatedValues = {
      id: contactModel.id,
      metadata: {
        ...currentMetadata,
        secondaryId: [
          {
            documents: updatedDocuments
          }
        ]
      }
    }

    yield put(checkListDetailUpdateData(updatedValues))
    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
    }
    yield put(checkListDetailSubmitForm(false))
    yield put(errorThrownServer(result))
  }
}

export const updateChecklistId = function*(data: IdentityCheckModel) {
  yield put(checkListDetailSubmitForm(true))
  console.log(data)
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const contact = yield select(selectCheckListDetailContact)

    const responseUpdate = yield call(fetcher, {
      url: `${URLS.contacts}/${contact.id}${URLS.idChecks}/${data.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: data
    })
    if (responseUpdate) {
      yield put(checklistDetailRequestData(contact.id as string))
    }
    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    console.error(err.message)
    yield put(checkListDetailSubmitForm(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const createChecklistId = function*(data: CreateIdentityCheckModel) {
  yield put(checkListDetailSubmitForm(true))
  console.log(data)
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const contact = yield select(selectCheckListDetailContact)

    const responseUpdate = yield call(fetcher, {
      url: `${URLS.contacts}/${contact.id}${URLS.idChecks}`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers: headers,
      body: data
    })
    if (responseUpdate) {
      yield put(checklistDetailRequestData(contact.id as string))
    }
    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    console.error(err.message)
    yield put(checkListDetailSubmitForm(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const updateId = function*({ data, type }: Action<IdentityDocumentModel>) {
  yield put(checkListDetailSubmitForm(true))

  try {
    const isPrimary = type === ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const negotiatorId: string | undefined = yield select(selectUserCode)
    const contactModel: ContactModel = yield select(selectCheckListDetailContact)
    const uploaderDocument: FileUploaderResponse = isBase64(data.fileUrl)
      ? yield uploadImage({
          headers,
          name: `${contactModel.id}-${data.details}`,
          imageData: data.fileUrl
        })
      : { Url: data.fileUrl || '' }

    const updatedDocument = {
      typeId: data.typeId,
      expiry: data.expiry,
      details: data.details
    } as CreateIdentityDocumentModel

    const currentPrimaryIdUrl = oc(idCheck).metadata.primaryIdUrl()
    const currentSecondaryIdUrl = oc(idCheck).metadata.secondaryIdUrl()
    const documents = oc(idCheck).documents([])

    if (isPrimary) {
      if (currentPrimaryIdUrl && currentSecondaryIdUrl) {
        documents.shift()
      }
      documents.unshift(updatedDocument)
    } else {
      if (currentPrimaryIdUrl && currentSecondaryIdUrl) {
        documents.pop()
      }
      documents.push(updatedDocument)
    }

    const baseValues = {
      metadata: {
        primaryIdUrl: isPrimary ? uploaderDocument.Url : currentPrimaryIdUrl,
        secondaryIdUrl: !isPrimary ? uploaderDocument.Url : currentSecondaryIdUrl
      },
      documents
    } as IdentityCheckModel

    if (idCheck) {
      yield call(updateChecklistId, {
        ...idCheck,
        ...baseValues
      } as IdentityCheckModel)
    } else {
      yield call(createChecklistId, {
        ...baseValues,
        status: 'pending',
        checkDate: new Date().toISOString(),
        negotiatorId: negotiatorId
      })
    }

    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
    }

    yield put(checkListDetailSubmitForm(false))
    yield put(errorThrownServer(result))
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
  yield takeLatest<Action<IdentityDocumentModel>>(ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA, updateId)
}

export const updateSecondaryIdListen = function*() {
  yield takeLatest<Action<IdentityDocumentModel>>(ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA, updateId)
}

export const checklistDetailSagas = function*() {
  yield all([
    fork(checklistDetailDataListen),
    fork(checkListDetailUpdateListen),
    fork(checkListDetailAddressUpdateListen),
    fork(updatePrimaryIdListen),
    fork(updateSecondaryIdListen)
  ])
}

export default checklistDetailSagas

import { selectCheckListDetailContact } from '@/selectors/checklist-detail'
import { fetcher, ErrorData } from '@reapit/elements'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
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
  checkListDetailUpdateData,
  pepSearchResult
} from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'
import { ContactModel, AddressModel, CreateIdentityDocumentModel } from '@/types/contact-api-schema'
import { DeclarationAndRiskModel } from '@/components/ui/modal/declaration-and-risk-assessment'
import { IdentificationFormValues } from '@/components/ui/forms/identification'

export const checklistDetailDataFetch = function*({ data: id }) {
  yield put(checklistDetailLoading(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const response = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })
    yield put(checklistDetailReceiveData({ contact: response }))
    yield put(checklistDetailLoading(false))
  } catch (err) {
    console.error(err.message)
    yield put(checklistDetailLoading(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export type UpdateCheckListDetailParams = {
  data: ContactModel
}

export const updateChecklistDetail = function*({ data: { id, ...rest } }: UpdateCheckListDetailParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const responseUpdate = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: { ...rest }
    })
    if (responseUpdate) {
      yield put(checklistDetailRequestData(id as string))
    }
    yield put(checkListDetailSubmitForm(false))
    // yield put(checkListDetailHideModal())
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

export type AddressMetaModel = {
  year?: string
  month?: string
  documentType?: string
  documentFileInput?: string
}

export const mapArrAddressToUploadImageFunc = ({ addresses, headers, addressesMeta }): Promise<any>[] => {
  if (!addresses || !addressesMeta) {
    return []
  }
  return addresses.map((address: AddressModel, index) => {
    if (!addressesMeta[index].documentFileInput) {
      return null
    }
    return uploadImage({
      headers,
      name: `${address.type}-${address.buildingNumber}-${address.buildingName}-${address.postcode}`,
      imageData: addressesMeta[index].documentFileInput
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

export const updateAddressHistory = function*({ data: { id, addresses, metadata } }: UpdateAddressHistoryParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const addressesMeta = metadata && metadata.addresses
    const uploadImageFunc = mapArrAddressToUploadImageFunc({ headers, addresses, addressesMeta })
    const responseUploadImages = yield all(uploadImageFunc)
    const addressMeta = mapAddressToMetaData({ addressesMeta, responseUploadImages })
    if (responseUploadImages) {
      yield put(checkListDetailUpdateData({ id, addresses, metadata: { addresses: addressMeta } }))
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

interface UploadFileUrl {
  Url: string
}

export const updateDeclarationAndRisk = function*({ data: { id, metadata } }: Action<ContactModel>) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const data = metadata && (metadata.declarationAndRisk as DeclarationAndRiskModel)
    let declarationForm: UploadFileUrl = { Url: '' }
    let riskAssessmentForm: UploadFileUrl = { Url: '' }

    if (data && data.declarationForm) {
      declarationForm = yield call(fetcher, {
        url: '/',
        api: UPLOAD_FILE_BASE_URL,
        method: 'POST',
        headers: headers,
        body: {
          name: 'declaration',
          imageData: data.declarationForm
        }
      })
    }

    if (data && data.riskAssessmentForm) {
      riskAssessmentForm = yield call(fetcher, {
        url: '/',
        api: UPLOAD_FILE_BASE_URL,
        method: 'POST',
        headers: headers,
        body: {
          name: 'riskAssessment',
          imageData: data.riskAssessmentForm
        }
      })
    }

    yield put(
      checkListDetailUpdateData({
        id,
        metadata: {
          declarationAndRisk: {
            ...data,
            declarationForm: declarationForm.Url,
            riskAssessmentForm: riskAssessmentForm.Url
          }
        }
      })
    )

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

// TODO: should write test for api call func
export const fetchDataPepSearch = async ({ name, headers }) => {
  try {
    console.log(name, headers)
    // TODO: Duong Pham will replace by fetch API when API ready
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve([])
      }, 1000)
    })
    return result
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export const pepSearch = function*({ data }) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const searchResults = yield fetchDataPepSearch({ name: data, headers })
    yield put(pepSearchResult({ searchParam: data, searchResults }))
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

interface FileUploaderResponse {
  Url: string
}

export const updatePrimaryId = function*({ data }: Action<IdentificationFormValues>) {
  yield put(checkListDetailSubmitForm(true))

  // TODO: we just allow 1 document right now - will be replaced when updating
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const contactModel: ContactModel = yield select(selectCheckListDetailContact)

    let uploaderDocument: FileUploaderResponse = { Url: '' }
    if (isBase64(data.fileUrl)) {
      uploaderDocument = yield call(fetcher, {
        url: '/',
        api: UPLOAD_FILE_BASE_URL,
        method: 'POST',
        headers: headers,
        body: {
          name: `${contactModel.id}-${data.details}`,
          imageData: data.fileUrl
        }
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
        primaryId: [
          {
            documents: updatedDocuments
          }
        ]
      }
    }

    yield put(checkListDetailUpdateData(updatedValues))
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

export const updateSecondaryId = function*({ data }: Action<IdentificationFormValues>) {
  yield put(checkListDetailSubmitForm(true))

  // TODO: we just allow 1 document right now - will be replaced when updating
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const contactModel: ContactModel = yield select(selectCheckListDetailContact)

    let uploaderDocument: FileUploaderResponse = { Url: '' }
    if (isBase64(data.fileUrl)) {
      uploaderDocument = yield call(fetcher, {
        url: '/',
        api: UPLOAD_FILE_BASE_URL,
        method: 'POST',
        headers: headers,
        body: {
          name: `${contactModel.id}-${data.details}`,
          imageData: data.fileUrl
        }
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

export const checklistDetailDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, checklistDetailDataFetch)
}

export const checkListDetailUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, updateChecklistDetail)
}

export const checkListDetailAddressUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA, updateAddressHistory)
}

export const checkListDetailDeclarationAndRiskUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(
    ActionTypes.CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA,
    updateDeclarationAndRisk
  )
}

export const checkListDetailPepSearchListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP, pepSearch)
}

export const updatePrimaryIdListen = function*() {
  yield takeLatest<Action<IdentificationFormValues>>(
    ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA,
    updatePrimaryId
  )
}

export const updateSecondaryIdListen = function*() {
  yield takeLatest<Action<IdentificationFormValues>>(
    ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA,
    updateSecondaryId
  )
}

export const checklistDetailSagas = function*() {
  yield all([
    fork(checklistDetailDataListen),
    fork(checkListDetailUpdateListen),
    fork(checkListDetailAddressUpdateListen),
    fork(checkListDetailDeclarationAndRiskUpdateListen),
    fork(checkListDetailPepSearchListen),
    fork(updatePrimaryIdListen),
    fork(updateSecondaryIdListen)
  ])
}

export default checklistDetailSagas

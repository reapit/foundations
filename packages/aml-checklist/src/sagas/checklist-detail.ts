import { selectCheckListDetailContact, selectCheckListDetailIdCheck } from '@/selectors/checklist-detail'
import { fetcher, ErrorData, isBase64, navigateDynamicApp, DynamicLinkParams } from '@reapit/elements'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
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
import errorMessages from '../constants/error-messages'
import { ContactModel, ContactAddressModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { selectUserCode } from '../selectors/auth'
import store from '@/core/store'
import { handlePepSearchStatus } from '@/utils/pep-search'
import dayjs from 'dayjs'
import { ID_STATUS } from '@/components/ui/modal/modal'
import { changeTimeZoneLocalForIdentityCheck, changeTimeZoneUTCForIdentityCheck } from '@/utils/datetime'

export const fetchChecklist = async ({ id, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${id}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers: headers,
    })
    return response
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export const fetchIdentityCheck = async ({ contactId, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.idChecks}?ContactId=${contactId}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers: headers,
    })
    const newResponse = {
      ...response,
      _embedded: response?._embedded.map(identityCheck => {
        return changeTimeZoneLocalForIdentityCheck(identityCheck)
      }),
    }
    return newResponse?._embedded?.[0] || null
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export const updateChecklist = async ({ contact, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contact.id}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'PATCH',
      headers: headers,
      body: contact,
    })
    return response
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export const uploadImage = async ({ name, imageData, headers }) => {
  try {
    const response = await fetcher({
      url: '/',
      api: process.env.UPLOAD_FILE_BASE_URL as string,
      method: 'POST',
      headers: headers,
      body: {
        name,
        imageData,
      },
    })
    return response
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export const updateIdentityCheck = async ({ identityChecks, headers }) => {
  try {
    const formatedIdentityChecks = changeTimeZoneUTCForIdentityCheck(identityChecks)
    const response = await fetcher({
      url: `${URLS.idChecks}/${identityChecks.id}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'PATCH',
      headers: headers,
      body: formatedIdentityChecks,
    })
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}

export const createIdentityCheck = async ({ identityChecks, headers }) => {
  try {
    const formatedIdentityChecks = changeTimeZoneUTCForIdentityCheck(identityChecks)
    const response = await fetcher({
      url: URLS.idChecks,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'POST',
      headers: headers,
      body: formatedIdentityChecks,
    })
    return response
  } catch (err) {
    console.error(err)
    return err
  }
}

export const mapArrAddressToUploadImageFunc = ({ primaryAddress, secondaryAddress, headers, addressesMeta }) => {
  if (!primaryAddress || !secondaryAddress || !addressesMeta) {
    return []
  }
  return [primaryAddress, secondaryAddress].map((address: ContactAddressModel, index) => {
    if (!isBase64(addressesMeta && addressesMeta[index] && addressesMeta[index].documentImage)) {
      return null
    }
    return uploadImage({
      headers,
      name: `${address.type}-${address.buildingNumber}-${address.buildingName}-${address.postcode}`,
      imageData: addressesMeta[index].documentImage,
    })
  })
}

export const mapAddressToMetaData = ({ addressesMeta, responseUpload }) => {
  if (!addressesMeta) {
    return []
  }
  return addressesMeta.map((addressMeta, index) => {
    return {
      documentImage:
        responseUpload && responseUpload[index] && responseUpload[index].Url
          ? responseUpload[index].Url
          : addressMeta.documentImage,
      year: addressMeta.year,
      month: addressMeta.month,
      documentType: addressMeta.documentType,
    }
  })
}

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

export type OnUpdateChecklistParams = {
  data: UpdateContactParams
}

export const onUpdateChecklist = function*({
  data: {
    nextSection,
    contact: { metadata, ...rest },
  },
}: OnUpdateChecklistParams) {
  yield put(checklistDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const currentContact = yield select(selectCheckListDetailContact)
    const newContact = { ...currentContact, ...rest, metadata: { ...currentContact.metadata, ...metadata } }
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
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
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
  try {
    const currentContact = yield select(selectCheckListDetailContact)
    const addressesMeta = metadata && metadata.addresses
    const uploadImageFunc = mapArrAddressToUploadImageFunc({ headers, primaryAddress, secondaryAddress, addressesMeta })
    const responseUpload = yield all(uploadImageFunc)
    const addressMeta = mapAddressToMetaData({ addressesMeta, responseUpload })
    const newContact = {
      ...currentContact,
      primaryAddress,
      secondaryAddress,
      metadata: {
        ...currentContact.metadata,
        addresses: addressMeta,
      },
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
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
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
    let { type, reason, declarationForm, riskAssessmentForm } = metadata?.declarationRisk || {}
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
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

// TODO: should write test for api call func
export const fetchDataPepSearch = async ({ name, headers }) => {
  console.log({ name, headers })
  try {
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
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export type FileUploaderResponse = {
  Url: string
}

export const updateSecondaryId = function*({
  data: { nextSection, identityChecks },
}: Action<UpdateIdentityCheckParams>) {
  yield put(checklistDetailSubmitForm(true))

  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const contact: ContactModel = yield select(selectCheckListDetailContact)
    const secondaryIdUrl = idCheck?.metadata?.secondaryIdUrl
    const uploaderDocument: FileUploaderResponse = isBase64(identityChecks && secondaryIdUrl)
      ? yield call(uploadImage, {
          headers,
          name: `${contact.id}-${identityChecks.details}`,
          imageData: secondaryIdUrl,
        })
      : null

    const currentPrimaryIdUrl = idCheck?.metadata?.primaryIdUrl
    const { document1, document2 } = idCheck || {}
    delete idCheck?.metadata?.secondaryIdUrl

    const baseValues = {
      metadata: {
        primaryIdUrl: currentPrimaryIdUrl,
        secondaryIdUrl: uploaderDocument ? uploaderDocument.Url : secondaryIdUrl,
      },
      document1,
      document2,
    } as IdentityCheckModel

    if (idCheck) {
      yield call(updateIdentityCheck, {
        headers,
        identityChecks: {
          ...idCheck,
          ...baseValues,
        },
      })
    } else {
      yield call(createIdentityCheck, {
        headers,
        identityChecks: {
          ...baseValues,
          contactId: contact.id,
          status: 'pending',
          checkDate: dayjs()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          negotiatorId: selectUserCode(store.state),
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
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    }
    yield put(errorThrownServer(result))
  } finally {
    yield put(checklistDetailSubmitForm(false))
  }
}

export const updatePrimaryId = function*({ data: { nextSection, identityChecks } }: Action<UpdateIdentityCheckParams>) {
  yield put(checklistDetailSubmitForm(true))

  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const idCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
    const contact: ContactModel = yield select(selectCheckListDetailContact)
    const primaryIdUrl = idCheck?.metadata?.primaryIdUrl
    const uploaderDocument: FileUploaderResponse = isBase64(identityChecks && primaryIdUrl)
      ? yield call(uploadImage, {
          headers,
          name: `${contact.id}-${identityChecks.details}`,
          imageData: primaryIdUrl,
        })
      : null

    const currentSecondaryIdUrl = idCheck?.metadata?.secondaryIdUrl
    const { document1, document2 } = idCheck || {}
    delete idCheck?.metadata?.primaryIdUrl

    const baseValues = {
      metadata: {
        primaryIdUrl: uploaderDocument ? uploaderDocument.Url : primaryIdUrl,
        secondaryIdUrl: currentSecondaryIdUrl,
      },
      document1,
      document2,
    } as IdentityCheckModel

    if (idCheck) {
      yield call(updateIdentityCheck, {
        headers,
        identityChecks: {
          ...idCheck,
          ...baseValues,
        },
      })
    } else {
      yield call(createIdentityCheck, {
        headers,
        identityChecks: {
          ...baseValues,
          contactId: contact.id,
          status: 'pending',
          checkDate: dayjs()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          negotiatorId: selectUserCode(store.state),
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
    const result: ErrorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    }
    yield put(errorThrownServer(result))
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
  const existingIdCheck: IdentityCheckModel | null = yield select(selectCheckListDetailIdCheck)
  const headers = yield call(initAuthorizedRequestHeaders)
  yield put(checklistDetailSubmitForm(true))

  if (idCheck) {
    const newIdCheck = {
      ...existingIdCheck,
      ...idCheck,
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
  yield put(checklistDetailSubmitForm(false))
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

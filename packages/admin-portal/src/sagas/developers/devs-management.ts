import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchDeveloperListSuccess,
  fetchDeveloperListFailed,
  fetchDeveloperListValues,
  fetchDeveloperMembersListSuccess,
  DisableMemberActionParams,
  fetchDeveloperMemberList,
  SetAsAdminParams,
} from '@/actions/devs-management'

import { DATE_TIME_FORMAT, notification } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString, errorMessages } from '@reapit/utils'
import dayjs from 'dayjs'
import {
  fetchDevelopersList,
  fetchOrganisationMembers,
  FetchOrganisationMembersParams,
  disableMemberApi,
  updateOrganisationMemberById,
} from '@/services/developers'

export const fetchDeveloperListHandler = function*({ data: { page, queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const name = queryParams.get('name') || ''
    const company = queryParams.get('company') || ''
    const registeredFrom = queryParams.get('registeredFrom')
    const registeredTo = queryParams.get('registeredTo')
    const formattedRegisteredFrom = registeredFrom ? dayjs(registeredFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD) : ''
    const formattedRegisteredTo = registeredTo ? dayjs(registeredTo).format(DATE_TIME_FORMAT.YYYY_MM_DD) : ''

    const response = yield call(fetchDevelopersList, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: page,
      name,
      company,
      registeredFrom: formattedRegisteredFrom,
      registeredTo: formattedRegisteredTo,
    })

    yield put(fetchDeveloperListSuccess(response))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
      placement: 'bottomRight',
    })
    yield put(fetchDeveloperListFailed(networkErrorString))
  }
}

export const organisationFetchMembers = function*({ data }: Action<FetchOrganisationMembersParams>) {
  try {
    const response = yield call(fetchOrganisationMembers, data)
    yield put(fetchDeveloperMembersListSuccess(response))
  } catch (err) {
    yield put(fetchDeveloperMembersListSuccess(err?.description))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const developerDisableMember = function*({ data }: Action<DisableMemberActionParams>) {
  try {
    yield call(disableMemberApi, data)
    data.callback(true)
    console.log(data)
    yield put(fetchDeveloperMemberList({ id: data.developerId }))
  } catch (err) {
    data.callback(false)
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const setDeloperMemberAdmin = function*({ data }: Action<SetAsAdminParams>) {
  const { callback, ...params } = data
  try {
    yield call(updateOrganisationMemberById, params)
    yield put(fetchDeveloperMemberList({ id: data.id }))
    console.log(data)
    callback && callback()
  } catch (err) {
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchDeveloperListListen = function*() {
  yield takeLatest<Action<fetchDeveloperListValues>>(ActionTypes.FETCH_DEVELOPER_LIST, fetchDeveloperListHandler)
}

export const fetchDeveloperMemberListListen = function*() {
  yield takeLatest<Action<FetchOrganisationMembersParams>>(
    ActionTypes.FETCH_DEVELOPER_MEMBER_LIST,
    organisationFetchMembers,
  )
}

export const disableDeveloperMemberListen = function*() {
  yield takeLatest<Action<DisableMemberActionParams>>(ActionTypes.DISABLE_MEMBER, developerDisableMember)
}

export const setDeloperMemberAdminListen = function*() {
  yield takeLatest<Action<SetAsAdminParams>>(ActionTypes.SET_AS_ADMIN, setDeloperMemberAdmin)
}

const devsManagementSagas = function*() {
  yield all([
    fork(fetchDeveloperListListen),
    fork(fetchDeveloperMemberListListen),
    fork(disableDeveloperMemberListen),
    fork(setDeloperMemberAdminListen),
  ])
}

export default devsManagementSagas

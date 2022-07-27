import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchDeveloperListSuccess,
  fetchDeveloperListFailed,
  FetchDeveloperListValues,
  fetchDeveloperMembersListSuccess,
  DisableMemberActionParams,
  fetchDeveloperMemberList,
  SetAsAdminParams,
} from '@/actions/devs-management'

import { DATE_TIME_FORMAT, notification } from '@reapit/elements-legacy'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString } from '@reapit/utils-common'
import dayjs from 'dayjs'
import {
  fetchDevelopersList,
  fetchOrganisationMembers,
  FetchDeveloperMembersParams,
  disableMemberApi,
  updateOrganisationMemberById,
} from '@/services/developers'

export const fetchDeveloperListHandler = function* ({ data: { page, queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const name = queryParams.get('name') || ''
    const company = queryParams.get('company') || ''
    const registeredFrom = queryParams.get('registeredFrom')
    const registeredTo = queryParams.get('registeredTo')
    const status = queryParams.get('status') || ''
    const formattedRegisteredFrom = registeredFrom ? dayjs(registeredFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD) : ''
    const formattedRegisteredTo = registeredTo ? dayjs(registeredTo).format(DATE_TIME_FORMAT.YYYY_MM_DD) : ''

    const response = yield call(fetchDevelopersList, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: page,
      name,
      company,
      registeredFrom: formattedRegisteredFrom,
      registeredTo: formattedRegisteredTo,
      status,
    })

    yield put(fetchDeveloperListSuccess(response))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
    })
    yield put(fetchDeveloperListFailed(networkErrorString))
  }
}

export const organisationFetchMembers = function* ({ data }: Action<FetchDeveloperMembersParams>) {
  try {
    const response = yield call(fetchOrganisationMembers, data)
    yield put(fetchDeveloperMembersListSuccess(response))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    notification.error({
      message: networkErrorString,
    })
  }
}

export const developerDisableMember = function* ({ data }: Action<DisableMemberActionParams>) {
  try {
    yield call(disableMemberApi, { developerId: data.developerId, memberId: data.memberId })
    data.callback(true)
    yield put(fetchDeveloperMemberList({ id: data.developerId }))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    data.callback(false)
    notification.error({
      message: networkErrorString,
    })
  }
}

export const setDeveloperMemberAdmin = function* ({ data }: Action<SetAsAdminParams>) {
  const { callback, ...params } = data
  try {
    yield call(updateOrganisationMemberById, params)
    yield put(fetchDeveloperMemberList({ id: data.id }))

    callback && callback()
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    notification.error({
      message: networkErrorString,
    })
  }
}

export const fetchDeveloperListListen = function* () {
  yield takeLatest<Action<FetchDeveloperListValues>>(ActionTypes.FETCH_DEVELOPER_LIST, fetchDeveloperListHandler)
}

export const fetchDeveloperMemberListListen = function* () {
  yield takeLatest<Action<FetchDeveloperMembersParams>>(
    ActionTypes.FETCH_DEVELOPER_MEMBER_LIST,
    organisationFetchMembers,
  )
}

export const disableDeveloperMemberListen = function* () {
  yield takeLatest<Action<DisableMemberActionParams>>(ActionTypes.DISABLE_MEMBER, developerDisableMember)
}

export const setDeveloperMemberAdminListen = function* () {
  yield takeLatest<Action<SetAsAdminParams>>(ActionTypes.SET_AS_ADMIN, setDeveloperMemberAdmin)
}

const devsManagementSagas = function* () {
  yield all([
    fork(fetchDeveloperListListen),
    fork(fetchDeveloperMemberListListen),
    fork(disableDeveloperMemberListen),
    fork(setDeveloperMemberAdminListen),
  ])
}

export default devsManagementSagas

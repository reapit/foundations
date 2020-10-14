import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchDeveloperListSuccess,
  fetchDeveloperListFailed,
  fetchDeveloperListValues,
  fetchDeveloperMembersListSuccess,
} from '@/actions/devs-management'

import { DATE_TIME_FORMAT, notification } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString, errorMessages } from '@reapit/utils'
import dayjs from 'dayjs'
import { fetchDevelopersList, fetchOrganisationMembers, FetchOrganisationMembersParams } from '@/services/developers'

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

export const fetchDeveloperListListen = function*() {
  yield takeLatest<Action<fetchDeveloperListValues>>(ActionTypes.FETCH_DEVELOPER_LIST, fetchDeveloperListHandler)
}

export const fetchDeveloperMemberListListen = function*() {
  yield takeLatest<Action<FetchOrganisationMembersParams>>(
    ActionTypes.FETCH_DEVELOPER_MEMBER_LIST,
    organisationFetchMembers,
  )
}

const devsManagementSagas = function*() {
  yield all([fork(fetchDeveloperListListen), fork(fetchDeveloperMemberListListen)])
}

export default devsManagementSagas

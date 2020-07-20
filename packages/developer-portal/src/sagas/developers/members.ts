import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import { fetchOrganisationMembers, FetchOrganisationMembers } from '@/services/developers'
import { fetchOrganisationMembersSuccess, fetchOrganisationMembersFailed } from '@/actions/developer'
import { logger } from '@reapit/utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'

export const organisationFetchMembers = function*({ data }: Action<FetchOrganisationMembers>) {
  try {
    const response = yield call(fetchOrganisationMembers, data)
    yield put(fetchOrganisationMembersSuccess(response))
  } catch (err) {
    yield put(fetchOrganisationMembersFailed())
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const organisationFetchMembersListen = function*() {
  yield takeLatest<Action<FetchOrganisationMembers>>(ActionTypes.ORGANISATION_FETCH_MEMBERS, organisationFetchMembers)
}

export const organisationMembersListSagas = function*() {
  yield all([fork(organisationFetchMembersListen)])
}

export default organisationMembersListSagas

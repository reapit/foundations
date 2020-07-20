import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import {
  fetchOrganisationMembers,
  FetchOrganisationMembers,
  inviteDeveloperAsOrgMemberApi,
  InviteDeveloperAsOrgMemberParams,
} from '@/services/developers'
import {
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
  inviteDeveloperAsOrgMemberFailed,
} from '@/actions/developers'
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
export const inviteDeveloperAsOrgMemberSagas = function*({
  data,
}: Action<InviteDeveloperAsOrgMemberParams & { callback: () => void }>) {
  try {
    const response = yield call(inviteDeveloperAsOrgMemberApi, { ...data })
    if (response) {
      // const id = 'mockID'
      // yield call(fetchOrgmembers, { id })
      console.log(response)
      data.callback()
    }
  } catch (err) {
    logger(err)
    yield put(inviteDeveloperAsOrgMemberFailed(err))
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

export const inviteDeveloperAsOrgMemberSagasListen = function*() {
  yield takeLatest(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER, inviteDeveloperAsOrgMemberSagas)
}

const membersSagas = function*() {
  yield all([fork(inviteDeveloperAsOrgMemberSagasListen), fork(organisationFetchMembersListen)])
}

export default membersSagas

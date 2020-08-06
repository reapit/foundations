import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import {
  fetchOrganisationMembers,
  FetchOrganisationMembersParams,
  inviteDeveloperAsOrgMemberApi,
  InviteDeveloperAsOrgMemberParams,
} from '@/services/developers'
import {
  fetchOrganisationMembersSuccess,
  fetchOrganisationMembersFailed,
  inviteDeveloperAsOrgMemberFailed,
  fetchOrganisationMembers as fetchOrganisationMembersAction,
  inviteDeveloperAsOrgMemberSuccess,
} from '@/actions/developers'
import ActionTypes from '@/constants/action-types'
import { getDeveloperId } from '@/utils/session'
import { notification } from '@reapit/elements'
import errorMessages from '@/constants/error-messages'

export const organisationFetchMembers = function*({ data }: Action<FetchOrganisationMembersParams>) {
  try {
    const response = yield call(fetchOrganisationMembers, data)
    yield put(fetchOrganisationMembersSuccess(response))
  } catch (err) {
    yield put(fetchOrganisationMembersFailed(err?.description))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}
export const inviteDeveloperAsOrgMemberSagas = function*({
  data,
}: Action<InviteDeveloperAsOrgMemberParams & { callback: () => void }>) {
  try {
    const response = yield call(inviteDeveloperAsOrgMemberApi, { ...data })
    if (response) {
      yield put(inviteDeveloperAsOrgMemberSuccess())
      data.callback()
      const developerId = yield call(getDeveloperId)
      yield put(fetchOrganisationMembersAction({ id: developerId }))
    }
  } catch (err) {
    data.callback()
    yield put(inviteDeveloperAsOrgMemberFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const organisationFetchMembersListen = function*() {
  yield takeLatest<Action<FetchOrganisationMembersParams>>(
    ActionTypes.ORGANISATION_FETCH_MEMBERS,
    organisationFetchMembers,
  )
}

export const inviteDeveloperAsOrgMemberSagasListen = function*() {
  yield takeLatest(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER, inviteDeveloperAsOrgMemberSagas)
}

export const membersSagas = function*() {
  yield all([fork(inviteDeveloperAsOrgMemberSagasListen), fork(organisationFetchMembersListen)])
}

export default membersSagas

import { all, fork, call, put, takeLatest, select } from 'redux-saga/effects'
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
import { errorThrownServer } from '@/actions/error'
import ActionTypes from '@/constants/action-types'
import { selectDeveloperId } from '@/selector/auth'

export const organisationFetchMembers = function*({ data }: Action<FetchOrganisationMembersParams>) {
  try {
    const response = yield call(fetchOrganisationMembers, data)
    yield put(fetchOrganisationMembersSuccess(response))
  } catch (err) {
    yield put(fetchOrganisationMembersFailed())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: err?.description,
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
      yield put(inviteDeveloperAsOrgMemberSuccess())
      data.callback()
      const developerId = yield select(selectDeveloperId)
      yield put(fetchOrganisationMembersAction({ id: developerId }))
    }
  } catch (err) {
    data.callback()
    yield put(inviteDeveloperAsOrgMemberFailed())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: err?.description,
      }),
    )
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

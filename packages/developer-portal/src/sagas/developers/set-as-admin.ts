import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import { updateOrganisationMemberById } from '@/services/developers'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { setAsAdminFailed, setAsAdminSuccess, SetAsAdminParams, fetchOrganisationMembers } from '@/actions/developers'
import { notification } from '@reapit/elements'

export const setAsAdminSaga = function* ({ data }: Action<SetAsAdminParams>) {
  const { callback, ...params } = data
  try {
    yield call(updateOrganisationMemberById, params)
    yield put(setAsAdminSuccess())
    yield put(fetchOrganisationMembers({ id: params.id }))
    callback && callback()
  } catch (err) {
    yield put(setAsAdminFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const setAsAdminListen = function* () {
  yield takeLatest<Action<SetAsAdminParams>>(ActionTypes.SET_AS_ADMIN, setAsAdminSaga)
}

export const setAsAdminSagas = function* () {
  yield all([fork(setAsAdminListen)])
}

export default setAsAdminSagas

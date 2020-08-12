import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'

import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import messages from '@/constants/messages'
import { fetchCurrentMemberSuccess } from '@/actions/current-member'
import { UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import { selectCurrentMemberData } from '@/selector/current-member'
import { notification } from '@reapit/elements'
import { fetchOrganisationMembers, updateOrganisationMemberById } from '@/services/developers'
import { getDeveloperId, getLoggedUserEmail } from '@/utils/session'

export const currentMemberFetch = function*() {
  try {
    const [developerId, currentMemberEmail] = yield all([call(getDeveloperId), call(getLoggedUserEmail)])
    if (!developerId || !currentMemberEmail) {
      throw new Error('Can not get developer ID or member email')
    }
    const response = yield call(fetchOrganisationMembers, { id: developerId, email: currentMemberEmail })
    if (response && Array.isArray(response.data)) {
      const [currentMember] = response.data
      yield put(fetchCurrentMemberSuccess(currentMember))
      return
    }
    throw new Error('Cannot fetch current member')
  } catch (error) {
    notification.error({
      message: error.message,
      placement: 'bottomRight',
    })
  }
}

export const currentMemberUpdate = function*({ data }) {
  try {
    const currentMember = yield select(selectCurrentMemberData)

    const { id: memberId, developerId, ...oldData } = currentMember
    if (!developerId || !memberId) {
      throw new Error('Can not get developer ID or member ID')
    }

    yield call(updateOrganisationMemberById, {
      id: developerId,
      memberId: memberId,
      ...oldData,
      ...data,
    })

    notification.success({
      message: messages.CHANGE_SAVE_SUCCESSFULLY,
      placement: 'bottomRight',
    })
    yield call(currentMemberFetch)
  } catch (error) {
    notification.error({
      message: error.message,
      placement: 'bottomRight',
    })
  }
}

export const currentMemberFetchListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.CURRENT_MEMBER_FETCH, currentMemberFetch)
}

export const currentMemberUpdateListen = function*() {
  yield takeLatest<Action<UpdateMemberModel>>(ActionTypes.CURRENT_MEMBER_UPDATE, currentMemberUpdate)
}

export const currentMemberSagas = function*() {
  yield all([fork(currentMemberFetchListen), fork(currentMemberUpdateListen)])
}

export default currentMemberSagas

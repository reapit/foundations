import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'

import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import messages from '@/constants/messages'
import {
  fetchCurrentMemberSuccess,
  updateCurrentMemberSuccess,
  fetchCurrentMemberFailed,
  updateCurrentMemberFailed,
} from '@/actions/current-member'
import { UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import { selectCurrentMemberData } from '@/selector/current-member'
import { notification } from '@reapit/elements'
import { fetchOrganisationMembers, updateOrganisationMemberById } from '@/services/developers'
import { getDeveloperId, getLoggedUserEmail } from '@/utils/session'

export const currentMemberFetch = function* () {
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
    yield put(fetchCurrentMemberFailed())
    notification.error({
      message: error.message,
    })
  }
}

export const currentMemberUpdate = function* ({ data }) {
  try {
    const currentMember = yield select(selectCurrentMemberData)

    const { id: memberId, developerId, ...oldData } = currentMember
    if (!developerId || !memberId) {
      throw new Error('Can not get developer ID or member ID')
    }

    const useCustomerDataUpdate = data.useCustomerData !== undefined

    yield call(updateOrganisationMemberById, {
      id: developerId,
      memberId: memberId,
      ...oldData,
      ...data,
    })
    yield put(updateCurrentMemberSuccess())
    notification.success({
      message: useCustomerDataUpdate
        ? `You have updated to use ${
            data.useCustomerData ? 'your organisation' : 'sandbox'
          } data. You will need to log out and back in again for the changes to take effect.`
        : messages.CHANGE_SAVE_SUCCESSFULLY,
    })
  } catch (error) {
    yield put(updateCurrentMemberFailed())
    notification.error({
      message: error.message,
    })
  }
}

export const currentMemberFetchListen = function* () {
  yield takeLatest<Action<void>>(ActionTypes.CURRENT_MEMBER_FETCH, currentMemberFetch)
}

export const currentMemberUpdateListen = function* () {
  yield takeLatest<Action<UpdateMemberModel>>(ActionTypes.CURRENT_MEMBER_UPDATE, currentMemberUpdate)
}

export const currentMemberSagas = function* () {
  yield all([fork(currentMemberFetchListen), fork(currentMemberUpdateListen)])
}

export default currentMemberSagas

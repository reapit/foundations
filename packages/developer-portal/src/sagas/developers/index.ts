import { all, fork } from 'redux-saga/effects'
import membersSagas from './members'
import developerDetailsListSagas from './developer-details'
import memberDetailsListSagas from './member-details'
import setAsAdminSagas from './set-as-admin'

export const developersSagas = function* () {
  yield all([fork(membersSagas), fork(developerDetailsListSagas), fork(memberDetailsListSagas), fork(setAsAdminSagas)])
}

export default developersSagas

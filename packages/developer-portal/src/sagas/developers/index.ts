import { all, fork } from 'redux-saga/effects'
import membersSagas from './members'
import developerDetailsListSagas from './developer-details'
import memberDetailsListSagas from './member-details'

export const developersSagas = function*() {
  yield all([fork(membersSagas), fork(developerDetailsListSagas), fork(memberDetailsListSagas)])
}

export default developersSagas

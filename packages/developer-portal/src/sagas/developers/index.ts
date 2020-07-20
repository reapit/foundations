import membersSagas from './members'
import { all, fork } from 'redux-saga/effects'

export const developersSagas = function*() {
  yield all([fork(membersSagas)])
}

export default developersSagas

import { all, fork } from 'redux-saga/effects'
import fetchInstallationsListSagas from './list'
import fetchInstallationsFilterListSagas from './filter-list'
import managementInstallationsSagas from './management'

export const installationsSagas = function*() {
  yield all([
    fork(fetchInstallationsListSagas),
    fork(fetchInstallationsFilterListSagas),
    fork(managementInstallationsSagas),
  ])
}

export default installationsSagas

import { all, fork } from 'redux-saga/effects'
import fetchInstallationsListSagas from './list'
import fetchInstallationsFilterListSagas from './filter-list'
import managementInstallationsSagas from './management'
import installationsSagasModule from './installations'

export const installationsSagas = function*() {
  yield all([
    fork(fetchInstallationsListSagas),
    fork(fetchInstallationsFilterListSagas),
    fork(managementInstallationsSagas),
    fork(installationsSagasModule),
  ])
}

export default installationsSagas

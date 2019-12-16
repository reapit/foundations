import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import auth from '../reducers/auth'
import client from '../reducers/client'
import installedApps from '../reducers/installed-apps'
import myApps from '../reducers/my-apps'
import developer from '../reducers/developer'
import appDetail from '../reducers/app-detail'
import error from '../reducers/error'
import submitApp from '../reducers/submit-app'
import submitRevision from '../reducers/submit-revision'
import adminApprovals from '../reducers/admin-approvals'
import adminDevManagement from '../reducers/admin-dev-management'
import developerDelete from '../reducers/developer-delete'
import revisionDetail from '../reducers/revision-detail'
import appDetailModal from '../reducers/app-detail-modal'
import appDeleteReducer from '../reducers/app-delete'
import appCategories from '../reducers/app-categories'
import settingsReducer from '../reducers/settings'
import adminApps from '../reducers/admin-apps'
import appInstallationsReducer from '../reducers/app-installations'
import { ReduxState } from '../types/core'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import authSagas from '../sagas/auth'
import clientSagas from '../sagas/client'
import appDetailSagas from '../sagas/app-detail'
import installedAppsSagas from '../sagas/installed-apps'
import myAppsSagas from '../sagas/my-apps'
import developerSagas from '../sagas/developer'
import submitAppSagas from '../sagas/submit-app'
import submitRevisionSagas from '../sagas/submit-revision'
import adminApprovalSagas from '../sagas/admin-approvals'
import adminDevManagementSagas from '../sagas/admin-dev-management'
import developerDeleteSagas from '../sagas/developer-delete'
import revisionDetailSagas from '../sagas/revision-detail'
import appDeleteSagas from '../sagas/app-delete'
import forgotPasswordSagas from '../sagas/forgot-password'
import forgotPasswordReducer from '../reducers/forgot-password'
import settingSagas from '../sagas/settings'
import adminAppsSagas from '../sagas/admin-apps'
import resetPasswordReducer from '../reducers/reset-password'
import resetPasswordSagas from '../sagas/reset-password'
import appInstallationsSagas from '../sagas/app-installations'
import noticationMessage from '../reducers/notification-message'

export class Store {
  static _instance: Store

  static get instance() {
    if (!Store._instance) {
      Store._instance = new Store()
    }

    return Store._instance
  }

  static isProd = process.env.NODE_ENV === 'production'

  static sagaMiddleware = createSagaMiddleware()

  static reducers = combineReducers({
    client,
    installedApps,
    myApps,
    developer,
    auth,
    appDetail,
    error,
    submitApp,
    submitRevision,
    adminApps,
    adminApprovals,
    adminDevManagement,
    developerDelete,
    revisionDetail,
    appDetailModal,
    appDelete: appDeleteReducer,
    appCategories,
    forgotPassword: forgotPasswordReducer,
    settings: settingsReducer,
    resetPassword: resetPasswordReducer,
    installations: appInstallationsReducer,
    noticationMessage
  })

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(clientSagas),
      fork(installedAppsSagas),
      fork(myAppsSagas),
      fork(developerSagas),
      fork(appDetailSagas),
      fork(submitAppSagas),
      fork(submitRevisionSagas),
      fork(adminApprovalSagas),
      fork(adminDevManagementSagas),
      fork(developerDeleteSagas),
      fork(revisionDetailSagas),
      fork(appDeleteSagas),
      fork(forgotPasswordSagas),
      fork(settingSagas),
      fork(adminAppsSagas),
      fork(resetPasswordSagas),
      fork(appInstallationsSagas)
    ])
  }

  static composeEnhancers =
    !Store.isProd && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  reduxStore: ReduxStore<ReduxState>

  constructor() {
    const composed = Store.composeEnhancers(applyMiddleware(Store.sagaMiddleware))

    this.reduxStore = createStore(Store.reducers, composed)

    Store.sagaMiddleware.run(Store.sagas)

    this.hotModuleReloading()
  }

  hotModuleReloading() {
    const hotModule = (module as any).hot

    if (hotModule) {
      // Enable Webpack hot module replacement for reducers
      hotModule.accept('../reducers', () => {
        this.reduxStore.replaceReducer(Store.reducers)
      })
    }
  }

  get dispatch(): Dispatch {
    return this.reduxStore.dispatch
  }

  get state(): ReduxState {
    return this.reduxStore.getState()
  }
}

export default Store.instance

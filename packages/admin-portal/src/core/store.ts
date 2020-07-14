import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import auth from '@/reducers/auth'
import appDetail from '@/reducers/app-detail'
import error from '@/reducers/error'
import approvals from '@/reducers/approvals'
import adminDevManagement from '@/reducers/admin-dev-management'
import developerSetStatus from '@/reducers/developer-set-status'
import revisionDetail from '@/reducers/revision-detail'
import appDeleteReducer from '@/reducers/app-delete'
import adminApps from '@/reducers/admin-apps'
import adminStatsReducer from '@/reducers/admin-stats'
import revisionsReducer from '@/reducers/revisions'

import authSagas from '@/sagas/auth'
import appDetailSagas from '@/sagas/app-detail'
import approvalsSagas from '@/sagas/approvals'
import adminDevManagementSagas from '@/sagas/admin-dev-management'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import revisionDetailSagas from '@/sagas/revision-detail'
import revisionsSagas from '@/sagas/revisions'
import appDeleteSagas from '@/sagas/app-delete'
import adminAppsSagas from '@/sagas/admin-apps'
import noticationMessage from '@/reducers/notification-message'
import adminStatsSaga from '@/sagas/admin-stats'
import { injectSwitchModeToWindow } from '@reapit/elements'

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

  static reducers = combineReducers<ReduxState>({
    auth,
    appDetail,
    error,
    adminApps,
    approvals,
    adminDevManagement,
    developerSetStatus,
    revisionDetail,
    revisions: revisionsReducer,
    appDelete: appDeleteReducer,
    noticationMessage,
    adminStats: adminStatsReducer,
  })

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(appDetailSagas),
      fork(approvalsSagas),
      fork(adminDevManagementSagas),
      fork(developerSetStatusSagas),
      fork(revisionDetailSagas),
      fork(revisionsSagas),
      fork(appDeleteSagas),
      fork(adminAppsSagas),
      fork(adminStatsSaga),
    ])
  }

  static composeEnhancers =
    !Store.isProd && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  reduxStore: ReduxStore<ReduxState>

  constructor() {
    injectSwitchModeToWindow()
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

if (window.Cypress) {
  window.store = Store.instance.reduxStore
}

export default Store.instance

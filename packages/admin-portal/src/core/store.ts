import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import apps from '@/reducers/apps'
import error from '@/reducers/error'
import developers from '@/reducers/developers'

import { appDetailSagas, revisionDetailSagas, appDeleteSagas, appsManagementSagas } from '@/sagas/apps'
import { statisticsSagas } from '@/sagas/statistics'
import { approvalsSagas } from '@/sagas/approvals'
import { devsManagementSagas, developerSetStatusSagas } from '@/sagas/developers'

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
    error,
    developers,
    // TODOME(notiActions)
    // Delete
    apps,
  })

  static sagas = function*() {
    yield all([
      fork(appDetailSagas),
      fork(approvalsSagas),
      fork(devsManagementSagas),
      fork(developerSetStatusSagas),
      fork(revisionDetailSagas),
      fork(appDeleteSagas),
      fork(appsManagementSagas),
      fork(statisticsSagas),
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

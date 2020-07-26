import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import client from '@/reducers/client'
import installedApps from '@/reducers/installed-apps'
import myApps from '@/reducers/my-apps'
import appDetail from '@/reducers/app-detail'
import error from '@/reducers/error'
import appCategories from '@/reducers/app-categories'
import appInstallationsReducer from '@/reducers/app-installations'
import integrationTypes from '@/reducers/app-integration-types'

import appsSaga from '@/sagas/apps/apps'
import clientSagas from '@/sagas/client'
import appDetailSagas from '@/sagas/app-detail'
import installedAppsSagas from '@/sagas/installed-apps'
import myAppsSagas from '@/sagas/my-apps'
import appInstallationsSagas from '@/sagas/app-installations'
import noticationMessage from '@/reducers/notification-message'
import { injectSwitchModeToWindow } from '@reapit/elements'
import webComponentSagas from '../sagas/web-component'

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
    client,
    installedApps,
    myApps,
    appDetail,
    error,
    appCategories,
    installations: appInstallationsReducer,
    noticationMessage,
    desktopIntegrationTypes: integrationTypes,
  })

  static sagas = function*() {
    yield all([
      fork(appsSaga),
      fork(clientSagas),
      fork(installedAppsSagas),
      fork(myAppsSagas),
      fork(appDetailSagas),
      fork(appInstallationsSagas),
      fork(webComponentSagas),
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

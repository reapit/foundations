import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { injectSwitchModeToWindow } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import client from '@/reducers/client'
import installedApps from '@/reducers/installed-apps'
import myApps from '@/reducers/my-apps'
import error from '@/reducers/error'
import categories from '@/reducers/categories'
import appInstallationsReducer from '@/reducers/app-installations'
import desktopIntegrationTypes from '@/reducers/desktop-integration-types'
import noticationMessage from '@/reducers/notification-message'

import appsSaga from '@/sagas/apps/apps'
import { clientSagas, installedAppsSagas, myAppsSagas } from '@/sagas/apps'
import { appInstallationsSagas } from '@/sagas/installations'
import { webComponentSagas } from '@/sagas/web-component'
import { desktopIntegrationTypesSagas } from '@/sagas/desktop-integration-types'
import { categoriesSagas } from '@/sagas/categories'

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
    error,
    categories,
    installations: appInstallationsReducer,
    noticationMessage,
    desktopIntegrationTypes: desktopIntegrationTypes,
  })

  static sagas = function*() {
    yield all([
      fork(appsSaga),
      fork(clientSagas),
      fork(installedAppsSagas),
      fork(myAppsSagas),
      fork(appInstallationsSagas),
      fork(webComponentSagas),
      fork(desktopIntegrationTypesSagas),
      fork(categoriesSagas),
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

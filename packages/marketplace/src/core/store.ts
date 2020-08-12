import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { injectSwitchModeToWindow } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import apps from '@/reducers/apps'
import negotiators from '@/reducers/negotiators'
import webComponent from '@/reducers/web-component'
import categories from '@/reducers/categories'
import installations from '@/reducers/installations'
import desktopIntegrationTypes from '@/reducers/desktop-integration-types'
import { settingReducer } from '@/reducers/settings'

import { installationsSagas } from '@/sagas/installations'
import { webComponentSagas } from '@/sagas/web-component'
import { desktopIntegrationTypesSagas } from '@/sagas/desktop-integration-types'
import { categoriesSagas } from '@/sagas/categories'
import { appsSagas } from '@/sagas/apps'
import { negotiatorsSagas } from '@/sagas/negotiators'
import { settingsSagas } from '@/sagas/settings'

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
    apps,
    installations,
    webComponent,
    negotiators,
    categories,
    desktopIntegrationTypes,
    settings: settingReducer,
  })

  static sagas = function*() {
    yield all([
      fork(appsSagas),
      fork(installationsSagas),
      fork(webComponentSagas),
      fork(negotiatorsSagas),
      fork(categoriesSagas),
      fork(desktopIntegrationTypesSagas),
      fork(settingsSagas),
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

import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import apps from '@/reducers/apps'
import developers from '@/reducers/developers'
import subscriptions from '@/reducers/subscriptions'
import customers from '@/reducers/customers'

import { appDetailSagas, revisionDetailSagas } from '@/sagas/apps'
import { approvalsSagas } from '@/sagas/approvals'
import { devsManagementSagas, developerSetStatusSagas } from '@/sagas/developers'
import { customersListSagas } from '@/sagas/customers'
import subscriptionsListSagas from '@/sagas/subscriptions'

import { injectSwitchModeToWindow } from '@reapit/elements-legacy'

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
    developers,
    apps,
    customers,
    subscriptions,
  })

  static sagas = function* () {
    yield all([
      fork(appDetailSagas),
      fork(approvalsSagas),
      fork(devsManagementSagas),
      fork(developerSetStatusSagas),
      fork(revisionDetailSagas),
      fork(customersListSagas),
      fork(subscriptionsListSagas),
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

import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import success from '@/reducers/success'
import auth from '@/reducers/auth'
import error from '@/reducers/error'
import results from '@/reducers/results'
import checklistDetail from '@/reducers/checklist-detail'
import identityTypes from '@/reducers/identity-types'

import { ReduxState } from '@/types/core'
import authSagas from '@/sagas/auth'
import successSagas from '@/sagas/success'
import identityTypesSagas from '@/sagas/identity-types'
import resultsSagas from '@/sagas/results'
import checklistDetailSagas from '@/sagas/checklist-detail'

import submitChecks from '../reducers/submit-checks'
import createSagaMiddleware from 'redux-saga'
import submitChecksSagas from '../sagas/submit-checks'
import { all, fork } from '@redux-saga/core/effects'
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

  static reducers = combineReducers({
    error,
    success,
    auth,
    results,
    submitChecks,
    checklistDetail,
    identityTypes,
  })

  static sagas = function*() {
    yield all([
      fork(resultsSagas),
      fork(authSagas),
      fork(successSagas),
      fork(submitChecksSagas),
      fork(checklistDetailSagas),
      fork(identityTypesSagas),
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
        this.reduxStore.replaceReducer(Store.reducers as any)
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

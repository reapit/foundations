import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import { ReduxState } from '../types/core'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from '@redux-saga/core/effects'

import home from '@/reducers/home'
import auth from '@/reducers/auth'
import checklistDetail from '@/reducers/checklist-detail'
import error from '@/reducers/error'
import result from '@/reducers/result'
import identityTypes from '@/reducers/identity-types'

import resultSagas from '@/sagas/result'
import homeSagas from '@/sagas/home'
import authSagas from '@/sagas/auth'
import checklistDetailSagas from '@/sagas/checklist-detail'
import identityTypesSagas from '@/sagas/identity-types'

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
    auth,
    error,
    home,
    result,
    checklistDetail,
    identityTypes
  })

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(homeSagas),
      fork(checklistDetailSagas),
      fork(resultSagas),
      fork(identityTypesSagas)
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

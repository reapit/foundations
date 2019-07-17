import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import auth from '../reducers/auth'
import client from '../reducers/client'
import myApps from '../reducers/my-apps'
import developer from '../reducers/developer'
import appDetail from '../reducers/app-detail'
import error from '../reducers/error'
import admin from '../reducers/admin'
import { ReduxState } from '../types/core'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import authSagas from '../sagas/auth'
import clientSagas from '../sagas/client'
import appDetailSagas from '../sagas/app-detail'
import myAppsSagas from '../sagas/my-apps'
import developerSagas from '../sagas/developer'
import adminSagas from '../sagas/admin'

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
    myApps,
    developer,
    auth,
    appDetail,
    error,
    admin
  })

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(clientSagas),
      fork(myAppsSagas),
      fork(developerSagas),
      fork(appDetailSagas),
      fork(adminSagas)
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

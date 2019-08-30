import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import * as localForage from 'localforage'
import home from '../reducers/home'
import appointments from '../reducers/appointments'
import error from '../reducers/error'
import currentLoc from '../reducers/current-loc'

import { ReduxState } from '../types/core'
import createSagaMiddleware from 'redux-saga'
import homeSagas from '../sagas/home'
import appointmentsSagas from '../sagas/appointments'
import { all, fork } from '@redux-saga/core/effects'

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
    home,
    currentLoc,
    appointments
  })

  static sagas = function*() {
    yield all([fork(homeSagas), fork(appointmentsSagas)])
  }

  static composeEnhancers =
    !Store.isProd && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  reduxStore: ReduxStore<ReduxState>

  persistor: Persistor

  constructor() {
    const composed = Store.composeEnhancers(applyMiddleware(Store.sagaMiddleware))

    const persistConfig = {
      key: 'root',
      storage: localForage
    }

    const persistedReducer = persistReducer(persistConfig, Store.reducers)
    this.reduxStore = createStore(persistedReducer, composed)

    Store.sagaMiddleware.run(Store.sagas)
    this.persistor = persistStore(this.reduxStore)

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

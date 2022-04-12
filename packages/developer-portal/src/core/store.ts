import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import error from '@/reducers/error'
import developerSetStatus from '@/reducers/developer-set-status'
import developersReducer from '@/reducers/developers'
import noticationMessage from '@/reducers/notification-message'
import { currentMemberReducer } from '@/reducers/current-member'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
import developersSagas from '@/sagas/developers'
import { currentMemberSagas } from '@/sagas/current-member'

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
    developerSetStatus,
    noticationMessage,
    developers: developersReducer,
    currentMember: currentMemberReducer,
  })

  static sagas = function* () {
    yield all([fork(developerSetStatusSagas), fork(developersSagas), fork(currentMemberSagas)])
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

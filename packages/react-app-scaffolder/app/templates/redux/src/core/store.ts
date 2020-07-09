import { injectSwitchModeToWindow } from '@reapit/elements'
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Store as ReduxStore,
  Dispatch,
  Reducer,
  CombinedState,
  AnyAction,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from '@redux-saga/core/effects'
import authenticated from '../reducers/authenticated'
import error from '../reducers/error'
import auth from '@/reducers/auth'
import { ReduxState, Action } from '../types/core'
import authenticatedSagas from '../sagas/authenticated'
import authSagas from '@/sagas/auth'

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
    authenticated,
    auth,
  }) as Reducer<CombinedState<ReduxState>, Action<any> | AnyAction>

  static sagas = function*() {
    yield all([fork(authenticatedSagas), fork(authSagas)])
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

export default Store.instance

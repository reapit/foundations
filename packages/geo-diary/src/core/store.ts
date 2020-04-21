import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Store as ReduxStore,
  Dispatch,
  AnyAction,
  CombinedState,
  Reducer,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ReduxState, Action } from '@/types/core'
import { all, fork } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'

import home from '@/reducers/home'
import appointments from '@/reducers/appointments'
import appointmentDetail from '@/reducers/appointment-detail'
import nextAppointment from '@/reducers/next-appointment'
import error from '@/reducers/error'
import direction from '@/reducers/direction'
import auth from '@/reducers/auth'
import online from '@/reducers/online'

import authSagas from '@/sagas/auth'
import homeSagas from '@/sagas/home'
import appointmentsSagas from '@/sagas/appointments'
import appointmentDetailSagas from '@/sagas/appointment-detail'
import nextAppointmentSaga from '@/sagas/next-appointment'
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
    online,
    auth,
    error,
    home,
    direction,
    appointments,
    appointmentDetail,
    nextAppointment,
  }) as Reducer<CombinedState<ReduxState>, Action<any> | AnyAction>

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(homeSagas),
      fork(appointmentsSagas),
      fork(appointmentDetailSagas),
      fork(nextAppointmentSaga),
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

    // online/offline listeners
    window.addEventListener('online', () => this.dispatch({ type: ActionTypes.ONLINE }))
    window.addEventListener('offline', () => this.dispatch({ type: ActionTypes.OFFLINE }))
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

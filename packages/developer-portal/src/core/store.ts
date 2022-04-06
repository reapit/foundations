import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'

import developer from '@/reducers/developer'
import error from '@/reducers/error'
import developerSetStatus from '@/reducers/developer-set-status'
import settingsReducer from '@/reducers/settings'
import developerSubscriptions from '@/reducers/developer-subscriptions'
import developersReducer from '@/reducers/developers'
import installationsReducer from '@/reducers/installations'
import webhooksTopicsReducer from '@/reducers/webhooks-topics'
import webhooksSubscriptionsReducer from '@/reducers/webhooks-subscriptions'
import noticationMessage from '@/reducers/notification-message'
import { currentMemberReducer } from '@/reducers/current-member'
import developerSagas from '@/sagas/developer'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import settingSagas from '@/sagas/settings'
import { webhooksSubscriptionsSagas, webhooksEditSubscription } from '@/sagas/webhooks-subscriptions'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
import developerSubscriptionsSagas from '@/sagas/developer-subscriptions'
import developersSagas from '@/sagas/developers'
import installationsSagas from '@/sagas/installations'
import { webhooksTopicsSagas } from '@/sagas/webhooks-topics'
import { currentMemberSagas } from '@/sagas/current-member'
import webhookLogsReducer from '../reducers/webhook-logs'
import { webhookLogsSagas } from '../sagas/webhook-logs'

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
    developer,
    error,
    developerSetStatus,
    settings: settingsReducer,
    noticationMessage,
    developerSubscriptions,
    developers: developersReducer,
    installations: installationsReducer,
    webhooksTopics: webhooksTopicsReducer,
    webhooksSubscriptions: webhooksSubscriptionsReducer,
    webhookLogs: webhookLogsReducer,
    currentMember: currentMemberReducer,
  })

  static sagas = function* () {
    yield all([
      fork(developerSagas),
      fork(developerSetStatusSagas),
      fork(settingSagas),
      fork(webhooksEditSubscription),
      fork(developerSubscriptionsSagas),
      fork(developersSagas),
      fork(installationsSagas),
      fork(webhooksTopicsSagas),
      fork(webhooksSubscriptionsSagas),
      fork(webhookLogsSagas),
      fork(currentMemberSagas),
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

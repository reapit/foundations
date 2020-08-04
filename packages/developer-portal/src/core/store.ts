import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import appsReducer from '@/reducers/apps'
import scopesReducer from '@/reducers/scopes'
import categoriesReducer from '@/reducers/categories'
import desktopIntegrationTypesReducer from '@/reducers/desktop-integration-types'

import developer from '@/reducers/developer'
import error from '@/reducers/error'
import developerSetStatus from '@/reducers/developer-set-status'
import settingsReducer from '@/reducers/settings'
import appInstallationsReducer from '@/reducers/app-installations'
import appUsageStatsReducer from '@/reducers/app-usage-stats'
import appHttpTrafficEventReducer from '@/reducers/app-http-traffic-event'
import developerSubscriptions from '@/reducers/developer-subscriptions'
import developersReducer from '@/reducers/developers'
import webhooksTopicsReducer from '@/reducers/webhooks-topics'
import webhooksSubscriptionsReducer from '@/reducers/webhooks-subscriptions'
import noticationMessage from '@/reducers/notification-message'

import {
  appDetailSagas,
  appListSagas,
  appAuthenticationSagas,
  createAppSagas,
  deleteAppSagas,
  appRevisionDetailSagas,
  appRevisionListlSagas,
  declineAppRevisionSagas,
  createAppRevisionSagas,
} from '@/sagas/apps'
import { scopeListSagas } from '@/sagas/scopes'
import { categoryListSagas } from '@/sagas/categories'
import { desktopIntegrationTypeListSagas } from '@/sagas/desktop-integration-types'
import appUsageStatsSagas from '@/sagas/app-usage-stats'
import appHttpTrafficEventSagas from '@/sagas/app-http-trafic-event'
import developerSagas from '@/sagas/developer'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import settingSagas from '@/sagas/settings'
import appInstallationsSagas from '@/sagas/app-installations'
import { webhooksSubscriptionsSagas, webhooksEditSubscription } from '@/sagas/webhooks-subscriptions'
import { injectSwitchModeToWindow } from '@reapit/elements'
import developerSubscriptionsSagas from '@/sagas/developer-subscriptions'
import developersSagas from '@/sagas/developers'
import { webhooksTopicsSagas } from '@/sagas/webhooks-topics'

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
    apps: appsReducer,
    scopes: scopesReducer,
    categories: categoriesReducer,
    desktopIntegrationTypes: desktopIntegrationTypesReducer,
    developer,
    error,
    developerSetStatus,
    settings: settingsReducer,
    installations: appInstallationsReducer,
    appUsageStats: appUsageStatsReducer,
    noticationMessage,
    appHttpTraffic: appHttpTrafficEventReducer,
    developerSubscriptions,
    developers: developersReducer,
    webhooksTopics: webhooksTopicsReducer,
    webhooksSubscriptions: webhooksSubscriptionsReducer,
  })

  static sagas = function*() {
    yield all([
      fork(appUsageStatsSagas),
      fork(developerSagas),
      fork(appDetailSagas),
      fork(appListSagas),
      fork(scopeListSagas),
      fork(categoryListSagas),
      fork(desktopIntegrationTypeListSagas),
      fork(appAuthenticationSagas),
      fork(createAppSagas),
      fork(deleteAppSagas),
      fork(appRevisionDetailSagas),
      fork(appRevisionListlSagas),
      fork(declineAppRevisionSagas),
      fork(createAppRevisionSagas),
      fork(developerSetStatusSagas),
      fork(settingSagas),
      fork(appInstallationsSagas),
      fork(appHttpTrafficEventSagas),
      fork(webhooksEditSubscription),
      fork(developerSubscriptionsSagas),
      fork(developersSagas),
      fork(webhooksTopicsSagas),
      fork(webhooksSubscriptionsSagas),
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

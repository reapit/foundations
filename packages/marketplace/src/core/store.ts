import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import auth from '@/reducers/auth'
import client from '@/reducers/client'
import installedApps from '@/reducers/installed-apps'
import myApps from '@/reducers/my-apps'
import developer from '@/reducers/developer'
import appDetail from '@/reducers/app-detail'
import error from '@/reducers/error'
import submitRevision from '@/reducers/submit-revision'
import developerSetStatus from '@/reducers/developer-set-status'
import appDetailModal from '@/reducers/app-detail-modal'
import appDeleteReducer from '@/reducers/app-delete'
import appCategories from '@/reducers/app-categories'
import settingsReducer from '@/reducers/settings'
import appInstallationsReducer from '@/reducers/app-installations'
import appUsageStatsReducer from '@/reducers/app-usage-stats'
import revisionsReducer from '@/reducers/revisions'
import appHttpTrafficEventReducer from '@/reducers/app-http-traffic-event'
import integrationTypes from '@/reducers/app-integration-types'
import webhookEditReducer from '../reducers/webhook-edit-modal'
import webhookSubscriptions from '@/reducers/webhook-subscriptions'
import developerSubscriptions from '@/reducers/developer-subscriptions'

import authSagas from '@/sagas/auth'
import appsSaga from '@/sagas/apps/apps'
import clientSagas from '@/sagas/client'
import appDetailSagas from '@/sagas/app-detail'
import installedAppsSagas from '@/sagas/installed-apps'
import appUsageStatsSagas from '@/sagas/app-usage-stats'
import appHttpTrafficEventSagas from '@/sagas/app-http-trafic-event'
import myAppsSagas from '@/sagas/my-apps'
import developerSagas from '@/sagas/developer'
import submitRevisionSagas from '@/sagas/submit-revision'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import revisionsSagas from '@/sagas/revisions'
import settingSagas from '@/sagas/settings'
import appInstallationsSagas from '@/sagas/app-installations'
import noticationMessage from '@/reducers/notification-message'
import webhookSubscriptionsSagas from '@/sagas/webhook-subscriptions'
import { injectSwitchModeToWindow } from '@reapit/elements'
import webhookEditSagas from '../sagas/webhook-edit-modal'
import webComponentSagas from '../sagas/web-component'
import developerSubscriptionsSagas from '../sagas/developer-subscriptions'

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
    client,
    installedApps,
    myApps,
    developer,
    auth,
    appDetail,
    error,
    submitRevision,
    developerSetStatus,
    revisions: revisionsReducer,
    appDetailModal,
    appDelete: appDeleteReducer,
    appCategories,
    settings: settingsReducer,
    installations: appInstallationsReducer,
    appUsageStats: appUsageStatsReducer,
    noticationMessage,
    appHttpTraffic: appHttpTrafficEventReducer,
    desktopIntegrationTypes: integrationTypes,
    webhookEdit: webhookEditReducer,
    webhooks: webhookSubscriptions,
    developerSubscriptions,
  })

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(appsSaga),
      fork(clientSagas),
      fork(installedAppsSagas),
      fork(appUsageStatsSagas),
      fork(myAppsSagas),
      fork(developerSagas),
      fork(appDetailSagas),
      fork(submitRevisionSagas),
      fork(developerSetStatusSagas),
      fork(revisionsSagas),
      fork(settingSagas),
      fork(appInstallationsSagas),
      fork(appHttpTrafficEventSagas),
      fork(webhookEditSagas),
      fork(webhookSubscriptionsSagas),
      fork(webComponentSagas),
      fork(developerSubscriptionsSagas),
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

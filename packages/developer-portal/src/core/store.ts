import { createStore, applyMiddleware, compose, combineReducers, Store as ReduxStore, Dispatch } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork, all } from '@redux-saga/core/effects'
import { ReduxState } from '../types/core'
import auth from '@/reducers/auth'
import developer from '@/reducers/developer'
import appDetail from '@/reducers/app-detail'
import error from '@/reducers/error'
import submitApp from '@/reducers/submit-app'
import submitRevision from '@/reducers/submit-revision'
import developerSetStatus from '@/reducers/developer-set-status'
import revisionDetail from '@/reducers/revision-detail'
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
import developersReducer from '@/reducers/developers'

import authSagas from '@/sagas/auth'
import appsSaga from '@/sagas/apps/apps'
import appDetailSagas from '@/sagas/app-detail'
import appUsageStatsSagas from '@/sagas/app-usage-stats'
import appHttpTrafficEventSagas from '@/sagas/app-http-trafic-event'
import developerSagas from '@/sagas/developer'
import submitAppSagas from '@/sagas/submit-app'
import submitRevisionSagas from '@/sagas/submit-revision'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import revisionDetailSagas from '@/sagas/revision-detail'
import revisionsSagas from '@/sagas/revisions'
import appDeleteSagas from '@/sagas/app-delete'
import settingSagas from '@/sagas/settings'
import appInstallationsSagas from '@/sagas/app-installations'
import noticationMessage from '@/reducers/notification-message'
import webhookSubscriptionsSagas from '@/sagas/webhook-subscriptions'
import { injectSwitchModeToWindow } from '@reapit/elements'
import webhookEditSagas from '../sagas/webhook-edit-modal'
import developerSubscriptionsSagas from '../sagas/developer-subscriptions'
import developersSagas from '@/sagas/developers'

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
    auth,
    appDetail,
    error,
    submitApp,
    submitRevision,
    developerSetStatus,
    revisionDetail,
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
    developers: developersReducer,
  })

  static sagas = function*() {
    yield all([
      fork(authSagas),
      fork(appsSaga),
      fork(appUsageStatsSagas),
      fork(developerSagas),
      fork(appDetailSagas),
      fork(submitAppSagas),
      fork(submitRevisionSagas),
      fork(developerSetStatusSagas),
      fork(revisionDetailSagas),
      fork(revisionsSagas),
      fork(appDeleteSagas),
      fork(settingSagas),
      fork(appInstallationsSagas),
      fork(appHttpTrafficEventSagas),
      fork(webhookEditSagas),
      fork(webhookSubscriptionsSagas),
      fork(developerSubscriptionsSagas),
      fork(developersSagas),
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

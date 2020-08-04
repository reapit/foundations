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
import submitRevision from '@/reducers/submit-revision'
import developerSetStatus from '@/reducers/developer-set-status'
import revisionDetail from '@/reducers/revision-detail'
import appDetailModal from '@/reducers/app-detail-modal'
import settingsReducer from '@/reducers/settings'
import appUsageStatsReducer from '@/reducers/app-usage-stats'
import revisionsReducer from '@/reducers/revisions'
import appHttpTrafficEventReducer from '@/reducers/app-http-traffic-event'
import webhookEditReducer from '../reducers/webhook-edit-modal'
import developerSubscriptions from '@/reducers/developer-subscriptions'
import developersReducer from '@/reducers/developers'
import installationsReducer from '@/reducers/installations'
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
} from '@/sagas/apps'
import { scopeListSagas } from '@/sagas/scopes'
import { categoryListSagas } from '@/sagas/categories'
import { desktopIntegrationTypeListSagas } from '@/sagas/desktop-integration-types'
import appUsageStatsSagas from '@/sagas/app-usage-stats'
import appHttpTrafficEventSagas from '@/sagas/app-http-trafic-event'
import developerSagas from '@/sagas/developer'
import submitRevisionSagas from '@/sagas/submit-revision'
import developerSetStatusSagas from '@/sagas/developer-set-status'
import revisionDetailSagas from '@/sagas/revision-detail'
import revisionsSagas from '@/sagas/revisions'
import settingSagas from '@/sagas/settings'
import { webhooksSubscriptionsSagas } from '@/sagas/webhooks-subscriptions'
import { injectSwitchModeToWindow } from '@reapit/elements'
import webhookEditSagas from '@/sagas/webhook-edit-modal'
import developerSubscriptionsSagas from '@/sagas/developer-subscriptions'
import developersSagas from '@/sagas/developers'
import installationsSagas from '@/sagas/installations'
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
    submitRevision,
    developerSetStatus,
    revisionDetail,
    revisions: revisionsReducer,
    appDetailModal,
    settings: settingsReducer,
    appUsageStats: appUsageStatsReducer,
    noticationMessage,
    appHttpTraffic: appHttpTrafficEventReducer,
    webhookEdit: webhookEditReducer,
    developerSubscriptions,
    developers: developersReducer,
    installations: installationsReducer,
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
      fork(submitRevisionSagas),
      fork(developerSetStatusSagas),
      fork(revisionDetailSagas),
      fork(revisionsSagas),
      fork(settingSagas),
      fork(appHttpTrafficEventSagas),
      fork(webhookEditSagas),
      fork(developerSubscriptionsSagas),
      fork(developersSagas),
      fork(installationsSagas),
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

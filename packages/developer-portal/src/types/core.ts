import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { DeveloperState } from '../reducers/developer'
import { ErrorState } from '../reducers/error'
import { SettingsState } from '@/reducers/settings'
import { AppInstallationsState } from '@/reducers/app-installations'
import { NotificationMessageState } from '@/reducers/notification-message'
import { AppHttpTrafficEventState } from '@/reducers/app-http-traffic-event'
import { DeveloperSubscriptionsState } from '@/reducers/developer-subscriptions'
import { DevelopersRootState } from '@/reducers/developers'
import { AppsRootState } from '@/reducers/apps'
import { ScopesRootState } from '@/reducers/scopes'
import { CategoriesRootState } from '@/reducers/categories'
import { DesktopIntegrationTypesRootState } from '@/reducers/desktop-integration-types'
import { WebhooksTopicsRootState } from '@/reducers/webhooks-topics'
import { WebhooksSubscriptionsRootState } from '@/reducers/webhooks-subscriptions'

export type ModalProps = { visible: boolean; afterClose: () => void }

export interface Action<T> {
  readonly type: ActionType
  readonly data: T
}

export interface RequestState {
  formState: FormState
}

export interface ActionCreator<T> {
  readonly type: string
  (data: T): Action<T>
}

export interface StringMap {
  [key: string]: string
}

export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export type RouteValue = keyof typeof Routes

export type ActionType = keyof typeof ActionTypes

export type FormState = 'PENDING' | 'DONE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  api: string
  url: string
  headers: StringMap
  isPrivate?: boolean
  body?: T
}

export interface ReduxState {
  apps: AppsRootState
  scopes: ScopesRootState
  categories: CategoriesRootState
  developer: DeveloperState
  error: ErrorState
  developerSetStatus: RequestState
  settings: SettingsState
  installations: AppInstallationsState
  noticationMessage: NotificationMessageState
  appHttpTraffic: AppHttpTrafficEventState
  desktopIntegrationTypes: DesktopIntegrationTypesRootState
  developerSubscriptions: DeveloperSubscriptionsState
  developers: DevelopersRootState
  webhooksTopics: WebhooksTopicsRootState
  webhooksSubscriptions: WebhooksSubscriptionsRootState
}

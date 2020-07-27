import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { DeveloperState } from '../reducers/developer'
import { AuthState } from '../reducers/auth'
import { ErrorState } from '../reducers/error'
import { SubmitAppState } from '../reducers/submit-app'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { RevisionsState } from '@/reducers/revisions'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { AppCategoriesState } from '@/reducers/app-categories'
import { SettingsState } from '@/reducers/settings'
import { AppInstallationsState } from '@/reducers/app-installations'
import { AppUsageStatsState } from '@/reducers/app-usage-stats'
import { NotificationMessageState } from '@/reducers/notification-message'
import { AppHttpTrafficEventState } from '@/reducers/app-http-traffic-event'
import { IntegrationTypeState } from '@/reducers/app-integration-types'
import { WebhookEditState } from '@/reducers/webhook-edit-modal'
import { WebhookState } from '@/reducers/webhook-subscriptions'
import { DeveloperSubscriptionsState } from '@/reducers/developer-subscriptions'
import { DevelopersRootState } from '@/reducers/developers'
import { AppAuthenticationState } from '@/reducers/app-authentication'
import { AppsRootState } from '@/reducers/apps'

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
  appAuthentication: AppAuthenticationState
  developer: DeveloperState
  auth: AuthState
  error: ErrorState
  submitApp: SubmitAppState
  submitRevision: SubmitRevisionState
  developerSetStatus: RequestState
  revisionDetail: RevisionDetailState
  revisions: RevisionsState
  appDetailModal: AppDetailModalState
  appDelete: RequestState
  appCategories: AppCategoriesState
  settings: SettingsState
  installations: AppInstallationsState
  appUsageStats: AppUsageStatsState
  noticationMessage: NotificationMessageState
  appHttpTraffic: AppHttpTrafficEventState
  desktopIntegrationTypes: IntegrationTypeState
  webhookEdit: WebhookEditState
  webhooks: WebhookState
  developerSubscriptions: DeveloperSubscriptionsState
  developers: DevelopersRootState
}

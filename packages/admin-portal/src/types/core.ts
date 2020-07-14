import { AdminDevManamgenetState } from './../reducers/admin-dev-management'
import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { AuthState } from '../reducers/auth'
import { AppDetailState } from '../reducers/app-detail'
import { ErrorState } from '../reducers/error'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { RevisionsState } from '@/reducers/revisions'
import { AdminAppsState } from '@/reducers/admin-apps'
import { NotificationMessageState } from '@/reducers/notification-message'
import { AdminStatsState } from '@/reducers/admin-stats'

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
  appDetail: AppDetailState
  auth: AuthState
  error: ErrorState
  adminApps: AdminAppsState
  adminApprovals: AdminApprovalsState
  adminDevManagement: AdminDevManamgenetState
  developerSetStatus: RequestState
  revisionDetail: RevisionDetailState
  revisions: RevisionsState
  appDelete: RequestState
  noticationMessage: NotificationMessageState
  adminStats: AdminStatsState
}

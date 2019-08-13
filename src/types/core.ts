import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { ClientState } from '../reducers/client'
import { MyAppsState } from '../reducers/my-apps'
import { DeveloperState } from '../reducers/developer'
import { AuthState } from '../reducers/auth'
import { AppDetailState } from '../reducers/app-detail'
import { ErrorState } from '../reducers/error'
import { AdminState } from '../reducers/admin'
import { SubmitAppState } from '../reducers/submit-app'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { AppPermissionState } from '@/reducers/app-permission'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { AppInstallState } from '@/reducers/app-install'
import { AppUninstallState } from '@/reducers/app-uninstall'

export interface Action<T> {
  readonly type: ActionType
  readonly data: T
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
  client: ClientState
  myApps: MyAppsState
  appDetail: AppDetailState
  developer: DeveloperState
  auth: AuthState
  error: ErrorState
  admin: AdminState
  submitApp: SubmitAppState
  submitRevision: SubmitRevisionState
  adminApprovals: AdminApprovalsState
  revisionDetail: RevisionDetailState
  appPermission: AppPermissionState
  appDetailModal: AppDetailModalState
  appInstall: AppInstallState
  appUninstall: AppUninstallState
}

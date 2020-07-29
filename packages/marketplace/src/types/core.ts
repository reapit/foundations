import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { InstalledAppsState } from '../reducers/installed-apps'
import { ErrorState } from '../reducers/error'
import { CategoriesRootState } from '@/reducers/categories'
import { AppInstallationsState } from '@/reducers/app-installations'
import { NotificationMessageState } from '@/reducers/notification-message'
import { ClientRootState } from '@/reducers/client'
import { DesktopIntegrationTypeRootState } from '@/reducers/desktop-integration-types'

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

export type ReduxState = {
  client: ClientRootState
  installedApps: InstalledAppsState
  error: ErrorState
  categories: CategoriesRootState
  installations: AppInstallationsState
  noticationMessage: NotificationMessageState
  desktopIntegrationTypes: DesktopIntegrationTypeRootState
}

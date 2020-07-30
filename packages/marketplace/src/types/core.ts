import Routes from '@/constants/routes'
import ActionTypes from '@/constants/action-types'
import { CategoriesRootState } from '@/reducers/categories'
import { DesktopIntegrationTypeRootState } from '@/reducers/desktop-integration-types'
import { AppsRootState } from '@/reducers/apps'
import { NegotiatorsRootState } from '@/reducers/negotiators'
import { WebComponentRootState } from '@/reducers/web-component'
import { InstallationsRootState } from '@/reducers/installations'

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
  apps: AppsRootState
  negotiators: NegotiatorsRootState
  webComponent: WebComponentRootState
  categories: CategoriesRootState
  installations: InstallationsRootState
  desktopIntegrationTypes: DesktopIntegrationTypeRootState
}

import { Dispatch, SetStateAction } from 'react'
import { AppState, MapRefs } from '../../../core/app-state'

export interface HandleSetMapParams {
  mapRefs: MapRefs
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

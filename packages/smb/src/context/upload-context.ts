import * as React from 'react'
import { State, Dispatch } from '@/components/providers/upload-provider/reducers'

export const UploadStateContext = React.createContext<State>({} as State)
UploadStateContext.displayName = 'UploadStateContext'

export const UploadDispatchContext = React.createContext<Dispatch>({} as Dispatch)
UploadDispatchContext.displayName = 'UploadDispatchContext'

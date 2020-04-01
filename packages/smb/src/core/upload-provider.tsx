import * as React from 'react'
import { UploadStateContext, UploadDispatchContext } from '@/context'
import { UploadProgress, Cell } from '@reapit/elements'
import { UploadResultModal } from '@/components/ui/upload-result-modal'
import { MutationResult } from '@/utils/worker-upload-helper'

export type ActionsType = 'START_UPLOAD' | 'UPLOAD_PROGRESS' | 'FINISH_UPLOAD' | 'RESET_STATE'
export type Action = { type: ActionsType; payload?: any }
export type Dispatch = (action: Action) => void

export type UploadResultDetail = MutationResult<any> & { rowData: Cell[] }

export type UploadResults = {
  total: number
  success: number
  failed: number
  details: Array<UploadResultDetail>
}

export type State = {
  status: 'IDLE' | 'UPLOADING' | 'UPLOADED'
  totalItem: number
  completedItem: number
  uploadResult: UploadResults
}

export const startUpload = (totalItem: number): Action => ({
  type: 'START_UPLOAD',
  payload: { totalItem },
})

export const setUploadProgress = (completedItem: number): Action => ({
  type: 'UPLOAD_PROGRESS',
  payload: { completedItem },
})

export const completeUpload = (results: UploadResults): Action => ({
  type: 'FINISH_UPLOAD',
  payload: results,
})

export const resetState = (): Action => ({
  type: 'RESET_STATE',
})

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case 'START_UPLOAD':
      return {
        ...state,
        status: 'UPLOADING',
        totalItem: payload.totalItem,
      }
    case 'UPLOAD_PROGRESS':
      return {
        ...state,
        completedItem: payload.completedItem,
      }
    case 'FINISH_UPLOAD':
      return {
        ...state,
        status: 'UPLOADED',
        uploadResult: payload,
      }
    case 'RESET_STATE':
      return initialState
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

export const initialState: State = {
  status: 'IDLE',
  totalItem: 0,
  completedItem: 0,
  uploadResult: {
    total: 0,
    success: 0,
    failed: 0,
    details: [],
  },
}

export type UploadProviderProps = { children: JSX.Element }

export const handleCloseModal = (setCompleted, dispatch) => () => {
  dispatch(resetState())
  setCompleted(false)
}

function UploadProvider({ children }: UploadProviderProps) {
  const [isCompleted, setCompleted] = React.useState(false)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { status, totalItem, completedItem, uploadResult } = state

  React.useEffect(() => {
    if (status === 'UPLOADED' && !isCompleted) {
      setCompleted(true)
    }
  }, [status])

  return (
    <UploadStateContext.Provider value={state}>
      <UploadDispatchContext.Provider value={dispatch}>
        {children}
        <UploadProgress
          visible={status === 'UPLOADING'}
          percentage={completedItem / totalItem}
          totalCount={totalItem}
          completedCount={completedItem}
        />
        <UploadResultModal
          visible={isCompleted}
          results={uploadResult}
          onCloseClick={handleCloseModal(setCompleted, dispatch)}
        />
      </UploadDispatchContext.Provider>
    </UploadStateContext.Provider>
  )
}

export default UploadProvider

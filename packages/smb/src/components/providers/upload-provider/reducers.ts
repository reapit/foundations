import { Cell } from '@reapit/elements'
import { MutationResult } from '@/utils/worker-upload-helper'

export type ActionsType = 'START_UPLOAD' | 'UPLOAD_PROGRESS' | 'FINISH_UPLOAD' | 'RESET_STATE'
export type Action = { type: ActionsType; payload?: any }
export type Dispatch = (action: Action) => void

export type UploadResultDetail = MutationResult<any> & { rowData: Cell[] }

export type UploadResults = {
  total: number
  success: number
  failed: number
  details: UploadResultDetail[]
}

export type State = {
  status: 'IDLE' | 'UPLOADING' | 'UPLOADED'
  totalItem: number
  completedItem: number
  uploadResult: UploadResults
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

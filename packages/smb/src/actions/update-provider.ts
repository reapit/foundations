import { Action, UploadResults } from '@/reducers/update-provider'

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

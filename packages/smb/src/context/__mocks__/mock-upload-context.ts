import { State, Dispatch } from '@/core/upload-provider'

export const mockUploadStateContext: State = {
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

export const mockUploadDispatchContext: Dispatch = () => {}

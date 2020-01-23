import appDeleteReducer, { defaultState } from '../app-delete'
import {
  appDeleteSetInitFormState,
  appDeleteRequestSuccess,
  appDeleteRequestLoading,
  appDeleteRequestFailure
} from '@/actions/app-delete'
import { ActionType } from '../../types/core'
import { RequestState } from '@/types/core'

const testData: Record<string, RequestState> = {
  pending: { formState: 'PENDING' },
  loading: { formState: 'SUBMITTING' },
  success: { formState: 'SUCCESS' },
  error: { formState: 'ERROR' }
}

describe('app-delete reducers', () => {
  it('should return fomState = "PENDING" if action not matched', () => {
    const newState = appDeleteReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(testData.pending)
    expect(testData.pending).toEqual(defaultState)
  })

  it('should return formState = "SUBMITTING" when appDeleteRequestLoading action is dispatched', () => {
    const newState = appDeleteReducer(defaultState, appDeleteRequestLoading())
    expect(newState).toEqual(testData.loading)
  })

  it('should set formState = "SUCCESS" data when APP_DELETE_REQUEST_SUCCESS action is dispatched', () => {
    const newState = appDeleteReducer(testData.loading, appDeleteRequestSuccess())
    expect(newState).toEqual(testData.success)
  })

  it('should set formState="ERROR" when APP_DELETE_REQUEST_FAILURE action is dispatched ', () => {
    const newState = appDeleteReducer(testData.loading, appDeleteRequestFailure())
    expect(newState).toEqual(testData.error)
  })

  it('should return fomState = "PENDING" when appDeleteSetInitFormState is dispatched', () => {
    const newState = appDeleteReducer(testData.success, appDeleteSetInitFormState())
    expect(newState).toEqual(testData.pending)
  })
})

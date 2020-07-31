import appDeleteReducer, { defaultState } from '@/reducers/apps'
import {
  appDeleteSetInitFormState,
  appDeleteRequestSuccess,
  appDeleteRequestLoading,
  appDeleteRequestFailure,
} from '@/actions/app-delete'
import { ActionType } from '@/types/core'
import { AppsState } from '@/reducers/apps'

const testData: Record<string, Pick<AppsState, 'deleteFormState'>> = {
  pending: { deleteFormState: 'PENDING' },
  loading: { deleteFormState: 'SUBMITTING' },
  success: { deleteFormState: 'SUCCESS' },
  error: { deleteFormState: 'ERROR' },
}

describe('appDeleteReducer - deleteFormState', () => {
  it('should return fomState = "PENDING" if action not matched', () => {
    const newState = appDeleteReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual({ ...defaultState, ...testData.pending })
  })

  it('should return formState = "SUBMITTING" when appDeleteRequestLoading action is dispatched', () => {
    const newState = appDeleteReducer(defaultState, appDeleteRequestLoading())
    expect(newState).toEqual({ ...defaultState, ...testData.loading })
  })

  it('should set formState = "SUCCESS" data when APP_DELETE_REQUEST_SUCCESS action is dispatched', () => {
    const newState = appDeleteReducer({ ...defaultState, ...testData.loading }, appDeleteRequestSuccess())
    expect(newState).toEqual({ ...defaultState, ...testData.success })
  })

  it('should set formState="ERROR" when APP_DELETE_REQUEST_FAILURE action is dispatched ', () => {
    const newState = appDeleteReducer({ ...defaultState, ...testData.success }, appDeleteRequestFailure())
    expect(newState).toEqual({ ...defaultState, ...testData.error })
  })

  it('should return fomState = "PENDING" when appDeleteSetInitFormState is dispatched', () => {
    const newState = appDeleteReducer({ ...defaultState, ...testData.error }, appDeleteSetInitFormState())
    expect(newState).toEqual({ ...defaultState, ...testData.pending })
  })
})

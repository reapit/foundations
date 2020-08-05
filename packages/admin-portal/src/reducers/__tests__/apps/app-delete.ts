import appDeleteReducer, { defaultState } from '@/reducers/apps'
import {
  setDeleteAppInitFormState,
  requestDeleteAppSuccess,
  requestDeleteApp,
  requestDeleteAppFailed,
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

  it('should return formState = "SUBMITTING" when requestDeleteAppLoading action is dispatched', () => {
    const newState = appDeleteReducer(defaultState, requestDeleteApp('1'))
    expect(newState).toEqual({ ...defaultState, ...testData.loading })
  })

  it('should set formState = "SUCCESS" data when DELETE_REQUEST_APP_SUCCESS action is dispatched', () => {
    const newState = appDeleteReducer({ ...defaultState, ...testData.loading }, requestDeleteAppSuccess())
    expect(newState).toEqual({ ...defaultState, ...testData.success })
  })

  it('should set formState="ERROR" when DELETE_REQUEST_APP_FAILED action is dispatched ', () => {
    const newState = appDeleteReducer({ ...defaultState, ...testData.success }, requestDeleteAppFailed())
    expect(newState).toEqual({ ...defaultState, ...testData.error })
  })

  it('should return fomState = "PENDING" when setDeleteAppInitFormState is dispatched', () => {
    const newState = appDeleteReducer({ ...defaultState, ...testData.error }, setDeleteAppInitFormState())
    expect(newState).toEqual({ ...defaultState, ...testData.pending })
  })
})

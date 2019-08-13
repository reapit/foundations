import appUninstallReducer, { defaultState, AppUninstallState } from '../app-uninstall'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

const testData: Record<string, AppUninstallState> = {
  loading: { formState: 'SUBMITTING' }
}

describe('app-uninstall reducer', () => {
  it('should return fomState = PENDING if action not matched', () => {
    const newState = appUninstallReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return formState = "SUBMITTING" when APP_UNINSTALL_LOADING action is called', () => {
    const newState = appUninstallReducer(defaultState, {
      type: ActionTypes.APP_UNINSTALL_LOADING as ActionType,
      data: true
    })
    expect(newState).toEqual(testData.loading)
  })

  it('should set formState = "SUCCESS" data when APP_UNINSTALL_REQUEST_DATA_SUCCESS action is called', () => {
    const newState = appUninstallReducer(
      { formState: 'SUCCESS' },
      {
        type: ActionTypes.APP_UNINSTALL_REQUEST_DATA_SUCCESS as ActionType,
        data: undefined
      }
    )
    const expected = {
      ...defaultState,
      formState: 'SUCCESS'
    }
    expect(newState).toEqual(expected)
  })

  it('should set formState="ERROR" when ', () => {
    const newState = appUninstallReducer(testData.loading, {
      type: ActionTypes.APP_UNINSTALL_REQUEST_DATA_FAILURE as ActionType,
      data: undefined
    })
    const expected = {
      ...defaultState,
      formState: 'ERROR'
    }

    expect(newState).toEqual(expected)
  })
})

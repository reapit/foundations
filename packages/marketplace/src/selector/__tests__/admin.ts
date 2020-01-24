import { ReduxState } from '@/types/core'
import { selectAdminAppsState } from '../admin'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('selectAdminAppsState', () => {
  it('should run correctly', () => {
    const input = {
      adminApps: {
        adminAppsData: appsDataStub.data,
        loading: false,
      },
    } as ReduxState
    const result = selectAdminAppsState(input)
    expect(result).toEqual({ adminAppsData: appsDataStub.data, loading: false })
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectAdminAppsState(input)
    expect(result).toEqual(undefined)
  })
})

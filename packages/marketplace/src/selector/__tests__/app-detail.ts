import { selectAppDetailId, selectAppDetailInstallationId } from '../app-detail'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { ReduxState } from '@/types/core'

describe('selectAppDetailId', () => {
  it('should run correctly', () => {
    const input = {
      appDetail: {
        appDetailData: appDetailDataStub,
      },
    } as ReduxState
    const result = selectAppDetailId(input)
    expect(result).toEqual(appDetailDataStub.data.id)
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectAppDetailId(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectAppDetailInstallationId', () => {
  it('should run correctly', () => {
    const input = {
      appDetail: {
        appDetailData: appDetailDataStub,
      },
    } as ReduxState
    const result = selectAppDetailInstallationId(input)
    expect(result).toEqual(appDetailDataStub.data.installationId)
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectAppDetailInstallationId(input)
    expect(result).toEqual(undefined)
  })
})

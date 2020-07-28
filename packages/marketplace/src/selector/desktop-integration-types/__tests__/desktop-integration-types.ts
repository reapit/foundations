import { ReduxState } from '@/types/core'
import { selectDesktopIntegrationTypes } from '../desktop-integration-types'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

describe('selectDesktopIntegrationTypes', () => {
  it('should run correctly', () => {
    const input = {
      desktopIntegrationTypes: {
        list: integrationTypesStub,
      },
    } as ReduxState
    const result = selectDesktopIntegrationTypes(input)
    expect(result).toEqual(integrationTypesStub.data)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const expected = []
    const result = selectDesktopIntegrationTypes(input)
    expect(result).toEqual(expected)
  })
})

import { ReduxState } from '@/types/core'
import { selectIntegrationTypes } from '../integration-types'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

describe('selectIntegrationTypes', () => {
  it('should run correctly', () => {
    const input = {
      desktopIntegrationTypes: integrationTypesStub,
    } as ReduxState
    const result = selectIntegrationTypes(input)
    expect(result).toEqual(integrationTypesStub.data)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const expected = []
    const result = selectIntegrationTypes(input)
    expect(result).toEqual(expected)
  })
})

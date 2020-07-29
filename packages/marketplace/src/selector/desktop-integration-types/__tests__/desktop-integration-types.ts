import { ReduxState } from '@/types/core'
import { selectDesktopIntegrationTypes } from '../desktop-integration-types'
import { desktopIntegrationTypesStub } from '@/sagas/__stubs__/desktop-integration-types'

describe('selectDesktopIntegrationTypes', () => {
  it('should run correctly', () => {
    const input = {
      desktopIntegrationTypes: {
        list: desktopIntegrationTypesStub,
      },
    } as ReduxState
    const result = selectDesktopIntegrationTypes(input)
    expect(result).toEqual(desktopIntegrationTypesStub.data)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const expected = []
    const result = selectDesktopIntegrationTypes(input)
    expect(result).toEqual(expected)
  })
})

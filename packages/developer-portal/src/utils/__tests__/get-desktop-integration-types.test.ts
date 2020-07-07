import { getDesktopIntegrationTypes } from '../get-desktop-integration-types'

describe('getDesktopIntegrationTypes', () => {
  it('shold working correctly', () => {
    const mockDesktopIntegrationTypes = [{ id: '1' }, { id: '2' }]
    expect(getDesktopIntegrationTypes(['1'], mockDesktopIntegrationTypes)).toEqual([mockDesktopIntegrationTypes[0]])
  })
})

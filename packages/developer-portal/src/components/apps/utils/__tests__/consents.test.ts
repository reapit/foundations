import { mockAppDetailModel, mockCreateAppModel } from '../../../../tests/__stubs__/apps'
import { checkShouldRenderConsents, checkShouldSendConsents } from '../consents'

describe('checkShouldSendConsents', () => {
  it('should check if we need to send consent email and return true', () => {
    const result = checkShouldSendConsents(mockAppDetailModel, {
      ...mockCreateAppModel,
      isListed: true,
      scopes: ['apps-create'],
    })
    expect(result).toBe(true)
  })

  it('should check if we need to send consent email and return false', () => {
    const result = checkShouldSendConsents(
      { ...mockAppDetailModel, isListed: false },
      {
        ...mockCreateAppModel,
        isListed: false,
      },
    )
    expect(result).toBe(false)
  })
})

describe('checkShouldRenderConsents', () => {
  it('should check if we need to render the consents page and return true', () => {
    const result = checkShouldRenderConsents(mockAppDetailModel, {
      ...mockAppDetailModel,
      scopes: [{ name: 'apps-create' }],
    })

    expect(result).toBe(true)
  })

  it('should check if we need to render the consents page and return false', () => {
    const result = checkShouldRenderConsents(mockAppDetailModel, mockAppDetailModel)

    expect(result).toBe(false)
  })
})

import { orgIdEffectHandler } from '../org-id-effect-handler'

jest.mock('../../core/connect-session')

describe('orgIdEffectHandler', () => {
  it('should get and set org id if no org id and a reapit connect session', async () => {
    const mockOrgId = null
    const mockSetOrgId = jest.fn()

    const curried = orgIdEffectHandler(mockOrgId, mockSetOrgId)

    await curried()

    expect(mockSetOrgId).toHaveBeenCalledWith('SOME_ORG_ID')
  })

  it('should not get and set org id if has an orgId', async () => {
    const mockOrgId = 'SOME_ID'
    const mockSetOrgId = jest.fn()

    const curried = orgIdEffectHandler(mockOrgId, mockSetOrgId)

    await curried()

    expect(mockSetOrgId).not.toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

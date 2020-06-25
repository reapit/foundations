import { handleUseEffectValidateOnMount } from '../utils'

describe('handleValidateOnMount', () => {
  test('should run correctly', () => {
    const validateForm = jest.fn()
    handleUseEffectValidateOnMount(validateForm)()
    expect(validateForm).toHaveBeenCalled()
  })
})

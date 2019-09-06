import { validate } from '@/utils/form/login'

describe('login form utils', () => {
  it('should return correct value', () => {
    const inputs = [{ email: '', password: '' }, { email: 'abc@gmail.com', password: 'password' }]
    const outputs = [{ email: 'Required', password: 'Required' }, { email: undefined, password: undefined }]

    for (let i = 0; i < inputs.length; i++) {
      const result = validate(inputs[i])
      expect(result).toEqual(outputs[i])
    }
  })
})

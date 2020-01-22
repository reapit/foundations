import { validate } from '../login'

describe('login form', () => {
  describe('validate', () => {
    it('should run correctly', () => {
      const mockLoginFormValues = {
        email: 'mockEmail@gmail.com',
        password: 'mockPassword'
      }
      const output = {}
      const result = validate(mockLoginFormValues)
      expect(result).toEqual(output)
    })

    it('should return error output', () => {
      const mockLoginFormValues = {
        email: '',
        password: 'mockPassword'
      }
      const output = {
        email: 'Required'
      }
      const result = validate(mockLoginFormValues)
      expect(result).toEqual(output)
    })

    it('should return error output', () => {
      const mockLoginFormValues = {
        email: 'mockEmail',
        password: 'mockPassword'
      }
      const output = {
        email: 'Invalid email address'
      }
      const result = validate(mockLoginFormValues)
      expect(result).toEqual(output)
    })

    it('should return error output', () => {
      const mockLoginFormValues = {
        email: 'mockEmail',
        password: ''
      }
      const output = {
        email: 'Invalid email address',
        password: 'Required'
      }
      const result = validate(mockLoginFormValues)
      expect(result).toEqual(output)
    })
  })
})

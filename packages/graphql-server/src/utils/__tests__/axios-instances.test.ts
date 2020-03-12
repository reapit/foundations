import { createPlatformAxiosInstance } from '../axios-instances'
describe('axiosInstance', () => {
  describe('createPlatformAxiosInstance', () => {
    it('should return instances', () => {
      const result = createPlatformAxiosInstance()
      expect(result).toBeDefined()
    })
  })
})

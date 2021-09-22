import MockAdapter from 'axios-mock-adapter'
import { createPlatformAxiosInstance } from '../axios-instances'

describe('axiosInstance', () => {
  describe('createPlatformAxiosInstance', () => {
    it('should return instances', () => {
      const result = createPlatformAxiosInstance()
      expect(result).toBeDefined()
    })
    it('should retry requests if they 429', async () => {
      const instance = createPlatformAxiosInstance()
      const mock = new MockAdapter(instance)
      let ctr = 0
      mock.onGet('/').reply(() => {
        ctr++
        if (ctr === 2) {
          return [200, { data: { message: 'ok' } }]
        }
        return [429, { message: 'Too Many Requests' }]
      })

      await instance.get('/')
      expect(ctr).toBe(2)
    })
    it('should retry requests if they 429 10 times', async () => {
      const instance = createPlatformAxiosInstance({ retryDelay: () => 0 })
      const mock = new MockAdapter(instance)
      let ctr = 0
      mock.onGet('/').reply(() => {
        ctr++
        if (ctr === 10) {
          return [200, { data: { message: 'ok' } }]
        }
        return [429, { message: 'Too Many Requests' }]
      })

      await instance.get('/')
      expect(ctr).toBe(10)
    })
    it('should error if it takes more than 10 retries', async () => {
      const instance = createPlatformAxiosInstance({ retryDelay: () => 0 })
      const mock = new MockAdapter(instance)
      let ctr = 0
      mock.onGet('/').reply(() => {
        ctr++
        return [429, { message: 'Too Many Requests' }]
      })

      await expect(instance.get('/')).rejects.toThrow()
      expect(ctr).toBe(11)
    })
  })
})

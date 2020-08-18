import { updateConveyancingArgsMock } from '../__stubs__/update-conveyancing'
import { conveyancingDetailMock } from '../__stubs__/conveyancing-detail'
import { createDownwardLinkModelArgsMock } from '../__stubs__/create-downward-link-model'
import { createUpwardLinkModelArgsMock } from '../__stubs__/create-upward-link-model'
import { deleteDownwardLinkModelArgsMock } from '../__stubs__/delete-downward-link-model'
import { deleteUpwardLinkModelArgsMock } from '../__stubs__/delete-upward-link-model'
import { conveyancingMock } from '../__stubs__/conveyancing'
import { mockContext } from '../../../__stubs__/context'
import {
  callGetConveyancingByIdAPI,
  callGetConveyancingAPI,
  callUpdateConveyancingAPI,
  callCreateDownwardLinkModelAPI,
  callCreateUpwardLinkModelAPI,
  callDeleteDownwardLinkModelAPI,
  callDeleteUpwardLinkModelAPI,
} from '../api'
import { URLS } from '../../../constants/api'

jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => {
    return {
      get: jest.fn().mockImplementation(values => {
        if (values === `${URLS.conveyancing}/${conveyancingDetailMock.id}`) {
          return {
            data: conveyancingDetailMock,
          }
        }
        return {
          data: conveyancingMock,
        }
      }),
      patch: jest.fn(() => {
        return {
          status: 204,
          data: conveyancingDetailMock,
        }
      }),
      post: jest.fn(() => {
        return {
          data: conveyancingDetailMock,
        }
      }),
      delete: jest.fn(() => {
        return {
          data: null,
        }
      }),
    }
  }),
}))

describe('conveyancing api', () => {
  describe('callGetConveyancingByIdAPI', () => {
    it('should run correctly', async () => {
      try {
        const mockArgs = { id: conveyancingDetailMock.id }
        const result = await callGetConveyancingByIdAPI(mockArgs, mockContext)
        expect(result).toEqual(conveyancingDetailMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callGetConveyancingAPI', () => {
    it('should run correctly', async () => {
      try {
        const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
        const result = await callGetConveyancingAPI(args, mockContext)
        expect(result).toEqual(conveyancingMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callUpdateConveyancingAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callUpdateConveyancingAPI(updateConveyancingArgsMock, mockContext)
        expect(result).toEqual(conveyancingDetailMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callCreateDownwardLinkModelAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callCreateDownwardLinkModelAPI(createDownwardLinkModelArgsMock, mockContext)
        expect(result).toEqual(conveyancingDetailMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callCreateUpwardLinkModelAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callCreateUpwardLinkModelAPI(createUpwardLinkModelArgsMock, mockContext)
        expect(result).toEqual(conveyancingDetailMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callDeleteDownwardLinkModelAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callDeleteDownwardLinkModelAPI(deleteDownwardLinkModelArgsMock, mockContext)
        expect(result).toEqual(deleteDownwardLinkModelArgsMock.id)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callDeleteUpwardLinkModelAPI', () => {
    it('should run correctly', async () => {
      try {
        const result = await callDeleteUpwardLinkModelAPI(deleteUpwardLinkModelArgsMock, mockContext)
        expect(result).toEqual(deleteUpwardLinkModelArgsMock.id)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})

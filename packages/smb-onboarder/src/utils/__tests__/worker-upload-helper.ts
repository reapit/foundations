import { serial, prepareCreateOfficeParams, mutation } from '../worker-upload-helper'

describe('worker-upload-helper', () => {
  describe('serial', () => {
    it('should run correctly', async () => {
      const task1 = () => Promise.resolve(1)
      const task2 = () => Promise.resolve(2)
      const result = await serial([task1, task2])
      expect(result).toEqual([1, 2])
    })
  })

  describe('mutation', () => {
    it('should run correctly', async () => {
      const result = {}
      const graphqlUri = ''
      const accessToken = ''
      const operationName = 'operation name'
      const query = 'query'
      const variables = {}
      window.fetch = jest.fn().mockReturnValue({
        status: 200,
        json: () => result,
      })

      const response = mutation({ graphqlUri, accessToken, query, operationName, variables })
      expect(response.then).not.toBeNull()
      expect(response.then).toBeInstanceOf(Function)
      response.then(result => {
        expect(result.success).toEqual(true)
      })
    })

    it('should run correctly when server error', async () => {
      const result = {}
      const graphqlUri = ''
      const accessToken = ''
      const operationName = 'operation name'
      const query = 'query'
      const variables = {}
      window.fetch = jest.fn().mockReturnValue({
        status: 400,
        json: () => result,
      })

      const response = mutation({ graphqlUri, accessToken, query, operationName, variables })
      expect(response.then).not.toBeNull()
      expect(response.then).toBeInstanceOf(Function)
      response.then(result => {
        expect(result.success).toEqual(false)
      })
    })

    it('should run correctly when server error 1', async () => {
      const graphqlUri = ''
      const accessToken = ''
      const operationName = 'operation name'
      const query = 'query'
      const variables = {}
      window.fetch = jest.fn().mockReturnValue({
        status: 200,
        json: () => ({
          errors: [],
          data: null,
        }),
      })

      const response = mutation({ graphqlUri, accessToken, query, operationName, variables })
      response.then(result => {
        expect(result.success).toEqual(false)
      })
    })
  })

  describe('prepareCreateOfficeParams', () => {
    it('should run correctly', async () => {
      const rowData = [
        { value: '' },
        { value: '' },
        { value: 'Office name' },
        { value: 'building name' },
        { value: 'building number' },
        { value: 'address 1' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: 'XD111' },
        { value: '0987654321' },
        { value: 'tester@reapit.com' },
      ]
      const expectVal = {
        name: 'Office name',
        address: {
          buildingName: 'building name',
          buildingNumber: 'building number',
          line1: 'address 1',
          line2: '',
          line3: '',
          line4: '',
          postcode: 'XD111',
        },
        workPhone: '0987654321',
        email: 'tester@reapit.com',
      }
      expect(prepareCreateOfficeParams(rowData)).toEqual(expectVal)
    })
  })
})

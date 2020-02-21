import { Negotiators } from '@reapit/foundations-ts-definitions'
import { GetNegotiatorByIdArgs } from '../negotiator'
import { getNegotiatorById, getNegotiators, updateNegotiator } from '../services'
import { mockContext } from '../../../__mocks__/context'
import { negotiatorStub } from '../__mocks__/negotiator'
import { negotiatorsStub } from '../__mocks__/negotiators'
import { updateArgStub } from '../__mocks__/update-arg'

jest.mock('../api', () => ({
  callGetNegotiatorByIdAPI: jest.fn(() => negotiatorStub),
  callGetNegotiatorsAPI: jest.fn(() => negotiatorsStub),
  callCreateNegotiatorAPI: jest.fn(() => true),
  callUpdateNegotiatorAPI: jest.fn(() => negotiatorStub),
}))

describe('negotiator services', () => {
  describe('getNegotiatorById', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: 'MGL',
      } as GetNegotiatorByIdArgs
      const result = getNegotiatorById(mockArgs, mockContext)
      const output = negotiatorStub
      expect(result).toEqual(output)
    })
  })

  describe('getNegotiators', () => {
    it('should run correctly', () => {
      const mockArgs: Negotiators = {}
      const result = getNegotiators(mockArgs, mockContext)
      const output = negotiatorsStub
      expect(result).toEqual(output)
    })
  })

  describe('createNegotiator', () => {
    it('should run correctly', () => {
      const result = createNegotiator(createArgStub, mockContext)
      const output = true
      expect(result).toEqual(output)
    })
  })

  describe('updateNegotiator', () => {
    it('should run correctly', () => {
      const result = updateNegotiator(updateArgStub, mockContext)
      const output = negotiatorStub
      expect(result).toEqual(output)
    })
  })
})

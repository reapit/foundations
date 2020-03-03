import { queryOffices, mutationCreateOffice, mutationUpdateOffice, queryOffice } from '../resolvers'

import { mockContext } from '../../../__mocks__/context'
import { officeStub } from '../__mocks__/office'
import { officesStub } from '../__mocks__/offices'
import { createOfficeStub } from '../__mocks__/create-office'
import { updateOfficeStub } from '../__mocks__/update-office'
import { getOfficesStub } from '../__mocks__/get-offices'
import { getOfficeStub } from '../__mocks__/get-office'

import errors from '../../../errors'

jest.mock('../services', () => ({
  getOffices: jest.fn(() => officesStub),
  getOfficeById: jest.fn(() => officeStub),
  createOffice: jest.fn(() => true),
  updateOffice: jest.fn(() => officeStub),
}))

describe('office resolvers', () => {
  describe('mutationUpdateOffice', () => {
    it('should run correctly', () => {
      const result = mutationUpdateOffice({}, updateOfficeStub, mockContext)
      expect(result).toEqual(officeStub)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = mutationUpdateOffice({}, updateOfficeStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('mutationCreateOffice', () => {
    it('should run correctly', () => {
      const result = mutationCreateOffice({}, createOfficeStub, mockContext)
      expect(result).toEqual(true)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = mutationCreateOffice({}, createOfficeStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryOffices', () => {
    it('should run correctly', () => {
      const result = queryOffices({}, getOfficesStub, mockContext)
      expect(result).toEqual(officesStub)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryOffices({}, getOfficesStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryOffice', () => {
    it('should run correctly', () => {
      const result = queryOffice({}, getOfficeStub, mockContext)
      expect(result).toEqual(officeStub)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryOffice({}, getOfficeStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })
})

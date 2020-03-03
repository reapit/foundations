// import { GetAppointmentByIdArgs } from '../offices'

import { mockContext } from '../../../__mocks__/context'
import { officeStub } from '../__mocks__/office'
import { officesStub } from '../__mocks__/offices'
import { createOfficeStub } from '../__mocks__/create-office'
import { updateOfficeStub } from '../__mocks__/update-office'
import { getOfficesStub } from '../__mocks__/get-offices'
import { getOfficeStub } from '../__mocks__/get-office'

import { createOffice, getOfficeById, getOffices, updateOffice } from '../services'

jest.mock('../api', () => ({
  callGetOfficesAPI: jest.fn(() => officesStub),
  callGetOfficeByIdAPI: jest.fn(() => officeStub),
  callCreateOfficeAPI: jest.fn(() => true),
  callUpdateOfficeAPI: jest.fn(() => officeStub),
}))

describe('offices services', () => {
  describe('updateOffice', () => {
    it('should run correctly', () => {
      const result = updateOffice(updateOfficeStub, mockContext)
      expect(result).toEqual(officeStub)
    })
  })

  describe('getOffices', () => {
    it('should run correctly', () => {
      const result = getOffices(getOfficesStub, mockContext)
      expect(result).toEqual(officesStub)
    })
  })

  describe('getOfficeById', () => {
    it('should run correctly', () => {
      const result = getOfficeById(getOfficeStub, mockContext)
      expect(result).toEqual(officeStub)
    })
  })

  describe('createOfficeStub', () => {
    it('should run correctly', () => {
      const result = createOffice(createOfficeStub, mockContext)
      expect(result).toEqual(true)
    })
  })
})

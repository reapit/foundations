import {
  callGetAppointmentByIdAPI,
  callGetAppointmentsAPI,
  callCreateAppointmentAPI,
  callUpdateAppointmentAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateAppointmentArgs } from '../__stubs__/mock-create-appointment'
import { mockUpdateAppointmentArgs } from '../__stubs__/mock-update-appointment'
import { getAppointmentById, getAppointments, createAppointment, updateAppointment } from '../services'
import { mockAppointment } from '../__stubs__/mock-appointment'
import { mockAppointments } from '../__stubs__/mock-appointments'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetAppointmentByIdAPI: jest.fn(() => Promise.resolve(mockAppointment)),
  callGetAppointmentsAPI: jest.fn(() => Promise.resolve(mockAppointments)),
  callCreateAppointmentAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateAppointmentAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getAppointmentById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getAppointmentById(args, mockContext)
    expect(callGetAppointmentByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockAppointment)
  })
})

describe('getAppointments', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getAppointments(args, mockContext)
    expect(callGetAppointmentsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockAppointments)
  })
})

describe('createAppointment', () => {
  it('should return correctly', async () => {
    const result = await createAppointment(mockCreateAppointmentArgs, mockContext)
    expect(callCreateAppointmentAPI).toHaveBeenCalledWith(mockCreateAppointmentArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateAppointment', () => {
  it('should return correctly', async () => {
    const result = await updateAppointment(mockUpdateAppointmentArgs, mockContext)
    expect(callUpdateAppointmentAPI).toHaveBeenCalledWith(mockUpdateAppointmentArgs, mockContext)
    expect(result).toEqual(true)
  })
})

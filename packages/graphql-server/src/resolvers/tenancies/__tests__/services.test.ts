import {
  callGetAppointmentByIdAPI,
  callGetAppointmentsAPI,
  callCreateAppointmentAPI,
  callUpdateAppointmentAPI,
} from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createAppointmentArgsMock } from '../__mocks__/create-appointment'
import { updateAppointmentArgsMock } from '../__mocks__/update-appointment'
import { getAppointmentById, getAppointments, createAppointment, updateAppointment } from '../services'
import { appointmentMock } from '../__mocks__/appointment'
import { appointmentsMock } from '../__mocks__/appointments'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetAppointmentByIdAPI: jest.fn(() => Promise.resolve(appointmentMock)),
  callGetAppointmentsAPI: jest.fn(() => Promise.resolve(appointmentsMock)),
  callCreateAppointmentAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateAppointmentAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getAppointmentById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getAppointmentById(args, mockContext)
    expect(callGetAppointmentByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(appointmentMock)
  })
})

describe('getAppointments', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getAppointments(args, mockContext)
    expect(callGetAppointmentsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(appointmentsMock)
  })
})

describe('createAppointment', () => {
  it('should return correctly', async () => {
    const result = await createAppointment(createAppointmentArgsMock, mockContext)
    expect(callCreateAppointmentAPI).toHaveBeenCalledWith(createAppointmentArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateAppointment', () => {
  it('should return correctly', async () => {
    const result = await updateAppointment(updateAppointmentArgsMock, mockContext)
    expect(callUpdateAppointmentAPI).toHaveBeenCalledWith(updateAppointmentArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

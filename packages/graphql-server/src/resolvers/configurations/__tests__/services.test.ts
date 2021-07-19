import { callGetConfigurationsByTypeAndIdApi, callGetConfigurationsByTypeApi } from '../api'
import { GetConfigurationByTypeAndIdArgs, GetConfigurationByTypeArgs } from '../configurations'
import { mockContext } from '../../../__stubs__/mock-context'
import { getConfigurationByTypeAndId, getConfigurationsByType } from '../services'
import { mockAppointmentTypes, mockAppointmentType } from '../__stubs__/mock-appointment-types'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetConfigurationsByTypeAndIdApi: jest.fn(() => Promise.resolve(mockAppointmentType)),
  callGetConfigurationsByTypeApi: jest.fn(() => Promise.resolve(mockAppointmentTypes)),
}))

describe('getConfigurationByTypeAndId', () => {
  it('should return correctly', async () => {
    const args: GetConfigurationByTypeAndIdArgs = {
      type: '​​appointmentTypes',
      id: '1',
    }
    const result = await getConfigurationByTypeAndId(args, mockContext)
    expect(callGetConfigurationsByTypeAndIdApi).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockAppointmentType)
  })
})

describe('getConfigurationsByType', () => {
  it('should return correctly', async () => {
    const args: GetConfigurationByTypeArgs = {
      type: '​​appointmentTypes',
    }
    const result = await getConfigurationsByType(args, mockContext)
    expect(callGetConfigurationsByTypeApi).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockAppointmentTypes)
  })
})

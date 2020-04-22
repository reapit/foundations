import { callGetConfigurationsByTypeAndIdApi, callGetConfigurationsByTypeApi } from '../api'
import { GetConfigurationByTypeAndIdArgs, GetConfigurationByTypeArgs } from '../configurations'
import { mockContext } from '../../../__mocks__/context'
import { getConfigurationByTypeAndId, getConfigurationsByType } from '../services'
import { appointmentTypesMock, appointmentTypeMock } from '../__mocks__/appointmentTypes'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetConfigurationsByTypeAndIdApi: jest.fn(() => Promise.resolve(appointmentTypeMock)),
  callGetConfigurationsByTypeApi: jest.fn(() => Promise.resolve(appointmentTypesMock)),
}))

describe('getConfigurationByTypeAndId', () => {
  it('should return correctly', async () => {
    const args: GetConfigurationByTypeAndIdArgs = {
      type: '​​appointmentTypes',
      id: '1',
    }
    const result = await getConfigurationByTypeAndId(args, mockContext)
    expect(callGetConfigurationsByTypeAndIdApi).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(appointmentTypeMock)
  })
})

describe('getConfigurationsByType', () => {
  it('should return correctly', async () => {
    const args: GetConfigurationByTypeArgs = {
      type: '​​appointmentTypes',
    }
    const result = await getConfigurationsByType(args, mockContext)
    expect(callGetConfigurationsByTypeApi).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(appointmentTypesMock)
  })
})

import configurationService from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetConfigurationsByType, queryGetConfigurationsByTypeAndId } from '../resolver'
import { GetConfigurationByTypeAndIdArgs, GetConfigurationByTypeArgs } from '../configurations'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockAppointmentType, mockAppointmentTypes } from '../__stubs__/mock-appointment-types'

jest.mock('../services', () => ({
  getConfigurationByTypeAndId: jest.fn(() => mockAppointmentType),
  getConfigurationsByType: jest.fn(() => mockAppointmentTypes),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetConfigurationsByType', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args: GetConfigurationByTypeArgs = {
      type: '​​appointmentTypes',
    }
    const result = queryGetConfigurationsByType(null, args, mockContext)
    expect(result).toEqual(configurationService.getConfigurationsByType(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args: GetConfigurationByTypeArgs = {
      type: '​​appointmentTypes',
    }
    const result = queryGetConfigurationsByType(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetConfigurationsByTypeAndId', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args: GetConfigurationByTypeAndIdArgs = {
      type: '​​appointmentTypes',
      id: '1',
    }
    const result = queryGetConfigurationsByTypeAndId(null, args, mockContext)
    expect(result).toEqual(configurationService.getConfigurationByTypeAndId(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args: GetConfigurationByTypeAndIdArgs = {
      type: '​​appointmentTypes',
      id: '1',
    }
    const result = queryGetConfigurationsByTypeAndId(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

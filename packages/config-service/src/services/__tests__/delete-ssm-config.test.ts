import { deleteConfigValue } from '../delete-ssm-config'
import { CLIENT_KEY_PREFIX } from '../../constants/ssm'

const KEY = 'TestKey'

jest.mock('aws-sdk', () => {
  const mockedSSM = {
    deleteParameter: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  }
  const mockedConfig = {
    update: jest.fn(),
  }
  return {
    SSM: jest.fn(() => mockedSSM),
    config: mockedConfig,
  }
})

const aws = require('aws-sdk')
const ssm = new aws.SSM()

describe('deleteConfigValue', () => {
  it('should be called with correct params', () => {
    var params = {
      Name: `${CLIENT_KEY_PREFIX}${KEY}`,
    }

    deleteConfigValue(KEY)
    expect(ssm.deleteParameter).toHaveBeenCalledWith(params)
    expect(ssm.deleteParameter().promise).toBeCalledTimes(1)
  })
})

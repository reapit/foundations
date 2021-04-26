import { fetchConfigValue } from '../fetch-ssm-config'
import { CLIENT_KEY_PREFIX } from '../../constants/ssm'

const KEY = 'TestKey'

jest.mock('aws-sdk', () => {
  const mockedSSM = {
    getParameter: jest.fn().mockReturnThis(),
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

describe('createConfigValue', () => {
  it('should be called with correct params and return a value', () => {
    var params = {
      Name: `${CLIENT_KEY_PREFIX}${KEY}`,
      WithDecryption: true,
    }

    const value = fetchConfigValue(KEY)
    expect(ssm.getParameter).toHaveBeenCalledWith(params)
    expect(ssm.getParameter().promise).toBeCalledTimes(1)
    expect(value).toBeDefined()
  })
})

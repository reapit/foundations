import { createConfigValue } from '../create-ssm-config'
import { CLIENT_KEY_PREFIX } from '../../constants/ssm'

const KEY = 'CLI/OpayoConfig'

jest.mock('aws-sdk', () => {
  const mockedSSM = {
    putParameter: jest.fn().mockReturnThis(),
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
  it('should be called with correct params', () => {
    const jsonConfigTest = JSON.stringify({ configTest: true })
    const params = {
      Name: `${CLIENT_KEY_PREFIX}${KEY}`,
      Value: jsonConfigTest,
      Overwrite: true,
      Type: 'SecureString',
    }

    createConfigValue(KEY, jsonConfigTest)
    expect(ssm.putParameter).toHaveBeenCalledWith(params)
    expect(ssm.putParameter().promise).toBeCalledTimes(1)
  })
})

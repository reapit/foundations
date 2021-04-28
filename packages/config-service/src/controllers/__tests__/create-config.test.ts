import { Response } from 'express'
import { createConfig } from '../create-config'
import { AppRequest } from '@reapit/node-utils'
import { createConfigValue } from '../../services/create-ssm-config'
import logger from '../../core/logger'

const SSM_KEY = 'PaymentConfig'
const MOCK_CLIENT_CODE = 'SBOX'
const mockConfigValue = JSON.stringify({ configTest: true })

jest.mock('../../services/create-ssm-config', () => ({
  createConfigValue: jest.fn(),
}))

jest.mock('@reapit/connect-session', () => ({
  connectSessionVerifyDecodeIdToken: jest.fn(() => {
    return { clientId: MOCK_CLIENT_CODE }
  }),
}))

jest.mock('../../core/logger')

const baseMockReq = {
  traceId: 'SOME_TRACE_ID',
  headers: {
    ['x-api-key']: 'SOME_API_KEY',
    ['authorization']: 'token',
  },
  body: {
    configKey: SSM_KEY,
    configValue: mockConfigValue,
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
  send: jest.fn(),
}

describe('createConfig', () => {
  it('should create config for key and return 200', async () => {
    const mockReq: Partial<AppRequest> = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createConfig(mockReq as AppRequest, mockRes as Response)

    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(createConfigValue).toHaveBeenCalledWith(`${MOCK_CLIENT_CODE}/${SSM_KEY}`, mockConfigValue)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.send).toHaveBeenCalledWith({ response: 'Config saved' })
  })
  it('should throw error and return 400 if body params are incorrect', async () => {
    const mockReq: Partial<AppRequest> = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
      },
      body: {},
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await createConfig(mockReq as AppRequest, mockRes as Response)

    expect(logger.info).toHaveBeenCalledTimes(0)
    expect(createConfigValue).toHaveBeenCalledTimes(0)
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
})

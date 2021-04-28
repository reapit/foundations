import { Response } from 'express'
import { deleteConfig } from '../delete-config'
import { AppRequest } from '@reapit/node-utils'
import { deleteConfigValue } from '../../services/delete-ssm-config'
import logger from '../../core/logger'

const MOCK_CLIENT_CODE = 'SBOX'
const SSM_KEY = 'TestKey'

jest.mock('../../services/delete-ssm-config', () => ({
  deleteConfigValue: jest.fn(),
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
  params: {
    configKey: SSM_KEY,
  },
}

const baseMockRes = {
  status: jest.fn(),
  json: jest.fn(),
  send: jest.fn(),
}

describe('deleteConfig', () => {
  it('should delete config for key and return 200', async () => {
    const mockReq: Partial<AppRequest> = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
      },
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await deleteConfig(mockReq as AppRequest, mockRes as Response)

    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(deleteConfigValue).toHaveBeenCalledWith(`${MOCK_CLIENT_CODE}/${SSM_KEY}`)
    expect(mockRes.status).toHaveBeenCalledWith(200)
  })
  it('should throw error and return 400 if params are incorrect', async () => {
    const mockReq: Partial<AppRequest> = {
      ...baseMockReq,
      headers: {
        ...baseMockReq.headers,
      },
      params: {},
    }

    const mockRes: Partial<Response> = {
      ...baseMockRes,
    }

    await deleteConfig(mockReq as AppRequest, mockRes as Response)

    expect(logger.info).toHaveBeenCalledTimes(0)
    expect(deleteConfigValue).toHaveBeenCalledTimes(0)
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
})

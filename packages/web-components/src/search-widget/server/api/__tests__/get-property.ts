import { fetcher } from '../../../../common/utils/fetcher-server'
import { propertyStub, propertyMinimalStub } from '../../../server/api/__stubs__/property'
import { getProperty } from '../get-property'
import { getServerHeaders } from '../../../../common/utils/get-server-headers'
import { Request, Response } from 'express'
import { PACKAGE_SUFFIXES } from '../../../../common/utils/constants'
import { errorHandler } from '../../../../common/utils/error-handler'

jest.mock('../../../../common/utils/fetcher-server')
jest.mock('../../../../common/utils/error-handler')

describe('property server API', () => {
  it('should correctly call the fetcher for property', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertyStub)

    const req = {
      url: '/properties/RPT200112',
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)

    await getProperty(req, res)

    expect(fetcher).toHaveBeenCalledWith({
      url: `${process.env.PLATFORM_API_BASE_URL}${req.url}`,
      headers,
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(propertyMinimalStub)
    expect(res.end).toHaveBeenCalledTimes(1)
  })

  it('should correctly catch an error', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    const error = new Error('Something went wrong')
    ;(fetcher as jest.Mock).mockImplementation(() => {
      throw error
    })

    const req = {
      url: '/properties/RPT200112',
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    await getProperty(req, res)

    expect(errorHandler).toHaveBeenCalledWith(error, res)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

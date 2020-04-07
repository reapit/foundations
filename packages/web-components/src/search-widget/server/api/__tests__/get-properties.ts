import { fetcher } from '../../../../common/utils/fetcher-server'
import { propertiesStub, propertiesMinimalStub } from '../../../server/api/__stubs__/properties'
import { getProperties } from '../get-properties'
import { getServerHeaders } from '../../../../common/utils/get-server-headers'
import { Request, Response } from 'express'
import { PACKAGE_SUFFIXES } from '../../../../common/utils/constants'
import { errorHandler } from '../../../../common/utils/error-handler'
import { mapMinimalProperties } from '../../utils/map-minimal-properties'
import { INCLUDED_PROPS } from '../../constants/api'

jest.mock('../../../../common/utils/fetcher-server')
jest.mock('../../../../common/utils/error-handler')
jest.mock('../../utils/map-minimal-properties', () => ({
  mapMinimalProperties: jest.fn().mockReturnValue(propertiesMinimalStub),
}))

describe('properties server API', () => {
  it('should correctly call the fetcher for properties', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertiesStub)

    const req = {
      url: '/properties?someValue=foo&someOtherValue=bar',
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)

    await getProperties(req, res)

    expect(fetcher).toHaveBeenCalledWith({
      url: `${process.env.PLATFORM_API_BASE_URL}${req.url}`,
      headers,
    })
    expect(mapMinimalProperties).toHaveBeenCalledWith(propertiesStub, INCLUDED_PROPS.GET_PROPERTIES)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(propertiesMinimalStub)
    expect(res.end).toHaveBeenCalledTimes(1)
  })

  it('should correctly catch an error', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    const error = new Error('Something went wrong')
    ;(fetcher as jest.Mock).mockImplementation(() => {
      throw error
    })

    const req = {
      url: '/properties?someValue=foo&someOtherValue=bar',
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    await getProperties(req, res)

    expect(errorHandler).toHaveBeenCalledWith(error, res)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

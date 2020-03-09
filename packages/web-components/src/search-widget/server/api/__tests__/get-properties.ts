import { fetcher } from '../../../../common/utils/fetcher-server'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { getProperties, getUrlQuery } from '../get-properties'
import { getServerHeaders } from '../../../../common/utils/get-server-headers'
import { Request, Response } from 'express'
import { PACKAGE_SUFFIXES } from '../../../../common/utils/constants'
import { errorHandler } from '../../../../common/utils/error-handler'

jest.mock('../../../../common/utils/fetcher-server')
jest.mock('../../../../common/utils/error-handler')

describe('properties server API', () => {
  it('should correctly return a URL query for a rental', () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    const expected =
      'http://localhost:3000/properties?SellingStatuses=forSale%2CunderOffer&InternetAdvertising=true&PageSize=8&Address=E2&marketingMode=letting%2CsellingAndLetting'
    expect(getUrlQuery(true, 'E2')).toEqual(expected)
  })

  it('should correctly return a URL query for sales', () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    const expected =
      'http://localhost:3000/properties?SellingStatuses=forSale%2CunderOffer&InternetAdvertising=true&PageSize=8&Address=E2&marketingMode=selling%2CsellingAndLetting'
    expect(getUrlQuery(false, 'E2')).toEqual(expected)
  })

  it('should correctly call the fetcher for properties', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertiesStub)

    const req = {
      body: {
        isRental: false,
        keywords: 'SEARCH',
      },
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)

    await getProperties(req, res)

    expect(fetcher).toHaveBeenCalledWith({
      url: getUrlQuery(req.body.isRental, req.body.keywords),
      headers,
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(propertiesStub)
    expect(res.end).toHaveBeenCalledTimes(1)
  })

  it('should correctly catch an error', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    const error = new Error('Something went wrong')
    ;(fetcher as jest.Mock).mockImplementation(() => {
      throw error
    })

    const req = {
      body: {
        isRental: false,
        keywords: 'SEARCH',
      },
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

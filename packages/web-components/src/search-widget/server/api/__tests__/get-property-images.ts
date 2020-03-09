import { fetcher } from '../../../../common/utils/fetcher-server'
import { propertyImagesStub } from '../../../server/api/__stubs__/property-images'
import { getPropertyImages } from '../get-property-images'
import { getServerHeaders } from '../../../../common/utils/get-server-headers'
import { Request, Response } from 'express'
import { PACKAGE_SUFFIXES } from '../../../../common/utils/constants'
import { errorHandler } from '../../../../common/utils/error-handler'

jest.mock('../../../../common/utils/fetcher-server')
jest.mock('../../../../common/utils/error-handler')

describe('property images server API', () => {
  it('should correctly call the fetcher for property images', async () => {
    process.env.PLATFORM_API_BASE_URL = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertyImagesStub)

    const req = {
      body: {
        propertyIds: ['SOME_ID', 'SOME_OTHER_ID'],
      },
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    const headers = await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)

    await getPropertyImages(req, res)

    expect(fetcher).toHaveBeenCalledWith({
      url: 'http://localhost:3000/propertyimages/?propertyId=SOME_ID&propertyId=SOME_OTHER_ID',
      headers,
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(propertyImagesStub)
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
        propertyIds: ['SOME_ID', 'SOME_OTHER_ID'],
      },
    } as Request

    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    await getPropertyImages(req, res)

    expect(errorHandler).toHaveBeenCalledWith(error, res)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

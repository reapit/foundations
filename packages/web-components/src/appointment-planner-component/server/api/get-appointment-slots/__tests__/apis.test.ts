import { AppRequest } from '../../../../../../../utils/src/node/logger'
import { getOfficesByPostcode } from '../apis'
import { fetcher } from '../../../../../common/utils/fetcher-server'
import { officesStub } from '../stubs/offices'
import { stringify } from 'querystring'
import { logger } from '../../../core/logger'
import { getServerHeaders } from '../../../../../common/utils/get-server-headers'

jest.mock('../../../core/logger')
jest.mock('../../../../../common/utils/fetcher-server')
jest.mock('../../../../../common/utils/get-server-headers')

describe('getOfficesByPostcode', () => {
  beforeAll(() => {
    process.env.PLATFORM_API_BASE_URL = 'https://localhost.com'
  })

  test('happy case', async () => {
    const mockRequest = ({
      traceId: '123',
      query: {
        postcode: '123',
      },
    } as unknown) as AppRequest
    ;(fetcher as jest.Mock).mockReturnValueOnce(officesStub)

    const url = new URL(
      `${process.env.PLATFORM_API_BASE_URL}/offices/?${stringify({
        address: mockRequest.query?.postcode,
        embed: 'negotiators',
      })}`,
    )

    const mockHeader = 'header'
    ;(getServerHeaders as jest.Mock).mockResolvedValue(mockHeader)

    expect(await getOfficesByPostcode(mockRequest)).toEqual(officesStub)

    expect(fetcher).toHaveBeenCalledWith({
      url: String(url),
      headers: mockHeader,
    })

    expect(logger.info).toHaveBeenCalledWith('getOfficesByPostcode', {
      traceId: mockRequest.traceId,
      postcode: mockRequest.query.postcode,
    })
  })
})

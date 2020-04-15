import { DEFAULT_HEADERS, PACKAGE_SUFFIXES, DEFAULT_HEADERS_SERVER } from '../constants'
import { getServerHeaders } from '../get-server-headers'
import { fetcher } from '../fetcher-server'
import { Request } from 'express'

jest.mock('../fetcher-server')

describe('getServerHeaders', () => {
  it('should return the correct headers when not in local mode', async () => {
    const apiKey = 'SOME_KEY'
    const req = ({
      headers: {
        'x-api-key': apiKey,
      },
    } as unknown) as Request
    expect(await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)).toEqual({ ...req.headers, ...DEFAULT_HEADERS })
  })

  it('should return the correct headers for local development', async () => {
    process.env.APP_ENV = 'local'
    const token = 'SOME_TOKEN'
    ;(fetcher as jest.Mock).mockImplementation(() => ({
      access_token: token,
    }))
    const apiKey = 'SOME_KEY'
    const req = ({
      headers: {
        ...DEFAULT_HEADERS,
        'x-api-key': apiKey,
      },
    } as unknown) as Request
    const expected = {
      ...DEFAULT_HEADERS,
      ...DEFAULT_HEADERS_SERVER,
      Authorization: `Bearer ${token}`,
    }
    expect(await getServerHeaders(req, PACKAGE_SUFFIXES.SEARCH_WIDGET)).toEqual(expected)
  })
})

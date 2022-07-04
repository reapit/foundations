import {
  fetcher,
  FetchError,
  fetcherWithBlob,
  fetcherWithReturnHeader,
  fetcherWithRawUrl,
  extractNetworkErrString,
} from '..'
import { errorMessages } from '../../constants/error-messages'

const stub = {
  name: 'bob',
}

describe('fetcherWithRawUrl', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => stub,
      headers: { key: 'val' },
    })

    const params = {
      url: 'some-url',
      method: 'GET' as any,
      headers: {},
    }
    const response = await fetcherWithRawUrl(params)

    expect(response).toEqual(stub)
  })

  it('fetches and catches an error if status code is over 400', async () => {
    ;(console.error as any) = jest.fn()
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    })

    const params = {
      url: 'some-url',
      method: 'GET' as any,
      headers: {},
    }

    try {
      const response = await fetcherWithRawUrl(params)
      expect(response).toBeUndefined()
    } catch (err: any) {
      expect(err).toBeInstanceOf(FetchError)
      expect(err.message).toEqual(
        `Foundations API error: Status: 400 Method: ${params.method} Path: ${params.url} {"status":400}`,
      )
    }
  })
})

describe('fetcherWithReturnHeader', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      blob: () => stub,
      headers: { key: 'val' },
    })

    const fetcherWithReturnHeaderParams = {
      api: 'https://some-api/',
      url: 'some-url',
      method: 'GET' as any,
      headers: {},
    }
    const response = await fetcherWithReturnHeader(fetcherWithReturnHeaderParams)

    expect(response).toEqual({ key: 'val' })
  })

  it('fetches and catches an error if status code is over 400', async () => {
    ;(console.error as any) = jest.fn()
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    })

    const url = '/some-url'
    const api = 'https://some-api/'
    try {
      const response = await fetcherWithReturnHeader({
        api,
        url,
        method: 'GET',
        headers: {},
      })
      expect(response).toBeUndefined()
    } catch (err: any) {
      expect(err).toBeInstanceOf(FetchError)
      expect(err.message).toEqual(`Foundations API error: Status: 400 Method: GET Path: ${url} {"status":400}`)
    }
  })
})

describe('fetcherWithBob', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      blob: () => stub,
    })

    const response = await fetcherWithBlob({
      api: 'https://some-api/',
      url: 'some-url',
      method: 'GET',
      headers: {},
    })

    expect(response).toEqual(stub)
  })

  it('fetches and catches an error if status code is over 400', async () => {
    ;(console.error as any) = jest.fn()
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    })

    const url = '/some-url'
    const api = 'https://some-api/'
    try {
      const response = await fetcherWithBlob({
        api,
        url,
        method: 'GET',
        headers: {},
      })
      expect(response).toBeUndefined()
    } catch (err: any) {
      expect(err).toBeInstanceOf(FetchError)
      expect(err.message).toEqual(`Foundations API error: Status: 400 Method: GET Path: ${url} {"status":400}`)
    }
  })
})

describe('fetcher', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => stub,
    })

    const response = await fetcher({
      api: 'https://some-api/',
      url: 'some-url',
      method: 'GET',
      headers: {},
    })

    expect(response).toEqual(stub)
  })

  it('fetches and catches an error if status code is over 400', async () => {
    ;(console.error as any) = jest.fn()
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    })

    const url = '/some-url'
    const api = 'https://some-api/'
    try {
      const response = await fetcher({
        api,
        url,
        method: 'GET',
        headers: {},
      })
      expect(response).toBeUndefined()
    } catch (err: any) {
      expect(err).toBeInstanceOf(FetchError)
      expect(err.message).toEqual(`Foundations API error: Status: 400 Method: GET Path: ${url} {"status":400}`)
    }
  })
})

describe('extractNetworkErrString', () => {
  it('should run correctly with error type string', () => {
    const mockError = 'err'
    expect(extractNetworkErrString(mockError)).toBe(mockError)
  })

  it('should run correctly with non standard network error object', () => {
    const mockError = 'err'
    expect(
      extractNetworkErrString({
        description: mockError,
      }),
    ).toBe(errorMessages.DEFAULT_SERVER_ERROR)
  })

  it('should run correctly with standard network error object', () => {
    const mockError = 'err'
    expect(
      extractNetworkErrString({
        response: {
          description: mockError,
        },
      }),
    ).toBe(mockError)
  })
})

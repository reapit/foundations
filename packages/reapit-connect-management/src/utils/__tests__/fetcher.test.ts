import { fetcher } from '../fetcher'
import { BASE_HEADERS } from '../../constants/api'

jest.mock('react-router', () => ({
  genPlatformHeaders: jest.fn(() => ({ ...BASE_HEADERS, Authorization: 'accessToken' })),
}))

const mockResponse = {
  name: 'Reapit',
}

describe('fetcher', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => mockResponse,
    })
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

    const response = await fetcher('some-path')

    expect(response).toEqual(mockResponse)
  })
})

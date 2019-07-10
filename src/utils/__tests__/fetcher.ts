import fetcher from '../fetcher'
import { REAPIT_API_BASE_URL, MARKETPLACE_HEADERS } from '../../constants/api'

const stub = {
  name: 'bob'
}

describe('fetcher', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => stub
    })

    const response = await fetcher({ url: 'some-url', method: 'GET', headers: MARKETPLACE_HEADERS })

    expect(response).toEqual(stub)
  })

  it('fetches and catches an error if status code is over 400', async () => {
    ;(console.error as any) = jest.fn()
    window.fetch = jest.fn().mockReturnValue({
      status: 400
    })

    const url = '/some-url'
    const response = await fetcher({ url, method: 'GET', headers: MARKETPLACE_HEADERS })

    expect(response).toBeUndefined()
    expect(console.error).toHaveBeenCalledWith(
      'API ERROR: ',
      JSON.stringify(`ERROR FETCHING GET ${REAPIT_API_BASE_URL}${url} {"status":400}`)
    )
  })
})

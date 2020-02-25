import { fetcher } from '../fetcher'

const stub = {
  name: 'bob',
}

describe('fetcher', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      ok: true,
      json: () => stub,
    })

    const response = await fetcher({
      api: 'http://some-api/',
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
      ok: false,
    })

    const url = '/some-url'
    const api = 'http://some-api/'

    const response = await fetcher({
      api,
      url,
      method: 'GET',
      headers: {},
    })
    expect(response).toBeUndefined()

    expect(console.error).toHaveBeenCalledWith(`ERROR FETCHING GET ${api}${url} {"status":400,"ok":false}`)
  })
})

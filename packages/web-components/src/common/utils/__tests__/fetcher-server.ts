import { fetcher } from '../fetcher-server'

const stub = {
  name: 'bob',
}

describe('fetcher-server', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      ok: true,
      json: () => stub,
    })

    const response = await fetcher({
      url: 'http://some-api/some-url',
      method: 'GET',
      headers: {},
    })

    expect(response).toEqual(stub)
  })

  it('fetches and throws an error if status code is over 400', async () => {
    ;(console.error as any) = jest.fn()
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      ok: false,
      json: () => 'Error',
    })

    const url = 'http://some-api/some-url'

    try {
      await fetcher({
        url,
        method: 'GET',
        headers: {},
      })
    } catch (err) {
      expect(err.message).toEqual(`400 GET ${url} ${JSON.stringify('Error')}`)
    }
  })
})

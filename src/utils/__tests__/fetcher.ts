import fetcher from '../fetcher'
import { BASE_URL } from '../../constants/api'

const stub = {
  name: 'bob'
}

describe('fetcher', () => {
  it('fetches and returns data if status code is less than 400', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => stub
    })

    const response = await fetcher({ url: 'some-url', method: 'GET' })

    expect(response).toEqual(stub)
  })

  it('fetches and catches an error if status code is over 400', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    window.fetch = jest.fn().mockReturnValue({
      status: 400
    })

    const url = '/some-url'
    const response = await fetcher({ url, method: 'GET' })

    expect(response).toBeUndefined()
    expect(errorSpy).toHaveBeenCalledWith(
      'API ERROR: ',
      JSON.stringify(`ERROR FETCHING GET ${BASE_URL}${url} {"status":400}`)
    )
  })
})

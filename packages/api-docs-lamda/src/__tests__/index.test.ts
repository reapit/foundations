import axios from 'axios'
import { API_DOCS_URL, apiDocsHandler, CONTENT_SECURITY_WHITELIST } from '../index'

jest.mock('axios', () => ({
  get: jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          data: '<div>HTML STRING</div>',
          headers: {
            'Content-Type': 'text/html',
          },
        })
      }),
  ),
}))

describe('apiDocsHandler', () => {
  it('should fetch from axios then return the response data with correct headers', async () => {
    const result = await apiDocsHandler()

    expect(axios.get).toBeCalledWith(API_DOCS_URL)
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Security-Policy': `frame-ancestors 'self' ${CONTENT_SECURITY_WHITELIST}`,
      },
      body: '<div>HTML STRING</div>',
    })
  })
})

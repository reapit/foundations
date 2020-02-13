import * as React from 'react'
import { shallow } from 'enzyme'

import Swagger, { handleOnComplete, fetchInterceptor } from '../swagger'

jest.mock('../../../core/store')

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Swagger />)).toMatchSnapshot()
  })

  it('should have a fetchInterceptor that adds a token when the url is not swagger', async () => {
    process.env.SWAGGER_BASE_URL = 'https://some-url.com'
    const request = {
      url: 'https://some-other-url.com',
    }
    const result = await fetchInterceptor(request)
    const output = {
      ...request,
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'latest',
        Authorization: 'Bearer null',
      },
    }
    expect(result).toEqual(output)
  })

  it('should have a fetchInterceptor that returns the params when the url is swagger', async () => {
    process.env.SWAGGER_BASE_URL = 'https://some-url.com'
    const request = {
      url: process.env.SWAGGER_BASE_URL,
    }
    const result = await fetchInterceptor(request)
    expect(result).toEqual(request)
  })

  it('handleOnComplete', () => {
    const setLoading = jest.fn()
    const fn = handleOnComplete(setLoading)
    fn()
    expect(setLoading).toBeCalledWith(false)
  })
})

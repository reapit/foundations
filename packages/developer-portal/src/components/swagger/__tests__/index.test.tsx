import React from 'react'
import { render } from '../../../tests/react-testing'
import Swagger, { handleOnComplete, fetchInterceptor, InterceptorParams } from '..'

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(render(<Swagger swaggerUri={'https://api.swagger.com'} />)).toMatchSnapshot()
  })

  it('should have a fetchInterceptor that adds a token when the url is not swagger', () => {
    window.reapit.config.platformApiUrl = 'https://some-url.com'
    const request = {
      url: 'https://some-other-url.com/docs',
      headers: {
        'Content-Type': 'application/json',
      },
    } as InterceptorParams
    const token = 'SOME_TOKEN'
    const result = fetchInterceptor(request, token)
    const output = {
      ...request,
      headers: {
        ...request.headers,
        'api-version': '2020-01-31',
        Authorization: `Bearer ${token}`,
      },
    }
    expect(result).toEqual(output)
  })

  it('should have a fetchInterceptor that returns the params when the url is swagger', () => {
    window.reapit.config.platformApiUrl = 'https://some-url.com'
    const request = {
      url: 'https://some-url.com/docs',
      headers: {
        Authorization: 'Bearer SOME_TOKEN',
        'Content-Type': 'application/json',
        'api-version': '2020-01-31',
      },
    } as InterceptorParams
    const token = 'SOME_TOKEN'
    const result = fetchInterceptor(request, token)
    expect(result).toEqual(request)
  })

  it('handles onComplete', () => {
    const setLoading = jest.fn()
    const curried = handleOnComplete(setLoading)
    curried()
    expect(setLoading).toBeCalledWith(false)
  })
})

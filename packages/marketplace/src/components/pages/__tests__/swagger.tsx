import * as React from 'react'
import { shallow } from 'enzyme'
import { getAccessToken } from '@/utils/session'

import Swagger, { handleOnComplete, fetchInterceptor, fetchAccessToken } from '../swagger'

jest.mock('../../../core/store')
jest.mock('@/utils/session')

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Swagger />)).toMatchSnapshot()
  })

  it('should have a fetchInterceptor that adds a token when the url is not swagger', () => {
    process.env.SWAGGER_BASE_URL = 'https://some-url.com'
    const request = {
      url: 'https://some-other-url.com',
    }
    const token = 'SOME_TOKEN'
    const result = fetchInterceptor(request, token)
    const output = {
      ...request,
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'latest',
        Authorization: `Bearer ${token}`,
      },
    }
    expect(result).toEqual(output)
  })

  it('should have a fetchInterceptor that returns the params when the url is swagger', async () => {
    process.env.SWAGGER_BASE_URL = 'https://some-url.com'
    const request = {
      url: process.env.SWAGGER_BASE_URL,
    }
    const token = 'SOME_TOKEN'
    const result = await fetchInterceptor(request, token)
    expect(result).toEqual(request)
  })

  it('handles onComplete', () => {
    const setLoading = jest.fn()
    const fn = handleOnComplete(setLoading)
    fn()
    expect(setLoading).toBeCalledWith(false)
  })

  it('sets the accessToken', async () => {
    const token = 'SOME_TOKEN'
    ;(getAccessToken as jest.Mock).mockImplementation(() => token)
    const setAccessToken = jest.fn()

    await fetchAccessToken(setAccessToken)

    expect(setAccessToken).toBeCalledWith(token)
  })
})

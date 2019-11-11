import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Swagger, { handleOnComplete, fetchInterceptor } from '../swagger'
import { MARKETPLACE_HEADERS } from '@/constants/api'

jest.mock('../../../core/store')

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Swagger />))).toMatchSnapshot()
  })
  it('handleOnComplete', () => {
    const setLoading = jest.fn()
    const fn = handleOnComplete(setLoading)
    fn()
    expect(setLoading).toBeCalledWith(false)
  })
  it('fetchInterceptor', async () => {
    const result = await fetchInterceptor({})
    const output = {
      headers: {
        ...MARKETPLACE_HEADERS,
        Authorization: `Bearer null`
      }
    }
    expect(result).toEqual(output)
  })
})

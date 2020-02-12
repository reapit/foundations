import * as React from 'react'
import { shallow } from 'enzyme'

import Swagger, { handleOnComplete } from '../swagger'

jest.mock('../../../core/store')

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Swagger />)).toMatchSnapshot()
  })
  it('handleOnComplete', () => {
    const setLoading = jest.fn()
    const fn = handleOnComplete(setLoading)
    fn()
    expect(setLoading).toBeCalledWith(false)
  })
})

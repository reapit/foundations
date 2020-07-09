import * as React from 'react'
import { shallow } from 'enzyme'
import { ErrorContent } from '../error-content'

describe('ErrorContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ErrorContent afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import { SuccessContent } from '../success-content'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('SuccessContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SuccessContent developer={developerStub} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

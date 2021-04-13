import * as React from 'react'
import { shallow } from 'enzyme'
import { SnackHolder } from '../'

describe('SnackHolder component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<SnackHolder snacks={[]} />)
    expect(wrapper).toMatchSnapshot()
  })
})

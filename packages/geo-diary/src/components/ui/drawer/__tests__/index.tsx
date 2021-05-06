import * as React from 'react'
import { shallow } from 'enzyme'
import Drawer from '../'

describe('Drawer component', () => {
  it('should match a snapshot when closed', () => {
    const wrapper = shallow(
      <Drawer isOpen={false} handleClose={() => {}}>
        Hello. I am content.
      </Drawer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when open', () => {
    const wrapper = shallow(
      <Drawer isOpen={true} handleClose={() => {}}>
        Hello. I am content.
      </Drawer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

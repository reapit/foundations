import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Drawer from '../'

describe('Drawer component', () => {
  it('should match a snapshot when closed', () => {
    const wrapper = render(
      <Drawer isOpen={false} handleClose={() => {}}>
        Hello. I am content.
      </Drawer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when open', () => {
    const wrapper = render(
      <Drawer isOpen={true} handleClose={() => {}}>
        Hello. I am content.
      </Drawer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

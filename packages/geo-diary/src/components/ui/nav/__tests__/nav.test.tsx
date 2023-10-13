import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { Nav } from '../nav'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})

import * as React from 'react'
import { render } from '../..//tests/react-testing'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PrivateRoute allow="CLIENT" loginType="CLIENT" component={() => null} />)
    expect(wrapper).toMatchSnapshot()
  })
})

import * as React from 'react'
import { render } from '../../tests/react-testing'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(render(<PrivateRoute component={() => null} />)).toMatchSnapshot()
  })
})

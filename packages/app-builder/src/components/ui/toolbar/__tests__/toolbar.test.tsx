import * as React from 'react'
import { render } from '@testing-library/react'
import { Toolbar } from '../index'

describe('Toolbar', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <Toolbar>
        <></>
      </Toolbar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

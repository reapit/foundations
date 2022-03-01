import * as React from 'react'
import { render } from '@testing-library/react'
import { Toolbar } from '../index'

describe('Toolbar', () => {
  it('should match a snapshot - inactive', () => {
    const { asFragment } = render(
      <Toolbar active={false}>
        <></>
      </Toolbar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should match a snapshot - active', () => {
    const { asFragment } = render(
      <Toolbar active>
        <></>
      </Toolbar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

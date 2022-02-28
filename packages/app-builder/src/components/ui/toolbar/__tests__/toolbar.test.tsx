import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Toolbar } from '../index'

describe('Toolbar', () => {
  it('should match a snapshot - inactive', () => {
    render(
      <Toolbar active={false}>
        <></>
      </Toolbar>,
    )
    expect(screen).toMatchSnapshot()
  })
  it('should match a snapshot - active', () => {
    render(
      <Toolbar active>
        <></>
      </Toolbar>,
    )
    expect(screen).toMatchSnapshot()
  })
})

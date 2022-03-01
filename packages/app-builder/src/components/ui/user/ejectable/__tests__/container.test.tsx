import * as React from 'react'
import { render } from '@testing-library/react'
import { Container } from '../container'

describe('Container', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(<Container width={0} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

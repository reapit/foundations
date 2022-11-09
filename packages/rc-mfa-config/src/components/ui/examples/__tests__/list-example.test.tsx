import React from 'react'
import { render } from '@testing-library/react'
import ListExample from '../list-example'

describe('ListExample', () => {
  it('should match a snapshot', () => {
    expect(render(<ListExample />)).toMatchSnapshot()
  })
})

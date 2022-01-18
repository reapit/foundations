import React from 'react'
import { render } from '@testing-library/react'
import TableExample from '../table-example'

describe('TableExample', () => {
  it('should match a snapshot', () => {
    expect(render(<TableExample />)).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import FormExample from '../form-example'

describe('FormExample', () => {
  it('should match a snapshot', () => {
    expect(render(<FormExample />)).toMatchSnapshot()
  })
})

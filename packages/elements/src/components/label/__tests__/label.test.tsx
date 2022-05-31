import React from 'react'
import { render } from '@testing-library/react'
import { Label } from '..'

describe('Label component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Label />)
    expect(wrapper).toMatchSnapshot()
  })
})

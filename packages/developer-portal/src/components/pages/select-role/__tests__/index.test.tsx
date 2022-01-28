import { render } from '@testing-library/react'
import React from 'react'
import SelectRolePage from '../index'

describe('AppTypeOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<SelectRolePage />)).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '../../../tests/react-testing'
import EmailRow from '../email-row'

describe('EmailRow', () => {
  it('should match snapshot', () => {
    expect(render(<EmailRow label="Label" email="mail@example.com" />)).toMatchSnapshot()
  })
})

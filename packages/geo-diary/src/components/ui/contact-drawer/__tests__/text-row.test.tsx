import React from 'react'
import { render } from '../../../tests/react-testing'
import TextRow from '../text-row'

describe('TextRow', () => {
  it('should match snapshot', () => {
    expect(render(<TextRow label="Label" content="blah blah" />)).toMatchSnapshot()
  })
})

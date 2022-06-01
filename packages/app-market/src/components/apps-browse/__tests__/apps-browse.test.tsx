import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppsBrowse } from '../apps-browse'

describe('AppsBrowse', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsBrowse />)).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppsInstalled } from '../apps-installed'

describe('AppsInstalled', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsInstalled />)).toMatchSnapshot()
  })
})

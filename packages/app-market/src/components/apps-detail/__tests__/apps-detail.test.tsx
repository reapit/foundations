import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppsDetail } from '../apps-detail'

describe('AppsDetail', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsDetail />)).toMatchSnapshot()
  })
})

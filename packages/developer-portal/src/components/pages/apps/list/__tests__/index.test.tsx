import React from 'react'
import { AppsList } from '..'
import { render } from '../../../../../tests/react-testing'

describe('AppsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsList />)).toMatchSnapshot()
  })
})

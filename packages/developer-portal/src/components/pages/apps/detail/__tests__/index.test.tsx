import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppDetail } from '..'

jest.mock('../../state/use-app-state')

describe('AppDetail', () => {
  it('should match snapshot', () => {
    expect(render(<AppDetail />)).toMatchSnapshot()
  })
})

import React from 'react'
import { AppsList } from '..'
import { render } from '../../../../tests/react-testing'

jest.mock('../../state/use-app-state')

describe('AppsList', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsList />)).toMatchSnapshot()
  })
})

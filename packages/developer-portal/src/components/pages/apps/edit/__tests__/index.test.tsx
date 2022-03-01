import React from 'react'
import AppEditPage from '..'
import { render } from '../../../../../tests/react-testing'

jest.mock('../../state/use-app-state')

describe('AppEditPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppEditPage />)).toMatchSnapshot()
  })
})

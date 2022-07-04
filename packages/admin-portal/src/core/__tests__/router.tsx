import * as React from 'react'
import { render } from '../../tests/react-testing'
import Router from '../router'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('Router', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(render(<Router />)).toMatchSnapshot()
  })
})

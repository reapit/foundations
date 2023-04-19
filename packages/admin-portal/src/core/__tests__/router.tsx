import * as React from 'react'
import { render } from '../../tests/react-testing'
import { RoutesComponent } from '../router'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('RoutesComponent', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(render(<RoutesComponent />)).toMatchSnapshot()
  })
})

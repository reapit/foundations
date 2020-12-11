import * as React from 'react'
import { shallow } from 'enzyme'
import Payments from '../payments'

const locationMock = { pathname: '/payments' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

describe('Payments', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Payments />)).toMatchSnapshot()
  })
})

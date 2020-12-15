import * as React from 'react'
import { shallow } from 'enzyme'
import Payment from '../payment'

const locationMock = { pathname: '/payments' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

describe('Payment', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Payment />)).toMatchSnapshot()
  })
})

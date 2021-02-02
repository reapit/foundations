import * as React from 'react'
import { shallow } from 'enzyme'
import Payments from '../payments'

const locationMock = { search: '', pathname: '/test' }

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useHistory: () => ({ push: jest.fn() }),
  useLocation: jest.fn(() => locationMock),
}))

describe('Payments ', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Payments />)).toMatchSnapshot()
  })
})

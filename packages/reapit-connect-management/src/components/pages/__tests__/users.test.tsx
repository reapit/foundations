import * as React from 'react'
import { shallow } from 'enzyme'
import UsersPage from '../users'

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/users',
  })),

  useHistory: jest.fn(() => ({
    history: () => {},
  })),
}))

describe('UsersPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UsersPage />)).toMatchSnapshot()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesPage from '../offices'

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/offices',
  })),

  useHistory: jest.fn(() => ({
    history: () => {},
  })),
}))

describe('OfficesPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficesPage />)).toMatchSnapshot()
  })
})

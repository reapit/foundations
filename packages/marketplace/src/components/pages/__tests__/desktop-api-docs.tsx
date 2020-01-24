import * as React from 'react'
import { shallow } from 'enzyme'
import DesktopApiDocs from '../desktop-api-docs'

jest.mock('../../../core/store')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    location: { hash: '' },
  })),
}))

describe('DesktopApiDocs', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DesktopApiDocs />)).toMatchSnapshot()
  })
})

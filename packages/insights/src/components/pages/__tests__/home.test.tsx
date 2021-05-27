import * as React from 'react'
import { shallow } from 'enzyme'
import Home from '../home'

jest.mock('powerbi-client', () => ({
  service: {
    Service: jest.fn(),
  },
  factories: jest.fn(),
}))

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Home />)).toMatchSnapshot()
  })
})

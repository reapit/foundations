import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PrivateRouteWrapper } from '../private-route-wrapper'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRouteWrapper />))).toMatchSnapshot()
  })
})

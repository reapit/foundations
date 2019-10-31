import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Analytics from '../analytics'

jest.mock('../../../core/store')

describe('Analytics', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Analytics />))).toMatchSnapshot()
  })
})

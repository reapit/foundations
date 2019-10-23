import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import WebComponents from '../web-components'

jest.mock('../../../core/store')

describe('WebComponents', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<WebComponents />))).toMatchSnapshot()
  })
})

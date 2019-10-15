import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Swagger from '../swagger'

jest.mock('../../../core/store')

describe('Swagger', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Swagger />))).toMatchSnapshot()
  })
})

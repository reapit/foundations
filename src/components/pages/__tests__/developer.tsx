import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Developer, DeveloperProps } from '../developer'

const props: DeveloperProps = {
  logout: jest.fn()
}

describe('Developer', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Developer {...props} />))).toMatchSnapshot()
  })
})

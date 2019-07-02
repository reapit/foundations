import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SubmitApp } from '../developer-submit-app'

describe('DeveloperSubmitApp', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<SubmitApp />))).toMatchSnapshot()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ApiDocs from '../api-docs'

describe('ApiDocs', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ApiDocs />))).toMatchSnapshot()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import ApiDocs from '../api-docs'

describe('ApiDocs', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ApiDocs />)).toMatchSnapshot()
  })
})

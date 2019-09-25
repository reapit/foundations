import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SuccessPage } from '../success'

describe('SuccessPage', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<SuccessPage />))).toMatchSnapshot()
  })
})

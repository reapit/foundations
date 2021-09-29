import React from 'react'
import { shallow } from 'enzyme'
import { OkayPage } from '../ok-page'

describe('OkayPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OkayPage />)).toMatchSnapshot()
  })
})

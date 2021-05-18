import React from 'react'
import { shallow } from 'enzyme'
import EmailRow from '../email-row'

describe('EmailRow', () => {
  it('should match snapshot', () => {
    expect(shallow(<EmailRow label="Label" email="mail@example.com" />)).toMatchSnapshot()
  })
})

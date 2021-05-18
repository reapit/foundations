import React from 'react'
import { shallow } from 'enzyme'
import TextRow from '../text-row'

describe('TextRow', () => {
  it('should match snapshot', () => {
    expect(shallow(<TextRow label="Label" content="blah blah" />)).toMatchSnapshot()
  })
})

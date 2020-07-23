import React from 'react'
import { shallow } from 'enzyme'
import AcceptedModal from '../accepted'

describe('AcceptedModal', () => {
  it('should match snapshot', () => {
    expect(shallow(<AcceptedModal visible />)).toMatchSnapshot()
  })
})

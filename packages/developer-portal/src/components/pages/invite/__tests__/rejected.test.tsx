import React from 'react'
import { shallow } from 'enzyme'
import RejectedModal from '../rejected'

describe('AcceptedModal', () => {
  it('should match snapshot', () => {
    expect(shallow(<RejectedModal visible />)).toMatchSnapshot()
  })
})

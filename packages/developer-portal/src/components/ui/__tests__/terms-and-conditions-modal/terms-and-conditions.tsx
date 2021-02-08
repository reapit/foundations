import React from 'react'
import { TermsAndConditions } from '../../terms-and-conditions-modal/terms-and-conditions'
import { shallow } from 'enzyme'

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<TermsAndConditions />)
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import ContactInformationSection from '../contact-information-section'

describe('AccountsInformationForm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ContactInformationSection />)
    expect(wrapper).toMatchSnapshot()
  })
})

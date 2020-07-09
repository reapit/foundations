import React from 'react'
import { shallow } from 'enzyme'
import AccountsInformationForm from '../accounts-information-form'

describe('AccountsInformationForm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AccountsInformationForm />)
    expect(wrapper).toMatchSnapshot()
  })
})

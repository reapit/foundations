import React from 'react'
import { TermsAndConditionsModal } from '../../terms-and-conditions-modal'
import { shallow } from 'enzyme'

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<TermsAndConditionsModal visible={true} onAccept={jest.fn} />)
    expect(wrapper).toMatchSnapshot()
  })
})

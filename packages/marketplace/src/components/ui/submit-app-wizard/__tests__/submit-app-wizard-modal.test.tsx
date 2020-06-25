import { SubmitAppWizardModal } from '../submit-app-wizard-modal'
import React from 'react'
import { shallow } from 'enzyme'

describe('SubmitAppWizardModal', () => {
  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizardModal visible={true} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizardModal visible={false} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

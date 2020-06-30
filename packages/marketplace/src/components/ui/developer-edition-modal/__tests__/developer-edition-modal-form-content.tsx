import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperEditionModalFormContent } from '../developer-edition-modal-form-content'

const dropdownOptions = [{ value: 'value', label: 'label', description: 'description' }]
describe('DeveloperInviteMemberModalFooter', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperEditionModalFormContent dropdownOptions={dropdownOptions} />)
    expect(wrapper).toMatchSnapshot()
  })
})

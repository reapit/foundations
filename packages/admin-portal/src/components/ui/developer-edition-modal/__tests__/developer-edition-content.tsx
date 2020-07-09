import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperEditionContent } from '../developer-edition-content'

const dropdownOptions = [{ value: 'value', label: 'label', description: 'description' }]

describe('DeveloperEditionContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <DeveloperEditionContent dropdownOptions={dropdownOptions} loading={false} onFormSubmit={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

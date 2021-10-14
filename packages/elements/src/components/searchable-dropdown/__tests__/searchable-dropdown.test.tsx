import React from 'react'
import { shallow } from 'enzyme'
import { SearchableDropdown } from '..'

describe('SearchableDropdown component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <SearchableDropdown getResults={async () => []} getResultLabel={() => ''} getResultValue={() => ''} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

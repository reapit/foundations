import React from 'react'
import { shallow } from 'enzyme'
import { DiffCheckbox, DiffCheckboxProps } from '../diff-checkbox'

const mockProps: DiffCheckboxProps = {
  currentChecked: true,
  changedChecked: false,
}

describe('DiffCheckbox', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DiffCheckbox {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '../../../../tests/react-testing'
import { DiffCheckbox, DiffCheckboxProps } from '../diff-checkbox'

const mockProps: DiffCheckboxProps = {
  currentChecked: true,
  changedChecked: false,
}

describe('DiffCheckbox', () => {
  it('should match snapshot', () => {
    const wrapper = render(<DiffCheckbox {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

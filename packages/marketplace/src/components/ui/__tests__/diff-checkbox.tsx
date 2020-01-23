import * as React from 'react'
import { shallow } from 'enzyme'
import DiffCheckbox, { DiffCheckboxProps } from '../diff-checkbox'
import toJson from 'enzyme-to-json'

const props: DiffCheckboxProps = {
  changedChecked: false,
  currentChecked: true
}

describe('DiffCheckbox', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DiffCheckbox {...props} />))).toMatchSnapshot()
  })

  it('should only render one checkbox if no different', () => {
    const wrapper = shallow(<DiffCheckbox changedChecked={false} currentChecked={false} />)
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

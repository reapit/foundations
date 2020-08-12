import React from 'react'
import { shallow } from 'enzyme'
import HelperText, { HelperTextProps } from '../helper-text'

describe('HelperText', () => {
  const mockProps: HelperTextProps = {
    text: 'Please now click ‘Submit to Accounts’ to continue',
  }
  it('should match snapshot', () => {
    const wrapper = shallow(<HelperText {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

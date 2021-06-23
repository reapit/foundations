import * as React from 'react'
import { shallow } from 'enzyme'
import { CustomTag, CustomTagProps } from '../custom-tag'

const props: CustomTagProps = {
  label: 'Property',
  description: `The type of Property will be given to an application that can be launched for a 
    specific property from Agency Cloud.`,
  link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-1',
  onClose: jest.fn(),
}

describe('CustomTag', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CustomTag {...props} />)).toMatchSnapshot()
  })

  it('should call onClose when click remove', () => {
    const wrapper = shallow(<CustomTag {...props} />)
    const element = wrapper.find('a')
    element.simulate('click')
    expect(props.onClose).toHaveBeenCalled()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import CallToAction, { CallToActionCardProps } from '../call-to-action'
import toJson from 'enzyme-to-json'
import { AcButton } from '@reapit/elements'

const props: CallToActionCardProps = {
  buttonText: 'My button',
  title: 'My title'
}

describe('CallToAction', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<CallToAction {...props} />))).toMatchSnapshot()
  })

  it('should allow custom className', () => {
    const wrapper = shallow(<CallToAction {...props} className="addition" />)
    expect(wrapper.find('.addition')).toHaveLength(1)
  })

  it('simulates onButtonClick event', () => {
    const mockButtonClick = jest.fn()
    const wrapper = shallow(<CallToAction {...props} onButtonClick={mockButtonClick} />)
    wrapper.find('Button').simulate('click')
    expect(mockButtonClick).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

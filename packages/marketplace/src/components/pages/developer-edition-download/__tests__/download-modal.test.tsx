import React from 'react'
import { DeveloperEditionDownload, onDownload } from '../download-modal'
import { shallow } from 'enzyme'

describe('DeveloperEditionDownload', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperEditionDownload />)
    expect(wrapper).toMatchSnapshot()

    const button = wrapper.find('.is-pulled-right.mt-5')

    button.simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})

describe('onSetCompleted', () => {
  it('should run correctly', () => {
    const setIsCompleted = jest.fn() as React.Dispatch<boolean>
    const fn = onDownload(setIsCompleted)
    fn()
    expect(setIsCompleted).toBeCalledWith(true)
  })
})

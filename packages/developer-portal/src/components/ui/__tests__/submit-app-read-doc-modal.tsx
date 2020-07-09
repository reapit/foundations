import * as React from 'react'
import { shallow } from 'enzyme'
import { SubmitAppReadDocModal } from '../submit-app-read-doc-modal'

describe('SubmitAppReadDocModal', () => {
  const props = {
    visible: true,
    tapOutsideToDissmiss: jest.fn(),
  } as any

  it('should match snapshot with minimal props', () => {
    const wrapper = shallow(<SubmitAppReadDocModal {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with some additional props', () => {
    const newProps = {
      ...props,
      title: 'title',
      onContinueClick: jest.fn(),
      onViewDocClick: jest.fn(),
      tapOutsideToDissmiss: true,
    }
    const wrapper = shallow(<SubmitAppReadDocModal {...newProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import { Modal } from '../'

describe('Modal component', () => {
  it('should match a snapshot when closed', () => {
    const wrapper = shallow(
      <Modal isOpen={false} onModalClose={() => {}} title="test">
        Content within modal
      </Modal>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when open', () => {
    const wrapper = shallow(
      <Modal isOpen={true} onModalClose={() => {}} title="test">
        Content within modal
      </Modal>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

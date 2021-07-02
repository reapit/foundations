import React from 'react'
import { shallow } from 'enzyme'
import { Modal, ModalBg, ModalBody, ModalContainer, ModalHeader } from '..'

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

describe('ModalBg', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<ModalBg>Content within modal</ModalBg>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ModalContainer', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<ModalContainer>Content within modal</ModalContainer>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ModalHeader', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<ModalHeader>Content within modal</ModalHeader>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ModalBody', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<ModalBody>Content within modal</ModalBody>)
    expect(wrapper).toMatchSnapshot()
  })
})

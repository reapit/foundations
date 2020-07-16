import React from 'react'
import { shallow } from 'enzyme'
import { Modal } from '../modal'

describe('modal', () => {
  describe('Modal', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <Modal visible={true}>
          <div>children</div>
        </Modal>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when not show modal', () => {
      const wrapper = shallow(
        <Modal visible={false}>
          <div>children</div>
        </Modal>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when isCentered', () => {
      const wrapper = shallow(
        <Modal visible={true} isCentered={true}>
          <div>children</div>
        </Modal>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})

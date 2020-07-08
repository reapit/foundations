import React from 'react'
import { shallow } from 'enzyme'
import { Modal } from '../index'

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
  })
})

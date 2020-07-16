import React from 'react'
import { shallow } from 'enzyme'
import { ModalV2 } from '../index'

describe('modal', () => {
  describe('Modal', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <ModalV2 visible={true}>
          <div>children</div>
        </ModalV2>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})

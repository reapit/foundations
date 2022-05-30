import React from 'react'
import { render } from '../../../tests/react-testing'
import { ModalV2, ModalHeaderV2 } from '../index'

describe('modal', () => {
  describe('Modal', () => {
    it('should match snapshot', () => {
      const wrapper = render(
        <ModalV2 visible={true}>
          <div>children</div>
        </ModalV2>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('ModalHeaderV2', () => {
    it('should match snapshot', () => {
      const wrapper = render(<ModalHeaderV2>ModalHeaderV2</ModalHeaderV2>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})

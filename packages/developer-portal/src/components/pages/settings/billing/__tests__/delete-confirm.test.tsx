import { ConfirmModal, ConfirmModalProps } from '../delete-confirm'
import { shallow } from 'enzyme'
import React from 'react'
describe('ConfirmModal', () => {
  it('should match snapshot', () => {
    const props: ConfirmModalProps = {
      visible: true,
    }

    expect(shallow(<ConfirmModal {...props} />)).toMatchSnapshot()
  })
})

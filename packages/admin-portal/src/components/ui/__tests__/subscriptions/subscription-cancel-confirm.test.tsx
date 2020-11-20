import * as React from 'react'
import { mount } from 'enzyme'

import CancelConfirmModal, { CancelConfirmModalProps } from '../../subscriptions/subscription-cancel-confirm'

const initProps = (): CancelConfirmModalProps => ({
  onConfirm: jest.fn(),
  isShowConfirmModal: true,
  setCancelSubId: jest.fn(),
  isCanceling: false,
})

describe('CancelConfirmModal', () => {
  it('should render developer filter form', () => {
    expect(mount(<CancelConfirmModal {...initProps()} />)).toMatchSnapshot()
  })
})

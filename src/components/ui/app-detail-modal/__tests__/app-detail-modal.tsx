import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetailModal, AppDetailModalProps, handleAfterClose } from '../app-detail-modal'

const props: AppDetailModalProps = {
  visible: true,
  afterClose: jest.fn(),
  setAppDetailModalStateView: jest.fn()
}

describe('AppDetailModel', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppDetailModal {...props} />))).toMatchSnapshot()
  })
  describe('handleAfterClose have afterClose', () => {
    const afterClose = jest.fn()
    const setAppDetailModalStateView = jest.fn()
    const fn = handleAfterClose(setAppDetailModalStateView, afterClose)
    fn()
    expect(afterClose).toBeCalled()
    expect(setAppDetailModalStateView).toBeCalled()
  })
  describe('handleAfterClose doesnt have afterClose', () => {
    const afterClose = undefined
    const setAppDetailModalStateView = jest.fn()
    const fn = handleAfterClose(setAppDetailModalStateView, afterClose)
    fn()
    expect(setAppDetailModalStateView).toBeCalled()
  })
})

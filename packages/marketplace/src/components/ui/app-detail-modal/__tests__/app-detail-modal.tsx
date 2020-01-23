import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetailModal, AppDetailModalProps, handleAfterClose } from '../app-detail-modal'

const props: AppDetailModalProps = {
  visible: true,
  afterClose: jest.fn(),
  setAppDetailModalStateBrowse: jest.fn()
}

describe('AppDetailModel', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppDetailModal {...props} />))).toMatchSnapshot()
  })
  describe('handleAfterClose have afterClose', () => {
    const afterClose = jest.fn()
    const setAppDetailModalStateBrowse = jest.fn()
    const fn = handleAfterClose(setAppDetailModalStateBrowse, afterClose)
    fn()
    expect(afterClose).toBeCalled()
    expect(setAppDetailModalStateBrowse).toBeCalled()
  })
  describe('handleAfterClose doesnt have afterClose', () => {
    const afterClose = undefined
    const setAppDetailModalStateBrowse = jest.fn()
    const fn = handleAfterClose(setAppDetailModalStateBrowse, afterClose)
    fn()
    expect(setAppDetailModalStateBrowse).toBeCalled()
  })
})

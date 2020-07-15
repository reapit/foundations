import * as React from 'react'
import { mount } from 'enzyme'
import { UploadResultModal, UploadResultModalProp } from '../upload-result-modal'

describe('UploadResultModal', () => {
  describe('UploadResultModal', () => {
    const mockProps: UploadResultModalProp = {
      visible: true,
      onCloseClick: jest.fn(),
      results: {
        success: 0,
        failed: 0,
        total: 0,
        details: [],
      },
    }

    it('should match a snapshot', () => {
      const wrapper = mount(<UploadResultModal {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})

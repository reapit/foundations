import React from 'react'
import { render } from '@testing-library/react'
import UploadProvider, { handleCloseModal, handleUseEffect } from '../upload-provider'
/*
 * TODOME(UploadProvider)
 * import
 */

describe('UploadProvider', () => {
  /*
   * TODOME(UploadProvider)
   test should run
   dif status
   dif isComplete
   correct
   *
   */
  describe('handleUseEffect', () => {
    test('isCompleted = false and status = "UPLOADED"', () => {
      const setCompleted = jest.fn()
      handleUseEffect({ isCompleted: false, status: 'UPLOADED', setCompleted })()
      expect(setCompleted).toHaveBeenCalled()
    })
    test('isCompleted = false and status = "UPLOADING"', () => {
      const setCompleted = jest.fn()
      handleUseEffect({ isCompleted: false, status: 'UPLOADING', setCompleted })()
      expect(setCompleted).not.toHaveBeenCalled()
    })
    test('isCompleted = true and status = "UPLOADED"', () => {
      const setCompleted = jest.fn()
      handleUseEffect({ isCompleted: true, status: 'UPLOADED', setCompleted })()
      expect(setCompleted).not.toHaveBeenCalled()
    })
  })

  it('should match a snapshot', () => {
    const wrapper = render(
      <UploadProvider>
        <div />
      </UploadProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleCloseModal', () => {
    test('should run correctly', () => {
      const setCompleted = jest.fn()
      const dispatch = jest.fn()
      handleCloseModal(setCompleted, dispatch)()
      expect(setCompleted).toBeCalled()
      expect(dispatch).toBeCalled()
    })
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import UploadProvider, {
  startUpload,
  setUploadProgress,
  completeUpload,
  resetState,
  handleCloseModal,
  reducer,
  initialState,
  Action,
} from '../upload-provider'

describe('UploadProvider', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <UploadProvider>
        <div />
      </UploadProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('Actions', () => {
    test('startUpload', () => {
      expect(startUpload(20).type).toEqual('START_UPLOAD')
    })
    test('setUploadProgress', () => {
      expect(setUploadProgress(20).type).toEqual('UPLOAD_PROGRESS')
    })
    test('completeUpload', () => {
      expect(completeUpload({ total: 0, success: 0, failed: 0, details: [] }).type).toEqual('FINISH_UPLOAD')
    })
    test('startUpload', () => {
      expect(resetState().type).toEqual('RESET_STATE')
    })
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

  describe('reducer', () => {
    test('should handle START_UPLOAD', () => {
      const startAction: Action = {
        type: 'START_UPLOAD',
        payload: { totalItem: 10 },
      }
      expect(reducer(initialState, startAction).status).toEqual('UPLOADING')
      expect(reducer(initialState, startAction).totalItem).toEqual(10)
    })

    test('should handle UPLOAD_PROGRESS', () => {
      const startAction: Action = {
        type: 'UPLOAD_PROGRESS',
        payload: { completedItem: 10 },
      }
      expect(reducer(initialState, startAction).completedItem).toEqual(10)
    })

    test('should handle FINISH_UPLOAD', () => {
      const startAction: Action = {
        type: 'FINISH_UPLOAD',
      }
      expect(reducer(initialState, startAction).status).toEqual('UPLOADED')
    })

    test('should handle RESET_STATE', () => {
      const startAction: Action = {
        type: 'RESET_STATE',
      }
      expect(reducer(initialState, startAction)).toEqual(initialState)
    })
  })
})

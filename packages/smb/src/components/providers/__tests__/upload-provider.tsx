import React from 'react'
import { render } from '@testing-library/react'
import UploadProvider, { handleCloseModal } from '../upload-provider'

describe('UploadProvider', () => {
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

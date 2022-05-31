import React from 'react'
import { render } from '@testing-library/react'
import { UploadProgress, UploadProgressProps } from '../.'

describe('UploadProgress', () => {
  it('should match snapshot', () => {
    const mockProps: UploadProgressProps = {
      visible: true,
      percentage: 100,
      totalCount: 10,
      completedCount: 4,
    }
    const wrapper = render(<UploadProgress {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

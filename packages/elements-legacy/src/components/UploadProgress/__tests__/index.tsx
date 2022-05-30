import React from 'react'
import { render } from '../../../tests/react-testing'
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

  it('should run correctly when percentage < 0', () => {
    const mockProps: UploadProgressProps = {
      percentage: -1,
      visible: true,
    }
    const wrapper = render(<UploadProgress {...mockProps} />)
    expect(wrapper.find('.upload-progress-bg').prop('style')).toEqual({ width: '0%' })
  })

  it('should run correctly when percentage > 100', () => {
    const mockProps: UploadProgressProps = {
      percentage: 101,
      visible: true,
    }
    const wrapper = render(<UploadProgress {...mockProps} />)
    expect(wrapper.find('.upload-progress-bg').prop('style')).toEqual({ width: '100%' })
  })
})

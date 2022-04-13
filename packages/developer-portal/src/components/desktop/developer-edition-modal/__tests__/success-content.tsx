import React from 'react'
import { SuccessContent, handleDownload } from '../success-content'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'
import { render } from '../../../../tests/react-testing'

describe('SuccessContent', () => {
  it('should match snapshot', () => {
    const wrapper = render(<SuccessContent developer={mockDeveloperModel} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleDownload', () => {
  it('should open download link', () => {
    const downloadURL = 'downloadURL'
    window.reapit.config.developerEditionDownloadUrl = downloadURL
    window.open = jest.fn()

    handleDownload()
    expect(window.open).toBeCalledWith(downloadURL, '_self')
  })
})

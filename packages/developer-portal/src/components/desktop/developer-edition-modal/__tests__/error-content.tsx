import * as React from 'react'
import { shallow } from 'enzyme'
import { ErrorContent, handleDownload } from '../error-content'

describe('ErrorContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ErrorContent afterClose={jest.fn()} />)
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

import * as React from 'react'
import { shallow } from 'enzyme'
import { SuccessContent, handleDownload } from '../success-content'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('SuccessContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SuccessContent developer={developerStub} afterClose={jest.fn()} />)
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

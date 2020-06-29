import React from 'react'
import { DeveloperEditionDownload, DeveloperDownloadCompleted, onDownload, DeveloperEdition } from '../download-modal'
import { shallow } from 'enzyme'

describe('DeveloperEditionDownload', () => {
  it('should match snapshot', () => {
    const handleDownload = jest.fn()
    expect(shallow(<DeveloperEditionDownload handleDownload={handleDownload} />)).toMatchSnapshot()
  })
})

describe('DeveloperDownloadCompleted', () => {
  it('should match snapshot', () => {
    expect(shallow(<DeveloperDownloadCompleted />)).toMatchSnapshot()
  })
})

describe('DeveloperEdition', () => {
  it('should match snapshot', () => {
    expect(shallow(<DeveloperEdition />)).toMatchSnapshot()
  })
})

describe('onSetCompleted', () => {
  it('should run correctly', () => {
    const setIsCompleted = jest.fn() as React.Dispatch<boolean>
    const fn = onDownload(setIsCompleted)
    fn()
    expect(setIsCompleted).toBeCalledWith(true)
  })
})

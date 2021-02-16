import React from 'react'
import { shallow } from 'enzyme'
import { UploadStateContext, UploadDispatchContext } from '../upload-context'
import { mockUploadStateContext, mockUploadDispatchContext } from '../__mocks__/mock-upload-context'

describe('Upload-context', () => {
  it('UploadStateContext should return correctly', () => {
    const wrapper = shallow(<UploadStateContext.Provider value={mockUploadStateContext} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('UploadDispatchContext should return correctly', () => {
    const wrapper = shallow(<UploadDispatchContext.Provider value={mockUploadDispatchContext} />)
    expect(wrapper).toMatchSnapshot()
  })
})

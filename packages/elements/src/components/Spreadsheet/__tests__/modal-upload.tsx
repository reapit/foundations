import * as React from 'react'
import { shallow } from 'enzyme'
import { ModalUpload } from '../modal-upload'
import { data } from '../__stubs__'

describe('ModalUpload', () => {
  const uploadData = {
    totalRow: 0,
    validatedData: [[]],
    invalidIndies: [],
    shouldProcess: false,
    isModalOpen: true,
    exceedMaxRow: false,
  }
  it('should match snapshot with default prop', () => {
    const wrapper = shallow(<ModalUpload uploadData={uploadData} setUploadData={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with modified props', () => {
    const uploadData = {
      totalRow: data.length,
      validatedData: data,
      invalidIndies: [
        { row: 1, col: 2, cell: { value: 'hi' } },
        { row: 2, col: 2, cell: { value: 'hi' } },
        { row: 1, col: 4, cell: { value: 'hi' } },
        { row: 1, col: 5, cell: { value: 'hi' } },
      ],
      shouldProcess: false,
      isModalOpen: true,
      exceedMaxRow: false,
    }
    const wrapper = shallow(<ModalUpload uploadData={uploadData} setUploadData={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

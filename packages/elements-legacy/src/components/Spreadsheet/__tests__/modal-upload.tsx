import * as React from 'react'
import { render } from '@testing-library/react'
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
    header: [],
  }
  it('should match snapshot with default prop', () => {
    const wrapper = render(<ModalUpload uploadData={uploadData} setUploadData={jest.fn()} />)
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
      header: [
        { value: 'col 1' },
        { value: 'col 2' },
        { value: 'col 3' },
        { value: 'col 4' },
        { value: 'col 5' },
        { value: 'col 6' },
      ],
    }
    const wrapper = render(<ModalUpload uploadData={uploadData} setUploadData={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

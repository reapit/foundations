import React, { ChangeEvent, MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { FileInput, handleFileChange, handleFileClear, handleFileView, FilePreviewImage } from '..'

describe('FileInput component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<FileInput />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with full props', () => {
    const wrapper = render(
      <FileInput
        label="Some Label"
        defaultValue="https://mock.com"
        onChange={jest.fn()}
        onFileView={jest.fn()}
        onFileUpload={jest.fn()}
        placeholderText="Some Text"
        fileName="some-file-name"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for the FilePreviewImage component', () => {
    const wrapper = render(<FilePreviewImage src="https://mock-image.com" />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleFileView', () => {
  it('should handle viewing a file', () => {
    const onFileView = jest.fn()
    const fileUrl = 'https://mock.com'
    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    }

    const curried = handleFileView(onFileView, fileUrl)

    curried((event as unknown) as MouseEvent<HTMLSpanElement>)

    expect(onFileView).toHaveBeenCalledWith(fileUrl)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})

describe('handleFileClear', () => {
  it('should handle clearing a file', () => {
    const setFileName = jest.fn()
    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    }

    const curried = handleFileClear(setFileName)

    curried((event as unknown) as MouseEvent<HTMLSpanElement>)

    expect(setFileName).toHaveBeenCalledWith('')
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})

describe('handleFileChange', () => {
  it('should handle uploading a file', async () => {
    const setFileName = jest.fn()
    const fileName = 'MOCK_FILE_NAME'
    const onFileUpload = jest.fn()
    const event = {
      target: {
        files: [new Blob(['1', '1', '1'])],
      },
    }

    const curried = handleFileChange(setFileName, fileName, onFileUpload)

    const reader = curried((event as unknown) as ChangeEvent<HTMLInputElement>)

    expect(reader instanceof FileReader).toBe(true)
  })
})

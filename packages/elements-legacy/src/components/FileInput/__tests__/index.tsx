import * as React from 'react'
import { render } from '@testing-library/react'
import { FileInput, FileInputProps, handleChangeCroppedImage, clearFile } from '../index'
import { Formik } from 'formik'

const props: FileInputProps = {
  name: 'test',
  id: 'test',
  labelText: 'test',
  inputProps: {
    className: 'test',
  },
}

describe('FileInput', () => {
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <FileInput {...props} />} />),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('handleChangeCroppedImage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const field = {
    onChange: jest.fn(),
    name: 'inputFile',
    value: 'value',
    onBlur: jest.fn(),
  }

  const inputFile = {
    current: {
      value: 'value',
    },
  } as any

  const setFileName = jest.fn()

  it('should call correct functions when truthy croppedImage', () => {
    const fn = handleChangeCroppedImage({
      field,
      inputFile,
      setFileName,
      croppedImage: 'cropped',
    })
    fn()
    const spy = jest.spyOn(field, 'onChange')
    expect(spy).toHaveBeenCalledWith({
      target: {
        value: 'cropped',
        name: 'inputFile',
      },
    })
  })
  it('should call correct functions when croppedImage is empty string', () => {
    const fn = handleChangeCroppedImage({
      field,
      inputFile,
      setFileName,
      croppedImage: '',
    })
    fn()
    const spy = jest.spyOn(field, 'onChange')
    expect(spy).toHaveBeenCalledWith({
      target: {
        value: '',
        name: 'inputFile',
      },
    })
    expect(setFileName).toHaveBeenCalledWith('')
  })
  it('should return when croppedImage === undefined', () => {
    const fn = handleChangeCroppedImage({
      field,
      inputFile,
      setFileName,
    })
    const result = fn()
    expect(result).toBeUndefined()
  })
})

describe('clearFile', () => {
  it('should run correctly', () => {
    const onChange = jest.fn()
    const setFieldName = jest.fn()
    const field = {
      onChange,
    }
    const inputFile = 'test'
    const fn = clearFile(field, setFieldName, inputFile)
    fn()
    expect(onChange).toBeCalled()
    expect(setFieldName).toBeCalledWith('')
  })
})

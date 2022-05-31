import * as React from 'react'
import { render } from '@testing-library/react'
import { FileInputProps } from '../../FileInput'
import { CameraImageInput } from '../index'
import { Formik } from 'formik'

const props: FileInputProps = {
  name: 'test',
  id: 'test',
  labelText: 'test',
}

describe('CameraImageInput', () => {
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <CameraImageInput {...props} />} />),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

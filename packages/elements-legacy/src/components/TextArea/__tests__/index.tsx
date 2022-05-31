import * as React from 'react'
import { render } from '@testing-library/react'
import { TextArea, TextAreaProps } from '../index'
import { Formik } from 'formik'

const props: TextAreaProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <TextArea {...props} />} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when required', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <TextArea {...props} required />} />),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

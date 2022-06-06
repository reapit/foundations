import * as React from 'react'
import { render } from '@testing-library/react'
import { Input, InputProps } from '../index'
import { FaSearch } from 'react-icons/fa'
import { fieldValidateRequire } from '../../../utils/validators'
import { Formik } from 'formik'

const props: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
}

const hasRightIconInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  rightIcon: <FaSearch />,
}

const requiredInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  required: true,
}

const helperTextComponentInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  helperText: <b>Helper text</b>,
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <Input {...props} />} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with right icon', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <Input {...hasRightIconInputProps} />} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot if field is required', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <Input {...requiredInputProps} />} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot if helperText is a component', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={jest.fn()} render={() => <Input {...helperTextComponentInputProps} />} />,
      ),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('requiredValidate', () => {
  it('should run correctly', () => {
    const value = ''
    expect(fieldValidateRequire(value)).toEqual('Required')
  })
})

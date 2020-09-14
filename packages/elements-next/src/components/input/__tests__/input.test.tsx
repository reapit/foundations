import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { Input, InputProps } from '../input'
import toJson from 'enzyme-to-json'
import { FaSearch } from 'react-icons/fa'

const props: InputProps = {
  id: 'username',
  name: 'username',
  type: 'text',
}

const hasRightIconInputProps: InputProps = {
  id: 'username',
  name: 'username',
  type: 'text',
  rightIcon: <FaSearch />,
}

const errTextComponentInputProps: InputProps = {
  id: 'username',
  name: 'username',
  type: 'text',
  required: true,
  errText: 'err',
}

const helperTextComponentInputProps: InputProps = {
  id: 'username',
  name: 'username',
  type: 'text',
  helperText: <b>Helper text</b>,
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Input {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot with right icon', () => {
    expect(toJson(shallow(<Input {...hasRightIconInputProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot with err text', () => {
    expect(toJson(shallow(<Input {...helperTextComponentInputProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot with helper text', () => {
    expect(toJson(shallow(<Input {...errTextComponentInputProps} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

import * as React from 'react'
import { render } from '@testing-library/react'
import { DatePicker, DatePickerProps, CustomInput } from '../index'
import { Formik } from 'formik'

jest.unmock('dayjs')

const props: DatePickerProps = {
  name: 'abc',
  labelText: 'abc',
  id: '123',
}

describe('Date-time picker', () => {
  describe('DatePicker', () => {
    it('should match a snapshot', () => {
      expect(
        render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <DatePicker {...props} />} />),
      ).toMatchSnapshot()
    })
  })

  describe('CustomInput', () => {
    it('should match a snapshot', () => {
      const mockProps = {
        onChange: jest.fn(),
        value: '',
        id: 'mockId',
        onClick: jest.fn(),
        className: '',
      }
      expect(render(<CustomInput {...mockProps} />)).toMatchSnapshot()
    })
  })
})

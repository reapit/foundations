import * as React from 'react'
import { render } from '@testing-library/react'
import { SelectBox, SelectBoxOptions, SelectBoxProps } from '../index'
import { Formik } from 'formik'

const mockedOptions: SelectBoxOptions[] = [
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b' },
]
const selectBoxProps: SelectBoxProps = {
  options: mockedOptions,
  name: 'demo',
  labelText: 'demo',
  id: 'demo',
  helpText: 'This is helper text',
}

describe('SelectBox', () => {
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <SelectBox {...selectBoxProps} />} />),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

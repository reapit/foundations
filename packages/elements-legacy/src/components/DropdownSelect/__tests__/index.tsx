import * as React from 'react'
import { render } from '@testing-library/react'
import { DropdownSelect, DropdownSelectProps } from '../index'
import { options as mockOptions } from '../__stubs__/options'
import { Formik } from 'formik'

const dropdownSelectProps: DropdownSelectProps = {
  id: 'demo',
  name: 'demo',
  labelText: 'demo',
  options: mockOptions,
}

describe('Dropdown-select', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <Formik initialValues={{}} onSubmit={jest.fn()} render={() => <DropdownSelect {...dropdownSelectProps} />} />,
      ),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

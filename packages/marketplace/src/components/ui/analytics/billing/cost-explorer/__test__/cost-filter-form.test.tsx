import * as React from 'react'
import { shallow } from 'enzyme'
import CostFilterForm, { CostFilterFormProps, handleAutoSave } from '../cost-filter-form'
import { CostFilterFormValues } from '../cost-explorer'

describe('CostFilterForm', () => {
  const mockProps: CostFilterFormProps = {
    initialValues: {
      createdMonth: '2020-04',
    },
    onSave: jest.fn(),
  }
  it('should match a snapshot', () => {
    expect(shallow(<CostFilterForm {...mockProps} />)).toMatchSnapshot()
  })

  describe('handleAutoSave', () => {
    it('should run correctly', () => {
      const onSave = jest.fn()
      const mockFormValues: CostFilterFormValues = {
        createdMonth: '2020-05',
      }
      const fn = handleAutoSave(onSave)
      fn(mockFormValues)
      expect(onSave).toBeCalledWith(mockFormValues)
    })
  })
})

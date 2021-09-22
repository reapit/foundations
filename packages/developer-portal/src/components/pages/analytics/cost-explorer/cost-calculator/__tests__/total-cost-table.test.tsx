import * as React from 'react'
import { shallow } from 'enzyme'
import TotalCostTable, { TotalCostTableProps, toggleShowTable } from '../total-cost-table'

const mockProps: TotalCostTableProps = {
  formValues: {
    apiCalls: '',
    endpointsUsed: '',
  },
}

describe('CostCalculator', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TotalCostTable {...mockProps} />)).toMatchSnapshot()
  })

  describe('toggleShowTable', () => {
    it('should run correctly', () => {
      const mockIsTableExpanded = false
      const mockSetIsTableExpanded = jest.fn()
      const fn = toggleShowTable(mockIsTableExpanded, mockSetIsTableExpanded)
      fn()
      expect(mockSetIsTableExpanded).toBeCalledWith(!mockIsTableExpanded)
    })
  })
})

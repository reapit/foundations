import React from 'react'
import { ConsumptionCostTypesTable } from '../../terms-and-conditions-modal/consumption-cost-types-table'
import { render } from '@testing-library/react'

describe('ConsumptionCostTypesTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ConsumptionCostTypesTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

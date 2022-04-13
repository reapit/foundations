import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ConsumptionCostTypesTable } from '../consumption-cost-types-table'

describe('ConsumptionCostTypesTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ConsumptionCostTypesTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ConsumptionCostMethodologyTable } from '../consumption-cost-methodology-table'

describe('ConsumptionCostMethodologyTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ConsumptionCostMethodologyTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { ConsumptionCostMethodologyTable } from '../../terms-and-conditions-modal/consumption-cost-methodology-table'
import { render } from '@testing-library/react'

describe('ConsumptionCostMethodologyTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ConsumptionCostMethodologyTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

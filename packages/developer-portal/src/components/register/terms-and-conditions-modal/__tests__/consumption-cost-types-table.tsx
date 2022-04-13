import React from 'react'
import { ConsumptionCostTypesTable } from '../consumption-cost-types-table'
import { shallow } from 'enzyme'

describe('ConsumptionCostTypesTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ConsumptionCostTypesTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

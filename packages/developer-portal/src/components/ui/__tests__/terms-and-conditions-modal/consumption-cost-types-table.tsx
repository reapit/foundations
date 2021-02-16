import React from 'react'
import { ConsumptionCostTypesTable } from '../../terms-and-conditions-modal/consumption-cost-types-table'
import { shallow } from 'enzyme'

describe('ConsumptionCostTypesTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ConsumptionCostTypesTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

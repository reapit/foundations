import React from 'react'
import { ConsumptionCostMethodologyTable } from '../../terms-and-conditions-modal/consumption-cost-methodology-table'
import { shallow } from 'enzyme'

describe('ConsumptionCostMethodologyTable', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ConsumptionCostMethodologyTable />)
    expect(wrapper).toMatchSnapshot()
  })
})

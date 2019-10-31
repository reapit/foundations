import React from 'react'
import { shallow } from 'enzyme'
import { UpdateStatusSuccess } from '../update-status-success'
import { History } from 'history'

describe('UpdateStatus', () => {
  it('should match snapshot', () => {
    const mockProps = {
      history: {} as History
    }
    const wrapper = shallow(<UpdateStatusSuccess {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

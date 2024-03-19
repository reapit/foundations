import React from 'react'
import { render } from '../../../../tests/react-testing'
import { appointment } from '../../../../graphql/__mocks__/appointment'
import { AppointmentList } from '../appointment-list'

jest.mock('../../../../core/app-state')

describe('AppointmentList', () => {
  it('should match snapshot with appointments', () => {
    const mockProps = {
      appointments: [appointment],
    }
    const wrapper = render(<AppointmentList {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with no appointments', () => {
    const mockProps = {
      appointments: [],
    }
    const wrapper = render(<AppointmentList {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

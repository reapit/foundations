import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { mount } from 'enzyme'
import { Appointment } from '../appointment'
import GET_APPOINTMENTS from '../get-appointments.graphql'
import { appointment } from '@/graphql/__mocks__/appointment'
import { appointmentsQueryData } from '../__mocks__/appointments-query'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('Appointment', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <Appointment />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const mocks = [
      {
        request: {
          query: GET_APPOINTMENTS,
          variables: {
            negotiatorId: ['LJW'],
            start: appointment.start,
            end: appointment.end,
            includeCancelled: true,
            includeConfirm: true,
          },
        },
        result: appointmentsQueryData,
      },
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Appointment />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

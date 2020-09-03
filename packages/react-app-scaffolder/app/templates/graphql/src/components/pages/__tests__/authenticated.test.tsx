import * as React from 'react'
import { mount } from 'enzyme'
import Authenticated from '../authenticated'
import { MockedProvider } from '@apollo/react-testing'
import { appoinmentsQueryResult } from '@/graphql/__stubs__/appointments'
import GET_APPOINTMENTS from '../gql/get-appointments.graphql'

describe('Authenticated', () => {
  it('should match snapshot', () => {
    const mocks = [
      {
        request: {
          query: GET_APPOINTMENTS,
          variables: {
            pageSize: 10,
            start: '',
            end: '',
          },
        },
        result: appoinmentsQueryResult,
      },
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Authenticated />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import { CancelConfirmModal, handleUpdateAppointment } from '../index'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { MockedProvider } from '@apollo/react-testing'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('CancelConfirmModal', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={[]} addTypename={false}>
          <CancelConfirmModal appointment={appointment} showModal={true} handleHideModal={jest.fn()} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleUpdateAppointment', () => {
  it('should handle an appointment update', () => {
    const updateAppointment = jest.fn()
    const curried = handleUpdateAppointment({ updateAppointment, appointment })

    curried()
    expect(updateAppointment).toHaveBeenCalledWith({
      variables: { id: appointment?.id, cancelled: true, _eTag: appointment?._eTag },
    })
  })
})

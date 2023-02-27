import React from 'react'
import { render } from '../../../../tests/react-testing'
import { CancelConfirmModal, handleUpdateAppointment } from '../index'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { MockedProvider } from '@apollo/react-testing'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('CancelConfirmModal', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <CancelConfirmModal appointment={appointment} closeModal={jest.fn()} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleUpdateAppointment', () => {
  it('should handle an appointment update', async () => {
    const updateAppointment = jest.fn()
    const curried = handleUpdateAppointment({ updateAppointment, appointment })

    await curried()

    expect(updateAppointment).toHaveBeenCalledWith({
      variables: { id: appointment?.id, cancelled: true, _eTag: appointment._eTag },
    })
  })
})

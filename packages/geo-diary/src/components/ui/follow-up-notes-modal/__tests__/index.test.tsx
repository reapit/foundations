import React from 'react'
import { render } from '../../../../tests/react-testing'
import { FollowUpNotesModal, handleUpdateAppointment } from '../index'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { MockedProvider } from '@apollo/react-testing'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('FollowUpNotesModal', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <FollowUpNotesModal appointment={appointment} closeModal={jest.fn()} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleUpdateAppointment', () => {
  it('should handle an appointment update', async () => {
    const updateAppointment = jest.fn()
    const mockFormData = {
      due: '2021-01-01',
      notes: 'some notes',
    }
    const getAppointmentEtag = jest.fn().mockResolvedValue('some-etag')
    const curried = handleUpdateAppointment({ updateAppointment, getAppointmentEtag, appointment })

    await curried(mockFormData)
    expect(getAppointmentEtag).toHaveBeenCalledWith(appointment.id)
    expect(updateAppointment).toHaveBeenCalledWith({
      variables: {
        id: appointment?.id,
        _eTag: 'some-etag',
        followUp: { notes: mockFormData.notes },
        followUpOn: mockFormData.due,
      },
    })
  })
})

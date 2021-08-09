import React from 'react'
import { shallow } from 'enzyme'
import { FollowUpNotesModal, handleUpdateAppointment } from '../index'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { MockedProvider } from '@apollo/react-testing'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('FollowUpNotesModal', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={[]} addTypename={false}>
          <FollowUpNotesModal appointment={appointment} closeModal={jest.fn()} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleUpdateAppointment', () => {
  it('should handle an appointment update', () => {
    const updateAppointment = jest.fn()
    const mockFormData = {
      due: '2021-01-01',
      notes: 'some notes',
    }
    const curried = handleUpdateAppointment({ updateAppointment, appointment })

    curried(mockFormData)
    expect(updateAppointment).toHaveBeenCalledWith({
      variables: {
        id: appointment?.id,
        _eTag: appointment?._eTag,
        followUp: { notes: mockFormData.notes },
        followUpOn: mockFormData.due,
      },
    })
  })
})

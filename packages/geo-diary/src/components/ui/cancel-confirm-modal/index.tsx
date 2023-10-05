import React from 'react'
import { useMutation } from '@apollo/client'
import UPDATE_APPOINTMENT_BY_ID from '../../../graphql/mutations/update-appointment-by-id.graphql'
import { ExtendedAppointmentModel } from '../../../types/global'
import { BodyText, Button, ButtonGroup, elMb6, elTextCenter } from '@reapit/elements'

export type CancelConfirmModalProps = {
  appointment: ExtendedAppointmentModel
  closeModal: () => void
}

export type UpdateAppointmentData = {
  UpdateAppointment: ExtendedAppointmentModel
}

export type UpdateAppointmentParams = { variables: UpdateAppointmentVariables }

export type HandleUpdateAppointmentParams = {
  updateAppointment: (params: UpdateAppointmentParams) => void
  appointment: ExtendedAppointmentModel
}

export type UpdateAppointmentVariables = {
  id: string
  cancelled: boolean
  _eTag: string
}

export const handleUpdateAppointment =
  ({ updateAppointment, appointment }: HandleUpdateAppointmentParams) =>
  async () => {
    const { id, _eTag } = appointment
    if (!id || !_eTag) {
      return null
    }

    updateAppointment({
      variables: { id, cancelled: true, _eTag },
    })
  }

export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({ appointment, closeModal }) => {
  const [updateAppointment, { loading }] = useMutation<UpdateAppointmentData, UpdateAppointmentVariables>(
    UPDATE_APPOINTMENT_BY_ID,
    {
      onCompleted: closeModal,
    },
  )

  return (
    <>
      <div className={elMb6}>
        <BodyText className={elTextCenter}>Are you sure you want to cancel this appointment?</BodyText>
      </div>
      <ButtonGroup alignment="right">
        <Button intent="default" disabled={loading} onClick={closeModal} type="button">
          No
        </Button>
        <Button
          intent="danger"
          loading={loading}
          onClick={handleUpdateAppointment({ updateAppointment, appointment })}
          type="button"
        >
          Yes
        </Button>
      </ButtonGroup>
    </>
  )
}

import React from 'react'
import { Button, ModalV2, ButtonGroup } from '@reapit/elements'
import { useMutation } from '@apollo/react-hooks'
import UPDATE_APPOINTMENT_BY_ID from '../../../graphql/mutations/update-appointment-by-id.graphql'
import { ExtendedAppointmentModel } from '../../../types/global'

export type CancelConfirmModalProps = {
  showModal: boolean
  appointment: ExtendedAppointmentModel
  handleHideModal: () => void
}

export type UpdateAppointmentData = {
  UpdateAppointment: ExtendedAppointmentModel
}

export type HandleUpdateAppointmentParams = {
  updateAppointment: ({ variables: UpdateAppointmentVariables }) => void
  appointment: ExtendedAppointmentModel
}

export type UpdateAppointmentVariables = {
  id: string
  cancelled: boolean
  _eTag: string
}

export const handleUpdateAppointment = ({ updateAppointment, appointment }: HandleUpdateAppointmentParams) => () => {
  updateAppointment({
    variables: { id: appointment?.id || '', cancelled: true, _eTag: appointment?._eTag || '' },
  })
}

export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({ showModal, appointment, handleHideModal }) => {
  const [updateAppointment, { loading }] = useMutation<UpdateAppointmentData, UpdateAppointmentVariables>(
    UPDATE_APPOINTMENT_BY_ID,
    {
      onCompleted: handleHideModal,
    },
  )

  return (
    <ModalV2 visible={showModal} destroyOnClose={true} isCentered onClose={handleHideModal} title="Cancel Appointment?">
      <p className="mb-4">Are you sure you want to cancel this appointment?</p>
      <ButtonGroup isCentered hasSpacing>
        <Button variant="secondary" disabled={loading} onClick={handleHideModal} type="button">
          No
        </Button>
        <Button
          variant="danger"
          loading={loading}
          onClick={handleUpdateAppointment({ updateAppointment, appointment })}
          type="button"
        >
          Yes
        </Button>
      </ButtonGroup>
    </ModalV2>
  )
}

import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
import UPDATE_APPOINTMENT_BY_ID from '../../../graphql/mutations/update-appointment-by-id.graphql'
import { ExtendedAppointmentModel } from '../../../types/global'
import { BodyText, Button, ButtonGroup, elMb8, InputGroup, Label, TextArea } from '@reapit/elements'
import { AppointmentFollowUpModel } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'

export type FollowUpNotesModalProps = {
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
  followUp: AppointmentFollowUpModel
  followUpOn?: string
  _eTag: string
}

export const handleUpdateAppointment =
  ({ updateAppointment, appointment }: HandleUpdateAppointmentParams) =>
  async (followUp: AppointmentFollowUpModel) => {
    const { id, _eTag } = appointment
    if (!id || !_eTag) {
      return null
    }

    const { due, ...rest } = followUp

    updateAppointment({
      variables: { id, _eTag, followUp: rest, followUpOn: due },
    })
  }

export const FollowUpNotesModal: FC<FollowUpNotesModalProps> = ({ appointment, closeModal }) => {
  const { register, handleSubmit } = useForm()
  const [updateAppointment, { loading }] = useMutation<UpdateAppointmentData, UpdateAppointmentVariables>(
    UPDATE_APPOINTMENT_BY_ID,
    {
      onCompleted: closeModal,
    },
  )

  return (
    <>
      <div className={elMb8}>
        <BodyText>Record follow up notes on your appointment here, along with an optional follow up date.</BodyText>
      </div>
      <form onSubmit={handleSubmit(handleUpdateAppointment({ updateAppointment, appointment }))}>
        <InputGroup
          className={elMb8}
          icon="calendarSystem"
          label="Due date"
          type="date"
          defaultValue={appointment.followUp?.due}
          {...register('due')}
        />
        <InputGroup className={elMb8}>
          <TextArea defaultValue={appointment.followUp?.notes} {...register('notes')} />
          <Label>Follow up notes</Label>
        </InputGroup>
        <ButtonGroup alignment="right">
          <Button intent="default" disabled={loading} onClick={closeModal} type="button">
            Cancel
          </Button>
          <Button intent="primary" loading={loading} type="submit">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </>
  )
}

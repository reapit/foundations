import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
import UPDATE_APPOINTMENT_BY_ID from '../../../graphql/mutations/update-appointment-by-id.graphql'
import { ExtendedAppointmentModel } from '../../../types/global'
import { BodyText, Button, elMb6, FlexContainer, InputGroup, Label, TextArea } from '@reapit/elements'
import { AppointmentFollowUpModel } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'

export type FollowUpNotesModalProps = {
  appointment: ExtendedAppointmentModel
  closeModal: () => void
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
  followUp: AppointmentFollowUpModel
  _eTag: string
}

export const handleUpdateAppointment =
  ({ updateAppointment, appointment }: HandleUpdateAppointmentParams) =>
  (followUp: AppointmentFollowUpModel) => {
    const { id, _eTag } = appointment
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
      <div className={elMb6}>
        <BodyText>Record follow up notes on your appointment here, along with an optional follow up date.</BodyText>
      </div>
      <form onSubmit={handleSubmit(handleUpdateAppointment({ updateAppointment, appointment }))}>
        <InputGroup
          className={elMb6}
          icon="calendarSystem"
          label="Due date"
          type="date"
          defaultValue={appointment.followUp?.due}
          {...register('due')}
        />
        <InputGroup className={elMb6}>
          <TextArea defaultValue={appointment.followUp?.notes} {...register('notes')} />
          <Label>Follow up notes</Label>
        </InputGroup>
        <FlexContainer isFlexJustifyEvenly>
          <Button intent="secondary" size={2} disabled={loading} onClick={closeModal} type="button">
            Cancel
          </Button>
          <Button intent="critical" size={2} loading={loading} type="submit">
            Submit
          </Button>
        </FlexContainer>
      </form>
    </>
  )
}

import React from 'react'
import { useMutation } from '@apollo/client'
import UPDATE_APPOINTMENT_BY_ID from '../../../graphql/mutations/update-appointment-by-id.graphql'
import { ExtendedAppointmentModel } from '../../../types/global'
import { BodyText, Button, elMb6, elTextCenter, FlexContainer } from '@reapit/elements'
import { useGetAppointmentEtag } from '@/graphql/hooks/use-get-appointment-etag'

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
  getAppointmentEtag: (id: string) => Promise<string>
  appointment: ExtendedAppointmentModel
}

export type UpdateAppointmentVariables = {
  id: string
  cancelled: boolean
  _eTag: string
}

export const handleUpdateAppointment =
  ({ updateAppointment, getAppointmentEtag, appointment }: HandleUpdateAppointmentParams) =>
  async () => {
    const { id } = appointment
    if (!id) {
      return null
    }
    const _eTag = await getAppointmentEtag(id)
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
  const getAppointmentEtag = useGetAppointmentEtag()

  return (
    <>
      <div className={elMb6}>
        <BodyText className={elTextCenter}>Are you sure you want to cancel this appointment?</BodyText>
      </div>
      <FlexContainer isFlexJustifyEvenly>
        <Button intent="secondary" size={2} disabled={loading} onClick={closeModal} type="button">
          No
        </Button>
        <Button
          intent="critical"
          size={2}
          loading={loading}
          onClick={handleUpdateAppointment({ updateAppointment, getAppointmentEtag, appointment })}
          type="button"
        >
          Yes
        </Button>
      </FlexContainer>
    </>
  )
}

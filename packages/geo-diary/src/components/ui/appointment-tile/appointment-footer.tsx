import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Button, ButtonGroup, H5, isMobile, SubTitleH5 } from '@reapit/elements'
import { ExtendedAppointmentModel } from '../../../types/global'
import { EtaButton } from '../eta-button/eta-button'
import { buttonPaddingSmall } from '../../pages/appointment/__styles__'
import { AppState, useAppState } from '../../../core/app-state'
import { AppointmentDetailModal } from '../appointment-detail-modal/appointment-detail-modal'

export interface AppointmentFooterProps {
  appointment: ExtendedAppointmentModel
  headingText: string
  nextAppointment?: ExtendedAppointmentModel
}

export interface HandleDirectionOnClickParams {
  appointment: ExtendedAppointmentModel
  setAppState: Dispatch<SetStateAction<AppState>>
  isMobileView: boolean
}

export const handleDirectionOnClick = ({
  appointment,
  setAppState,
  isMobileView,
}: HandleDirectionOnClickParams) => () => {
  const lat = appointment?.property?.address?.geolocation?.latitude
  const lng = appointment?.property?.address?.geolocation?.longitude

  setAppState((currentState) => ({
    ...currentState,
    destinationLat: lat ?? currentState.destinationLat,
    destinationLng: lng ?? currentState.destinationLng,
    appointmentId: appointment.id ?? currentState.appointmentId,
    tab: isMobileView ? 'MAP' : 'LIST',
  }))
}

export const handleModalToggle = (setModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setModalVisible((modalVisible) => !modalVisible)
}

export const AppointmentFooter: FC<AppointmentFooterProps> = ({ appointment, nextAppointment, headingText }) => {
  const { setAppState } = useAppState()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const lat = appointment?.property?.address?.geolocation?.latitude
  const lng = appointment?.property?.address?.geolocation?.longitude
  const { appointmentType } = appointment
  const isMobileView = isMobile()

  const hasLatLng = Boolean(lat) && Boolean(lng)
  const isNextAppointment = nextAppointment?.id && nextAppointment?.id === appointment?.id

  return (
    <ButtonGroup isCentered hasSpacing>
      <Button
        className={buttonPaddingSmall}
        variant="primary"
        key="viewDetails"
        type="submit"
        onClick={handleModalToggle(setModalVisible)}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Details
      </Button>
      {hasLatLng && (
        <Button
          className={buttonPaddingSmall}
          variant="primary"
          key="viewDirection"
          type="submit"
          onClick={handleDirectionOnClick({ appointment, setAppState, isMobileView })}
          disabled={false}
          loading={false}
          fullWidth={false}
        >
          Directions
        </Button>
      )}
      {isNextAppointment && <EtaButton key="etaButton" appointment={appointment} />}
      <AppointmentDetailModal
        title={
          <>
            <H5>{headingText}</H5>
            {appointmentType && <SubTitleH5 className="mb-0">{appointmentType?.value}</SubTitleH5>}
          </>
        }
        appointment={appointment}
        visible={modalVisible}
        onClose={handleModalToggle(setModalVisible)}
      />
    </ButtonGroup>
  )
}

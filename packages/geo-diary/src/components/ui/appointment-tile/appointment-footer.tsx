import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Button, ButtonGroup, isMobile } from '@reapit/elements'
import { ExtendedAppointmentModel } from '../../../types/global'
import { EtaButton } from '../eta-button/eta-button'
import { buttonPaddingSmall } from '../../pages/appointment/__styles__'
import { AppState, useAppState } from '../../../core/app-state'
// import { AppointmentDetailModal } from '../appointment-detail-modal/appointment-detail-modal'
import ContactDrawer from '../contact-drawer/index'

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

export const handleModalClose = (setModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setModalVisible(() => false)
}

export const handleModalOpen = (setModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setModalVisible(() => true)
}

export const getContactsFromAppointment = (appointment: ExtendedAppointmentModel) => {
  const { attendee } = appointment
  let contacts: any = []

  if (attendee && attendee.contacts) {
    contacts = [...attendee.contacts]
  }

  if (appointment) console.log(appointment)

  return contacts
}

export const AppointmentFooter: FC<AppointmentFooterProps> = ({ appointment, nextAppointment, headingText }) => {
  const { setAppState } = useAppState()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const lat = appointment?.property?.address?.geolocation?.latitude
  const lng = appointment?.property?.address?.geolocation?.longitude
  const contacts = getContactsFromAppointment(appointment)
  const isMobileView = isMobile()

  console.log(headingText)

  const hasLatLng = Boolean(lat) && Boolean(lng)
  const isNextAppointment = nextAppointment?.id && nextAppointment?.id === appointment?.id

  return (
    <ButtonGroup isCentered hasSpacing>
      <Button
        className={buttonPaddingSmall}
        variant="primary"
        key="viewDetails"
        type="submit"
        onClick={handleModalOpen(setModalVisible)}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Contacts
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
      <ContactDrawer isOpen={modalVisible} handleClose={handleModalClose(setModalVisible)} contacts={contacts} />
      {/* <AppointmentDetailModal
        title={
          <>
            <H5>{headingText}</H5>
            {appointmentType && <SubTitleH5 className="mb-0">{appointmentType?.value}</SubTitleH5>}
          </>
        }
        appointment={appointment}
        visible={modalVisible}
        onClose={handleModalToggle(setModalVisible)}
      /> */}
    </ButtonGroup>
  )
}

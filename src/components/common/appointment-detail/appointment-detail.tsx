import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { oc } from 'ts-optchain'
import { TiTimes, TiTick, TiMail, TiHome, TiPhoneOutline, TiDevicePhone } from 'react-icons/ti'
import { Dispatch } from 'redux'
import { Modal, Loader, getTime, getDate, isSameDay, AppointmentTile } from '@reapit/elements'
import { AppointmentModel, CommunicationModel, AttendeeModel, AddressModel } from '@/types/appointments'
import { ReduxState } from '@/types/core'
import styles from '@/styles/pages/appointment-detail.scss?mod'
import { appointmentDetailHideModal } from '@/actions/appointment-detail'

export type AppointmentModalProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  afterClose: () => void
}

export const renderCommunicationType = (communicationLabel: string | undefined) => {
  switch (communicationLabel) {
    case 'E-Mail':
      return <TiMail />
    case 'Home':
      return <TiHome />
    case 'Mobile':
      return <TiDevicePhone />
    case 'Work':
      return <TiPhoneOutline />
    default:
      return null
  }
}

export const renderHrefLink = (communicationLabel: string | undefined) => {
  switch (communicationLabel) {
    case 'E-Mail':
      return 'mailto:'
    default:
      return 'tel:'
  }
}

export const renderCommunicationDetail = (communicationDetails: CommunicationModel[] | undefined) => {
  if (!communicationDetails) {
    return null
  }
  return communicationDetails.map((communicationDetail: CommunicationModel, index: number) => {
    return (
      <div className={styles.appointmentDetailSection} key={index}>
        <div>
          {renderCommunicationType(communicationDetail.label)}
          <a
            href={`${renderHrefLink(communicationDetail.label)}${communicationDetail.detail}`}
            className={styles.appointmentDetailCommunicationDetail}
          >
            {communicationDetail.detail}
          </a>
        </div>
      </div>
    )
  })
}

export const renderCheckMark = (isConfirmed: boolean | undefined) => {
  if (!isConfirmed) {
    return <TiTimes className={styles.appointmentDetailIsNotConfirmed} />
  }
  return <TiTick className={styles.appointmentDetailIsConfirmed} />
}

export const renderAttendees = (appointment: AppointmentModel) => {
  const attendees = appointment.attendees
  const address = oc(appointment).property.address()

  if (!attendees) {
    return null
  }
  return attendees.map((attendee: AttendeeModel) => {
    return (
      <div key={appointment.id}>
        <h3 className={styles.title}>{oc(attendee).name('No Attendee Name')}</h3>
        {renderAddress(address)}
        <div className="my-5">{renderCommunicationDetail(attendee.communicationDetails)}</div>
      </div>
    )
  })
}

export const renderAddress = (address: AddressModel | undefined) => {
  if (!address) {
    return null
  }
  return (
    <div>
      {address.buildingName} {address.buildingNumber} {address.line1} {address.line2} {address.line3} {address.line4}{' '}
      {address.postcode} {address.country}
    </div>
  )
}

export const renderDateTime = (address: AddressModel | undefined, appointment: AppointmentModel) => {
  if (!address) {
    return null
  }
  return (
    <div className={styles.dateTime}>
      {renderStartAndEndDate(appointment.start || '', appointment.end || '')}, {address.buildingName}
      {address.buildingNumber} {address.line1}
    </div>
  )
}

export const renderNotes = (description: string | undefined) => {
  if (!description) {
    return null
  }
  return (
    <div className={styles.notes}>
      <h5 className={styles.subTitle}>Notes:</h5>
      <p>{description}</p>
    </div>
  )
}

export const renderDirections = (direction: string | undefined) => {
  if (!direction) {
    return null
  }
  return (
    <AppointmentTile hightlight={false} heading="Directions">
      <div className={styles.appointmentDetailSectionContent}>{direction}</div>
    </AppointmentTile>
  )
}

export const renderStartAndEndDate = (startTime: string, endTime: string) => {
  const startDate = dayjs(startTime)
  const isToday = isSameDay(startDate)
  const displayDate = isToday ? 'Today' : getDate(startDate)
  const displayStart = getTime(startDate, false)
  const displayEnd = getTime(endTime, false)
  return `${displayDate} ${displayStart} - ${displayEnd}`
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ appointment, visible, afterClose, isLoading }) => {
  return (
    <Modal visible={visible} size="medium" afterClose={afterClose}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.root}>
          <div className={styles.ref}>Ref:{appointment.id}</div>
          {renderAttendees(appointment)}
          {renderNotes(appointment.description)}
          {renderDateTime(oc(appointment).property.address(), appointment)}
          {renderDirections(appointment.directions)}
        </div>
      )}
    </Modal>
  )
}

export type AppointmentDetailMappedProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
}

export const filterLoggedInUser = (attendees: AttendeeModel[] | undefined, userCode: string): AttendeeModel[] => {
  if (!attendees) {
    return []
  }
  return attendees.filter((attendee: AttendeeModel) => {
    if (!attendee) {
      return true
    }
    return attendee.id !== userCode
  })
}

export const mapStateToProps = (state: ReduxState): AppointmentDetailMappedProps => {
  const appointment = oc(state).appointmentDetail.appointmentDetail({})
  const userCode = oc(state).auth.loginSession.loginIdentity.userCode('')
  const newAppointment = {
    ...appointment,
    attendees: filterLoggedInUser(appointment.attendees, userCode)
  }
  return {
    appointment: newAppointment,
    visible: state.appointmentDetail.isModalVisible,
    isLoading: state.appointmentDetail.loading
  }
}

export type AppointmentDetailMappedAction = {
  afterClose: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AppointmentDetailMappedAction => ({
  afterClose: () => dispatch(appointmentDetailHideModal())
})

const AppointmentDetailWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentModal)

AppointmentDetailWithRedux.displayName = 'AppointmentDetailWithRedux'

export default React.memo(AppointmentDetailWithRedux)

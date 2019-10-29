import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { oc } from 'ts-optchain'
import { TiTimes, TiTick, TiMail, TiHome, TiPhoneOutline, TiDevicePhone } from 'react-icons/ti'
import { FaClock, FaMale, FaHome, FaStickyNote, FaHandshake } from 'react-icons/fa'
import { Dispatch } from 'redux'
import {
  Modal,
  Loader,
  getTime,
  getDate,
  isSameDay,
  H4,
  IconList,
  AcLink,
  EntityType,
  LoginMode,
  SubTitleH5,
  ModalHeaderProps
} from '@reapit/elements'
import { AppointmentModel, CommunicationModel, AttendeeModel, AddressModel } from '@/types/appointments'
import { ReduxState } from '@/types/core'
import { appointmentDetailHideModal } from '@/actions/appointment-detail'
import { ListItemModel } from '../../../types/configuration'
import styles from '@/styles/ui/appoinments-detail.scss?mod'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'

const { appointmentDetailTextContainer } = styles

export type AppointmentModalProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  afterClose: () => void
}

export const renderCommunicationType = (communicationLabel: string | undefined) => {
  switch (communicationLabel) {
    case 'E-Mail':
      return <TiMail className="icon-list-icon" />
    case 'Home':
      return <TiHome className="icon-list-icon" />
    case 'Mobile':
      return <TiDevicePhone className="icon-list-icon" />
    case 'Work':
      return <TiPhoneOutline className="icon-list-icon" />
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
  return (
    <IconList
      items={communicationDetails.map((communicationDetail: CommunicationModel) => {
        return {
          icon: renderCommunicationType(communicationDetail.label),
          text: (
            <a href={`${renderHrefLink(communicationDetail.label)}${communicationDetail.detail}`}>
              {communicationDetail.detail}
            </a>
          )
        }
      })}
    />
  )
}

export const renderCheckMark = (isConfirmed: boolean | undefined) => {
  if (!isConfirmed) {
    return <TiTimes />
  }
  return <TiTick />
}

export const renderAddress = (
  loginMode: LoginMode,
  address: AddressModel | undefined,
  propertyId: string | undefined
) => {
  if (!address) {
    return null
  }
  let { buildingName, buildingNumber, country, line1, line2, line3, line4, postcode } = address
  const addressParts = [buildingName, buildingNumber, line1, line2, line3, line4, postcode, country]

  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaHome />
        <H4>Property:</H4>
      </div>
      <AcLink
        dynamicLinkParams={{
          appMode: loginMode,
          entityType: EntityType.PROPERTY,
          entityCode: propertyId
        }}
      >
        <SubTitleH5>{addressParts.filter(p => p).join(', ')}</SubTitleH5>
      </AcLink>
    </div>
  )
}

export const renderDateTime = (address: AddressModel | undefined, appointment: AppointmentModel) => {
  if (!address) {
    return null
  }
  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaClock />
        <H4>Time:</H4>
      </div>
      <SubTitleH5>{renderStartAndEndDate(appointment.start || '', appointment.end || '')}</SubTitleH5>
    </div>
  )
}

export const renderAdditionalAttendees = (attendees: AttendeeModel[]) => {
  if (attendees.length === 0) {
    return null
  }

  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaMale />
        <H4>Attendees:</H4>
      </div>
      <div>
        {attendees.map(attendee => (
          <SubTitleH5>{attendee.name}</SubTitleH5>
        ))}
      </div>
    </div>
  )
}

export const renderApplicantAttendees = (attendees: AttendeeModel[]) => {
  if (attendees.length === 0) {
    return null
  }

  return (
    <>
      {attendees.map(attendee => {
        return (
          <div className={appointmentDetailTextContainer}>
            <div className={styles.appointmentDetailIconContainer}>
              <FaMale />
              <H4>{capitalizeFirstLetter(oc(attendee).type(''))}:</H4>
            </div>
            <div>
              <SubTitleH5>
                {attendee.name} <br />
                {oc(attendee)
                  .communicationDetails([])
                  .map(c => (
                    <>
                      {c.detail}
                      <br />
                    </>
                  ))}
              </SubTitleH5>
            </div>
          </div>
        )
      })}
    </>
  )
}

export const renderNotes = (description: string | undefined) => {
  if (!description) {
    return null
  }
  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaStickyNote />
        <H4>Entry Notes:</H4>
      </div>
      <SubTitleH5>{description}</SubTitleH5>
    </div>
  )
}

export const renderArrangements = (arrangements: string | undefined) => {
  if (!arrangements) {
    return null
  }
  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaHandshake />
        <H4>Viewing Arrangements:</H4>
      </div>
      <SubTitleH5>{arrangements}</SubTitleH5>
    </div>
  )
}

export const ModalHeader: React.SFC<ModalHeaderProps> = ({ title, afterClose }) => (
  <header className="modal-card-head">
    <h4 className="modal-card-title is-4">{title}</h4>
    <button
      className="delete"
      aria-label="close"
      data-test="modal-close-button"
      onClick={event => {
        event.preventDefault()
        afterClose && afterClose()
      }}
    />
  </header>
)

export const renderStartAndEndDate = (startTime: string, endTime: string) => {
  const startDate = dayjs(startTime)
  const isToday = isSameDay(startDate)
  const displayDate = isToday ? 'Today' : getDate(startDate)
  const displayStart = getTime(startDate, false)
  const displayEnd = getTime(endTime, false)
  return `${displayDate} ${displayStart} - ${displayEnd}`
}

export const AppointmentModal: React.FC<AppointmentModalProps & AppointmentDetailMappedProps> = ({
  appointment,
  visible,
  afterClose,
  isLoading,
  appointmentTypes,
  loginMode,
  additionalAttendees,
  applicantAttendees
}) => {
  appointment = appointmentDataStub
  additionalAttendees = [(appointmentDataStub.attendees as AttendeeModel[])[0]]
  applicantAttendees = [(appointmentDataStub.attendees as AttendeeModel[])[0]]

  let address = oc(appointment).property.address()
  const typeId = oc(appointment).typeId()
  const propertyId = oc(appointment).property.id()
  const basicAddress = address
    ? `${oc(address).buildingName('')} ${oc(address).buildingNumber('')} ${oc(address).line1('')}`
    : ''

  const type =
    typeId && appointmentTypes ? appointmentTypes.find(appointmentType => appointmentType.id === typeId) : null

  const CustomHeaderComponent = () => {
    return (
      <header className="modal-card-head">
        <h4 className="modal-card-title is-4">
          {type && type.value} <br />
          {basicAddress}
        </h4>
        <button
          className="delete"
          aria-label="close"
          data-test="modal-close-button"
          onClick={event => {
            event.preventDefault()
            afterClose && afterClose()
          }}
        />
      </header>
    )
  }

  return (
    <Modal
      HeaderComponent={CustomHeaderComponent}
      className={styles.appoinmentDetailModal}
      visible={visible}
      afterClose={afterClose}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {renderDateTime(oc(appointment).property.address(), appointment)}
          {renderAdditionalAttendees(additionalAttendees)}
          {renderApplicantAttendees(applicantAttendees)}
          {renderAddress(loginMode, address, propertyId)}
          {renderNotes(appointment.description)}
          {renderArrangements(oc(appointment).property.arrangements(''))}
        </>
      )}
    </Modal>
  )
}

export type AppointmentDetailMappedProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  appointmentTypes: ListItemModel[] | null
  loginMode: LoginMode
  additionalAttendees: AttendeeModel[]
  applicantAttendees: AttendeeModel[]
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

// Get attendees types: negotiator, office
export const getAdditionalAttendees = (attendees: AttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = oc(attendee).type('')
    return ['negotiator', 'office'].includes(attendeeType)
  })
}

// Get attendees types: landlord, contact, applicant, tenant
export const getApplicantAttendees = (attendees: AttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = oc(attendee).type('')
    return ['landlord', 'contact', 'applicant', 'tenant'].includes(attendeeType)
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
    isLoading: state.appointmentDetail.loading,
    appointmentTypes: state.appointments.appointmentTypes,
    loginMode: oc(state).auth.refreshSession.mode('WEB'),
    additionalAttendees: getAdditionalAttendees(oc(appointment).attendees([])),
    applicantAttendees: getApplicantAttendees(oc(appointment).attendees([]))
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

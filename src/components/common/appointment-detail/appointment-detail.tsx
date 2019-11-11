import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { TiTimes, TiTick, TiMail, TiHome, TiPhoneOutline, TiDevicePhone } from 'react-icons/ti'
import { FaClock, FaMale, FaHome, FaStickyNote, FaHandshake } from 'react-icons/fa'
import { Dispatch } from 'redux'
import {
  Modal,
  Loader,
  getTime,
  getDate,
  isSameDay,
  IconList,
  AcLink,
  EntityType,
  LoginMode,
  SubTitleH5,
  H6,
  H4
} from '@reapit/elements'
import { AppointmentModel, CommunicationModel, AttendeeModel, AddressModel } from '@/types/appointments'
import { ReduxState } from '@/types/core'
import { appointmentDetailHideModal } from '@/actions/appointment-detail'
import { ListItemModel } from '../../../types/configuration'
import styles from '@/styles/ui/appoinments-detail.scss?mod'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

const { appointmentDetailTextContainer } = styles

export type AppointmentModalProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  afterClose: () => void
}

interface GetHeaderParams {
  basicAddress: string
  afterClose: () => void
  type?: ListItemModel | null
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
        <H6>Property:</H6>
      </div>
      <AcLink
        dynamicLinkParams={{
          appMode: loginMode,
          entityType: EntityType.PROPERTY,
          entityCode: propertyId
        }}
      >
        <p>{addressParts.filter(p => p).join(', ')}</p>
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
        <H6>Time:</H6>
      </div>
      <p>{renderStartAndEndDate(appointment.start || '', appointment.end || '')}</p>
    </div>
  )
}

export const renderAdditionalAttendees = (attendees: AttendeeModel[], loginMode: LoginMode) => {
  if (attendees.length === 0) {
    return null
  }

  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaMale />
        <H6>Attendees:</H6>
      </div>
      <div>
        {attendees.map(attendee => (
          <div>
            <AcLink
              dynamicLinkParams={{
                appMode: loginMode,
                entityType: EntityType.CONTACT,
                entityCode: attendee.id
              }}
            >
              <p>{attendee.name}</p>
            </AcLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export const renderApplicantAttendees = (attendees: AttendeeModel[], loginMode: LoginMode) => {
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
              <H6>{capitalizeFirstLetter(attendee?.type || '')}:</H6>
            </div>
            <p>
              <div className="mb-2">
                <AcLink
                  dynamicLinkParams={{
                    appMode: loginMode,
                    entityType: EntityType.CONTACT,
                    entityCode: attendee.id
                  }}
                >
                  <p>{attendee.name}</p>
                </AcLink>
              </div>
              {renderCommunicationDetail(attendee?.communicationDetails || [])}
            </p>
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
        <H6>Entry Notes:</H6>
      </div>
      <p>{description}</p>
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
        <H6>Arrangements:</H6>
      </div>
      <p>{arrangements}</p>
    </div>
  )
}

export const getModalHeader = ({ basicAddress, afterClose, type }: GetHeaderParams) => {
  const ModalHeader: React.SFC = () => (
    <header className="modal-card-head">
      <div className={`${styles.appoinmentDetailHeaderText} modal-card-title`}>
        <H4>{basicAddress}</H4>
        <SubTitleH5>{type && type.value}</SubTitleH5>
      </div>
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

  return ModalHeader
}

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
  let address = appointment?.property?.address
  const typeId = appointment?.typeId
  const propertyId = appointment?.property?.id
  const basicAddress = address
    ? `${address?.buildingName || ''} ${address?.buildingNumber || ''} ${address?.line1 || ''}`
    : ''

  const type =
    typeId && appointmentTypes ? appointmentTypes.find(appointmentType => appointmentType.id === typeId) : null

  return (
    <Modal
      HeaderComponent={getModalHeader({ basicAddress, afterClose, type })}
      className={styles.appoinmentDetailModal}
      visible={visible}
      afterClose={afterClose}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {renderDateTime(appointment?.property?.address, appointment)}
          {renderAdditionalAttendees(additionalAttendees, loginMode)}
          {renderApplicantAttendees(applicantAttendees, loginMode)}
          {renderAddress(loginMode, address, propertyId)}
          {renderNotes(appointment.description)}
          {renderArrangements(appointment?.property?.arrangements || '')}
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

export const getLoggedInUser = (
  attendees: AttendeeModel[] | undefined,
  userCode: string
): AttendeeModel | undefined => {
  if (!attendees) {
    return
  }
  return attendees.find((attendee: AttendeeModel) => {
    return attendee.id === userCode
  })
}

// Get attendees types: negotiator, office
export const getAdditionalAttendees = (attendees: AttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = attendee?.type || ''
    return ['negotiator', 'office'].includes(attendeeType)
  })
}

// Get attendees types: landlord, contact, applicant, tenant
export const getApplicantAttendees = (attendees: AttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = attendee?.type || ''
    return ['landlord', 'contact', 'applicant', 'tenant'].includes(attendeeType)
  })
}

export const mapStateToProps = (state: ReduxState): AppointmentDetailMappedProps => {
  const appointment = state?.appointmentDetail?.appointmentDetail || {}
  const userCode = state?.auth?.loginSession?.loginIdentity?.userCode || ''
  return {
    appointment: appointment,
    visible: state.appointmentDetail.isModalVisible,
    isLoading: state.appointmentDetail.loading,
    appointmentTypes: state.appointments.appointmentTypes,
    loginMode: state?.auth?.refreshSession?.mode || 'WEB',
    additionalAttendees: filterLoggedInUser(getAdditionalAttendees(appointment?.attendees || []), userCode),
    applicantAttendees: getApplicantAttendees(appointment?.attendees || [])
  }
}

export type AppointmentDetailMappedAction = {
  afterClose: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AppointmentDetailMappedAction => ({
  afterClose: () => dispatch(appointmentDetailHideModal())
})

const AppointmentDetailWithRedux = connect(mapStateToProps, mapDispatchToProps)(AppointmentModal)

AppointmentDetailWithRedux.displayName = 'AppointmentDetailWithRedux'

export default React.memo(AppointmentDetailWithRedux)

import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { TiTimes, TiTick, TiMail, TiHome, TiPhoneOutline, TiDevicePhone } from 'react-icons/ti'
import { FaClock, FaMale, FaHome, FaStickyNote, FaHandshake, FaBuilding } from 'react-icons/fa'
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
  SubTitleH5,
  H6,
  H4,
  Button,
  FlexContainerResponsive
} from '@reapit/elements'
import {
  AppointmentModel,
  AppointmentAttendeeCommunicationModel,
  ListItemModel,
  AppointmentPropertyAddressModel,
  AppointmentAttendeeModel,
  NegotiatorModel,
  AppointmentContactModel
} from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import { appointmentDetailHideModal, showHideConfirmModal } from '@/actions/appointment-detail'
import styles from '@/styles/ui/appoinments-detail.scss?mod'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { getAttendeeEntityType } from '@/utils/get-attendee-entity-type'
import ConfirmContent from './confirm-content'
import { OfficeModel } from '@/types/platform'
import { LoginMode } from '@reapit/cognito-auth'

const { appointmentDetailTextContainer } = styles

export type AppointmentModalProps = StateProps &
  DispatchProps & {
    appointment: AppointmentModel
    visible: boolean
    isLoading: boolean
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

export const renderCommunicationDetail = (
  communicationDetails: AppointmentAttendeeCommunicationModel[] | undefined
) => {
  if (!communicationDetails) {
    return null
  }
  return (
    <IconList
      items={communicationDetails.map((communicationDetail: AppointmentAttendeeCommunicationModel) => {
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
  address: AppointmentPropertyAddressModel | undefined,
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

export const renderDateTime = (appointment: AppointmentModel) => {
  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaClock />
        <H6>Time:</H6>
      </div>
      <div>
        <p>{renderStartAndEndDate(appointment.start || '', appointment.end || '')}</p>
        {appointment.recurring && <p className="is-size-7 is-italic">This is a recurring appointment</p>}
      </div>
    </div>
  )
}

export const renderNegotiators = (negotiators: NegotiatorModel[], loginMode: LoginMode) => {
  if (negotiators.length === 0) {
    return null
  }

  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaMale />
        <H6>Negotiators:</H6>
      </div>
      <div>
        {negotiators.map((negotiator: NegotiatorModel, index: number) => (
          <div key={index}>
            <AcLink
              dynamicLinkParams={{
                appMode: loginMode,
                entityType: EntityType.CONTACT,
                entityCode: negotiator.id
              }}
            >
              <p>{negotiator.name}</p>
            </AcLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export const renderOffices = (offices: OfficeModel[], loginMode: LoginMode) => {
  if (offices.length === 0) {
    return null
  }

  return (
    <div className={appointmentDetailTextContainer}>
      <div className={styles.appointmentDetailIconContainer}>
        <FaBuilding />
        <H6>Offices:</H6>
      </div>
      <div>
        {offices.map((office: OfficeModel, index: number) => (
          <div key={index}>
            <AcLink
              dynamicLinkParams={{
                appMode: loginMode,
                entityType: EntityType.CONTACT,
                entityCode: office.id
              }}
            >
              <p>{office.name}</p>
            </AcLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export const renderAttendee = (attendee: AppointmentAttendeeModel, loginMode: LoginMode) => {
  if (attendee?.contacts?.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      {attendee?.contacts?.map((contact: AppointmentContactModel, index: number) => {
        return (
          <div key={index} className={appointmentDetailTextContainer}>
            <div className={styles.appointmentDetailIconContainer}>
              <FaMale />
              <H6>{capitalizeFirstLetter(attendee?.type || '')}:</H6>
            </div>
            <p>
              <div className="mb-2">
                <AcLink
                  dynamicLinkParams={{
                    appMode: loginMode,
                    entityType: getAttendeeEntityType(attendee?.type || ''),
                    entityCode: attendee.id
                  }}
                >
                  <p>{contact?.name}</p>
                </AcLink>
              </div>
              {renderCommunicationDetail(contact?.communicationDetails || [])}
            </p>
          </div>
        )
      })}
    </React.Fragment>
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

export type RenderModalContentParams = {
  isLoading: boolean
  isConfirmContentVisible: boolean
  appointment: AppointmentModel
  loginMode: LoginMode
  attendee: AppointmentAttendeeModel
  negotiators: NegotiatorModel[]
  offices: OfficeModel[]
  handleCancelAppointment: () => void
}

export const renderModalContent = ({
  isLoading,
  isConfirmContentVisible,
  appointment,
  negotiators,
  offices,
  loginMode,
  attendee,
  handleCancelAppointment
}: RenderModalContentParams) => {
  if (isLoading) {
    return <Loader />
  }
  if (isConfirmContentVisible) {
    return <ConfirmContent />
  }
  const address = appointment?.property?.address
  const propertyId = appointment?.property?.id
  const isCancelledAppointment = appointment?.cancelled
  return (
    <React.Fragment>
      {renderDateTime(appointment)}
      {renderNegotiators(negotiators, loginMode)}
      {renderOffices(offices, loginMode)}
      {renderAttendee(attendee, loginMode)}
      {renderAddress(loginMode, address, propertyId)}
      {renderNotes(appointment.description)}
      {renderArrangements(appointment?.property?.arrangements || '')}
      <FlexContainerResponsive>
        <Button disabled={isCancelledAppointment} onClick={handleCancelAppointment} type="button" variant="primary">
          {isCancelledAppointment ? 'Cancelled' : 'Cancel Appointment'}
        </Button>
      </FlexContainerResponsive>
    </React.Fragment>
  )
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  visible,
  afterClose,
  isLoading,
  appointmentTypes,
  loginMode,
  negotiators,
  offices,
  attendee,
  handleCancelAppointment,
  isConfirmContentVisible
}) => {
  const address = appointment?.property?.address
  const basicAddress = address
    ? `${address?.buildingName || ''} ${address?.buildingNumber || ''} ${address?.line1 || ''}`
    : ''
  const typeId = appointment?.typeId
  const type =
    typeId && appointmentTypes ? appointmentTypes.find(appointmentType => appointmentType.id === typeId) : null
  return (
    <React.Fragment>
      <Modal
        HeaderComponent={getModalHeader({ basicAddress, afterClose, type })}
        className={styles.appoinmentDetailModal}
        visible={visible}
        afterClose={afterClose}
      >
        {renderModalContent({
          isLoading,
          isConfirmContentVisible,
          appointment,
          handleCancelAppointment,
          negotiators,
          offices,
          loginMode,
          attendee
        })}
      </Modal>
    </React.Fragment>
  )
}

export type StateProps = {
  appointment: AppointmentModel
  visible: boolean
  isLoading: boolean
  appointmentTypes: ListItemModel[] | null
  loginMode: LoginMode
  negotiators: NegotiatorModel[]
  offices: OfficeModel[]
  attendee: AppointmentAttendeeModel
  isConfirmContentVisible: boolean
}

export const filterLoggedInUser = (
  attendees: AppointmentAttendeeModel[] | undefined,
  userCode: string
): AppointmentAttendeeModel[] => {
  if (!attendees) {
    return []
  }
  return attendees.filter((attendee: AppointmentAttendeeModel) => {
    if (!attendee) {
      return true
    }
    return attendee.id !== userCode
  })
}

export const getLoggedInUser = (
  attendees: AppointmentAttendeeModel[] | undefined,
  userCode: string
): AppointmentAttendeeModel | undefined => {
  if (!attendees) {
    return
  }
  return attendees.find((attendee: AppointmentAttendeeModel) => {
    return attendee.id === userCode
  })
}

// Get attendees types: negotiator, office
export const getAdditionalAttendees = (attendees: AppointmentAttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = attendee?.type || ''
    return ['negotiator', 'office'].includes(attendeeType)
  })
}

// Get attendees types: landlord, contact, applicant, tenant
export const getApplicantAttendees = (attendees: AppointmentAttendeeModel[]) => {
  return attendees.filter(attendee => {
    const attendeeType = attendee?.type || ''
    return ['landlord', 'contact', 'applicant', 'tenant'].includes(attendeeType)
  })
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  const appointment = state?.appointmentDetail?.appointmentDetail || {}
  return {
    isConfirmContentVisible: state?.appointmentDetail?.confirmModal?.isConfirmContentVisible,
    appointment: appointment,
    visible: state.appointmentDetail.isModalVisible,
    isLoading: state.appointmentDetail.loading,
    appointmentTypes: state.appointments.appointmentTypes,
    loginMode: state?.auth?.refreshSession?.mode || 'WEB',
    negotiators: appointment?.negotiators || [],
    offices: appointment?.offices || [],
    attendee: appointment?.attendee || {}
  }
}

export type DispatchProps = {
  afterClose: () => void
  handleCancelAppointment: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  afterClose: () => dispatch(appointmentDetailHideModal()),
  handleCancelAppointment: () => dispatch(showHideConfirmModal(true))
})

const AppointmentDetailWithRedux = connect(mapStateToProps, mapDispatchToProps)(AppointmentModal)

AppointmentDetailWithRedux.displayName = 'AppointmentDetailWithRedux'

export default React.memo(AppointmentDetailWithRedux)

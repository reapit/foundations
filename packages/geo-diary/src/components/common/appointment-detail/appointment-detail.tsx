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
  H5,
  Button,
  Grid,
  GridItem,
  Section,
} from '@reapit/elements'
import {
  ListItemModel,
  AppointmentAttendeeModel,
  NegotiatorModel,
  AppointmentContactModel,
  OfficeModel,
} from '@reapit/foundations-ts-definitions'
import { ReduxState, ExtendedAppointmentModel } from '@/types/core'
import { appointmentDetailHideModal, showHideConfirmModal } from '@/actions/appointment-detail'
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter'
import { getAttendeeEntityType } from '@/utils/get-attendee-entity-type'
import ConfirmContent from './confirm-content'
import { LoginMode } from '@reapit/cognito-auth'
import { IconListItem } from '../../../../../elements/src/components/IconList/index'

export type AppointmentModalProps = StateProps &
  DispatchProps & {
    appointment: ExtendedAppointmentModel
    visible: boolean
    isLoading: boolean
  }

interface GetHeaderParams {
  basicAddress: string
  afterClose: () => void
  type?: ListItemModel | null
}

export const renderCommunicationDetail = (communicationDetails: AppointmentContactModel) => {
  const { homePhone, workPhone, mobilePhone, email } = communicationDetails
  const items: IconListItem[] = []

  if (homePhone) {
    items.push({
      icon: <TiHome className="icon-list-icon" />,
      text: <a href={`tel:${homePhone}`}>{homePhone}</a>,
    })
  }

  if (workPhone) {
    items.push({
      icon: <TiPhoneOutline className="icon-list-icon" />,
      text: <a href={`tel:${workPhone}`}>{workPhone}</a>,
    })
  }

  if (mobilePhone) {
    items.push({
      icon: <TiDevicePhone className="icon-list-icon" />,
      text: <a href={`tel:${mobilePhone}`}>{mobilePhone}</a>,
    })
  }

  if (email) {
    items.push({
      icon: <TiMail className="icon-list-icon" />,
      text: <a href={`mailto:${email}`}>{email}</a>,
    })
  }

  return <IconList items={items} />
}

export const renderCheckMark = (isConfirmed: boolean | undefined) => {
  if (!isConfirmed) {
    return <TiTimes />
  }
  return <TiTick />
}

export const renderAddress = (
  loginMode: LoginMode,
  // AppointmentPropertyAddressModel have been deprecated
  address: any | undefined,
  propertyId: string | undefined,
) => {
  if (!address) {
    return null
  }
  let { buildingName, buildingNumber, country, line1, line2, line3, line4, postcode } = address
  const addressParts = [buildingName, buildingNumber, line1, line2, line3, line4, postcode, country]

  return (
    <Grid>
      <GridItem className="is-one-third horizontal">
        <Grid className="is-vcentered">
          <GridItem className="is-narrow">
            <FaHome />
          </GridItem>
          <GridItem>
            <H6>Property:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <AcLink
          dynamicLinkParams={{
            appMode: loginMode,
            entityType: EntityType.PROPERTY,
            entityCode: propertyId,
          }}
        >
          {addressParts.filter(p => p).join(', ')}
        </AcLink>
      </GridItem>
    </Grid>
  )
}

export const renderDateTime = (appointment: ExtendedAppointmentModel) => {
  return (
    <Grid>
      <GridItem className="is-one-third horizontal">
        <Grid className="is-vcentered">
          <GridItem className="is-narrow">
            <FaClock className="vertical-align-text-top" />
          </GridItem>
          <GridItem>
            <H6 className="inline-block">Time:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <p>{renderStartAndEndDate(appointment.start || '', appointment.end || '')}</p>
        {appointment.recurring && <p className="is-size-7 is-italic">This is a recurring appointment</p>}
      </GridItem>
    </Grid>
  )
}

export const renderNegotiators = (negotiators: NegotiatorModel[]) => {
  if (negotiators.length === 0) {
    return null
  }

  return (
    <Grid>
      <GridItem className="is-one-third horizontal">
        <Grid className="is-vcentered">
          <GridItem className="is-narrow">
            <FaMale />
          </GridItem>
          <GridItem>
            <H6>Negotiators:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        {negotiators.map((negotiator: NegotiatorModel, index: number) => (
          <div key={index}>
            <p>{negotiator.name}</p>
          </div>
        ))}
      </GridItem>
    </Grid>
  )
}

export const renderOffices = (offices: OfficeModel[], loginMode: LoginMode) => {
  if (offices.length === 0) {
    return null
  }

  return (
    <Grid>
      <GridItem className="is-one-third horizontal">
        <Grid className="is-vcentered">
          <GridItem className="is-narrow">
            <FaBuilding />
          </GridItem>
          <GridItem>
            <H6>Offices:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        {offices.map((office: OfficeModel, index: number) => (
          <div key={index}>
            <AcLink
              dynamicLinkParams={{
                appMode: loginMode,
                entityType: EntityType.CONTACT,
                entityCode: office.id,
              }}
            >
              {office.name}
            </AcLink>
          </div>
        ))}
      </GridItem>
    </Grid>
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
          <Grid key={index}>
            <GridItem className="is-one-third horizontal">
              <Grid className="is-vcentered">
                <GridItem className="is-narrow">
                  <FaMale />
                </GridItem>
                <GridItem>
                  <H6>{capitalizeFirstLetter(attendee?.type || '')}:</H6>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem>
              <div className="mb-2">
                <AcLink
                  dynamicLinkParams={{
                    appMode: loginMode,
                    entityType: getAttendeeEntityType(attendee?.type || ''),
                    entityCode: attendee.id,
                  }}
                >
                  {contact?.name}
                </AcLink>
              </div>
              {renderCommunicationDetail(contact)}
            </GridItem>
          </Grid>
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
    <Grid>
      <GridItem className="is-one-third horizontal">
        <Grid className="is-vcentered">
          <GridItem className="is-narrow">
            <FaStickyNote />
          </GridItem>
          <GridItem>
            <H6>Entry Notes:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <p>{description}</p>
      </GridItem>
    </Grid>
  )
}

export const renderArrangements = (arrangements: string | undefined) => {
  if (!arrangements) {
    return null
  }
  return (
    <Grid>
      <GridItem className="is-one-third horizontal">
        <Grid className="is-vcentered">
          <GridItem className="is-narrow">
            <FaHandshake />
          </GridItem>
          <GridItem>
            <H6>Arrangements:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <p>{arrangements}</p>
      </GridItem>
    </Grid>
  )
}

export const getModalHeader = ({ basicAddress, afterClose, type }: GetHeaderParams) => {
  const ModalHeader: React.SFC = () => (
    <header className="modal-card-head">
      <div className="modal-card-title">
        {basicAddress && <H5>{basicAddress}</H5>}
        {type && <SubTitleH5 className="mb-0">{type.value}</SubTitleH5>}
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
  appointment: ExtendedAppointmentModel
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
  handleCancelAppointment,
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
      {renderNegotiators(negotiators)}
      {renderOffices(offices, loginMode)}
      {renderAttendee(attendee, loginMode)}
      {renderAddress(loginMode, address, propertyId)}
      {renderNotes(appointment.description)}
      {renderArrangements(appointment?.property?.viewingArrangements || '')}
      <Section isFlex hasPadding={false} hasMargin={false}>
        <Button disabled={isCancelledAppointment} onClick={handleCancelAppointment} type="button" variant="primary">
          {isCancelledAppointment ? 'Cancelled' : 'Cancel Appointment'}
        </Button>
      </Section>
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
  isConfirmContentVisible,
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
          attendee,
        })}
      </Modal>
    </React.Fragment>
  )
}

export type StateProps = {
  appointment: ExtendedAppointmentModel
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
  userCode: string,
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
  userCode: string,
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
    attendee: appointment?.attendee || {},
  }
}

export type DispatchProps = {
  afterClose: () => void
  handleCancelAppointment: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  afterClose: () => dispatch(appointmentDetailHideModal()),
  handleCancelAppointment: () => dispatch(showHideConfirmModal(true)),
})

const AppointmentDetailWithRedux = connect(mapStateToProps, mapDispatchToProps)(AppointmentModal)

AppointmentDetailWithRedux.displayName = 'AppointmentDetailWithRedux'

export default React.memo(AppointmentDetailWithRedux)

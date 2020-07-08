import React from 'react'
import {
  getTime,
  Button,
  Grid,
  GridItem,
  H6,
  isSameDay,
  getDate,
  Section,
  AcLink,
  EntityType,
  IconListItem,
  IconList,
  combineAddress,
  ModalV2,
  ModalV2Props,
  H5,
} from '@reapit/elements'
import { useMutation } from '@apollo/react-hooks'
import dayjs from 'dayjs'
import {
  NegotiatorModel,
  OfficeModel,
  AppointmentAttendeeModel,
  AppointmentContactModel,
  PropertyModel,
} from '@reapit/foundations-ts-definitions'
import { LoginMode } from '@reapit/cognito-auth'
import { FaClock, FaMale, FaBuilding, FaHome, FaStickyNote, FaHandshake } from 'react-icons/fa'
import { TiMail, TiHome, TiPhoneOutline, TiDevicePhone } from 'react-icons/ti'
import { ExtendedAppointmentModel } from '@/types/global'
import { AuthContext } from '@/context'
import UPDATE_APPOINTMENT_BY_ID from './update-appointment-by-id.graphql'

export const capitalizeFirstLetter = (value: string) => {
  if (!value) {
    return ''
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const attendeeEntityType = {
  contact: EntityType.CONTACT,
  landlord: EntityType.LANDLORD,
  tenant: EntityType.TENNANCY,
  applicant: EntityType.APPLICANT,
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
                    entityType: attendeeEntityType[attendee?.type || 'contact'],
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

export const renderAddress = (property: PropertyModel, loginMode: LoginMode) => {
  if (!property) {
    return null
  }
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
            entityCode: property?.id,
          }}
        >
          {combineAddress(property?.address)}
        </AcLink>
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

export const renderStartAndEndDate = (startTime: string, endTime: string) => {
  const startDate = dayjs(startTime)
  const isToday = isSameDay(startDate)
  const displayDate = isToday ? 'Today' : getDate(startDate)
  const displayStart = getTime(startDate, false)
  const displayEnd = getTime(endTime, false)
  return `${displayDate} ${displayStart} - ${displayEnd}`
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

export type AppointmentDetailModalProps = ModalV2Props & {
  appointment: ExtendedAppointmentModel
}

export const handleShowConfirmModal = (setIsShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsShowConfirmModal(true)
}

export const handleHideConfirmModal = (setIsShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsShowConfirmModal(false)
}

export type HandleUpdateAppointmentParams = {
  updateAppointment: ({ variables: UpdateAppointmentVariables }) => void
  appointment: ExtendedAppointmentModel
}

export const handleUpdateAppointment = ({ updateAppointment, appointment }: HandleUpdateAppointmentParams) => () => {
  updateAppointment({
    variables: { id: appointment?.id || '', cancelled: true, _eTag: appointment?._eTag || '' },
  })
}

export type CancelConfirmModalProps = {
  isShowConfirmModal: boolean
  appointment: ExtendedAppointmentModel
  setIsShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type UpdateAppointmentData = {
  UpdateAppointment: ExtendedAppointmentModel
}
export type UpdateAppointmentVariables = {
  id: string
  cancelled: boolean
  _eTag: string
}
export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  isShowConfirmModal,
  appointment,
  setIsShowConfirmModal,
}) => {
  const [updateAppointment, { loading }] = useMutation<UpdateAppointmentData, UpdateAppointmentVariables>(
    UPDATE_APPOINTMENT_BY_ID,
    {
      onCompleted: handleHideConfirmModal(setIsShowConfirmModal),
    },
  )

  return (
    <ModalV2 visible={isShowConfirmModal} destroyOnClose={true} onClose={handleHideConfirmModal(setIsShowConfirmModal)}>
      <React.Fragment>
        <H5>Are you sure you want to cancel this appointment?</H5>
        <Section isFlex hasPadding={false} hasMargin={false}>
          <Button
            loading={loading}
            onClick={handleUpdateAppointment({ updateAppointment, appointment })}
            type="button"
            variant="primary"
          >
            Yes
          </Button>
          <Button
            disabled={loading}
            onClick={handleHideConfirmModal(setIsShowConfirmModal)}
            type="button"
            variant="primary"
          >
            No
          </Button>
        </Section>
      </React.Fragment>
    </ModalV2>
  )
}

export const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({ appointment, ...restProps }) => {
  const { loginSession } = React.useContext(AuthContext)
  const loginMode = loginSession?.mode || 'WEB'
  const [isShowConfirmModal, setIsShowConfirmModal] = React.useState<boolean>(false)
  return (
    <ModalV2
      {...restProps}
      destroyOnClose={true}
      footer={
        <Button
          disabled={appointment?.cancelled}
          onClick={handleShowConfirmModal(setIsShowConfirmModal)}
          type="button"
          variant="primary"
        >
          {appointment?.cancelled ? 'Cancelled' : 'Cancel Appointment'}
        </Button>
      }
    >
      {renderDateTime(appointment)}
      {renderNegotiators(appointment?.negotiators || [])}
      {renderOffices(appointment?.offices || [], loginMode)}
      {renderAttendee(appointment?.attendee || {}, loginMode)}
      {renderAddress(appointment?.property || {}, loginMode)}
      {renderNotes(appointment.description)}
      {renderArrangements(appointment?.property?.viewingArrangements || '')}
      <CancelConfirmModal
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        appointment={appointment}
      />
    </ModalV2>
  )
}
export default React.memo(AppointmentDetailModal)

import React, { Dispatch, FC, SetStateAction } from 'react'
import { ExtendedAppointmentModel } from '../../../types/global'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { AppState } from '../../../core/app-state'
import { AttendeeItem } from './attendee-item'
import { PropertyItem } from './property-item'
import { ContactDrawerType } from '../contact-drawer'
import { VendorItem } from './vendor-item'
import { LandlordItem } from './landlord-item'
import {
  CardListItem,
  elCardListItemExpanded,
  CardListIcon,
  CardListItemTextWrap,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  useModal,
  Icon,
} from '@reapit/elements'
import { CancelConfirmModal } from '../cancel-confirm-modal'
import { FollowUpNotesModal } from '../follow-up-notes-modal'

export type RenderIconItemsProps = {
  appointment: ExtendedAppointmentModel
}

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
  nextAppointment?: ExtendedAppointmentModel
}

export type RenderModalTitleParams = {
  appointmentType?: ListItemModel
  heading: string
}

export const handleOpenContactDrawer =
  (
    setAppState: Dispatch<SetStateAction<AppState>>,
    appointment: ExtendedAppointmentModel,
    contactDrawerType: ContactDrawerType,
    contactId: string | null,
  ) =>
  () => {
    const isDeskop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])
    setAppState((currentState) => ({
      ...currentState,
      appointment,
      appointmentId: appointment.id ?? null,
      contactDrawerOpen: isDeskop ? false : true,
      contactDrawerType,
      contactId,
    }))

    if (isDeskop && contactId) {
      const entity = contactDrawerType === ContactDrawerType.PROPERTY ? 'properties' : 'contacts'
      window.location.href = `agencycloud://${entity}/${contactId}`
    }
  }

export const AppointmentItems: FC<RenderIconItemsProps> = ({ appointment }) => {
  const { Modal: FollowUpModal, openModal: openFollowUpModal, closeModal: closeFollowUpModal } = useModal()
  const { Modal: CancelModal, openModal: openCancelModal, closeModal: closeCancelModal } = useModal()
  return (
    <>
      <PropertyItem appointment={appointment} />
      <AttendeeItem appointment={appointment} />
      <VendorItem appointment={appointment} />
      <LandlordItem appointment={appointment} />
      <CardListItem className={elCardListItemExpanded}>
        <CardListIcon>
          <Icon icon="edit" intent="primary" />
        </CardListIcon>
        <CardListItemTextWrap onClick={openFollowUpModal}>
          <CardListItemTextPrimary>Notes</CardListItemTextPrimary>
          <CardListItemTextSecondary>Add Follow Up Notes</CardListItemTextSecondary>
        </CardListItemTextWrap>
      </CardListItem>
      {!appointment.cancelled && (
        <CardListItem className={elCardListItemExpanded}>
          <CardListIcon>
            <Icon icon="trash" intent="danger" />
          </CardListIcon>
          <CardListItemTextWrap onClick={openCancelModal}>
            <CardListItemTextPrimary>Cancel</CardListItemTextPrimary>
            <CardListItemTextSecondary>Cancel This Appointment</CardListItemTextSecondary>
          </CardListItemTextWrap>
        </CardListItem>
      )}
      <FollowUpModal title="Follow up notes">
        <FollowUpNotesModal closeModal={closeFollowUpModal} appointment={appointment} />
      </FollowUpModal>
      <CancelModal title="Cancel appointment?">
        <CancelConfirmModal closeModal={closeCancelModal} appointment={appointment} />
      </CancelModal>
    </>
  )
}

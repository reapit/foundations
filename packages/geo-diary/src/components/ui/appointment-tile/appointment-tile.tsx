import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { getTime } from '@reapit/utils-common'
import { ExtendedAppointmentModel } from '../../../types/global'
import { AppointmentItems } from './appointment-items'
import { AppState, useAppState } from '../../../core/app-state'
import { cx } from '@linaria/core'
import {
  CardContextMenu,
  CardListHeading,
  CardListMainWrap,
  CardListSubHeading,
  CardWrap,
  elCardFocussed,
  elCardListMainWrapExpanded,
  elMb6,
  useModal,
} from '@reapit/elements'
import { CancelConfirmModal } from '../cancel-confirm-modal'
import { cancelledTile, subheadingAdditional } from './__styles__/styles'
import { FollowUpNotesModal } from '../follow-up-notes-modal'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'

dayjs.extend(advancedFormat)

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
}

export const handleSetAppointmentId =
  (setAppState: Dispatch<SetStateAction<AppState>>, appointment: ExtendedAppointmentModel) => () => {
    const { id, property } = appointment
    const destinationLat = property?.address?.geolocation?.latitude ?? null
    const destinationLng = property?.address?.geolocation?.longitude ?? null
    if (id) {
      setAppState((currentState) => ({
        ...currentState,
        appointmentId: id,
        destinationLat,
        destinationLng,
      }))
    }
  }

export const handleScrollIntoView =
  (tileRef: MutableRefObject<HTMLDivElement | null>, appointmentId: string | null, id?: string) => () => {
    if (tileRef.current && appointmentId && id && appointmentId === id) {
      tileRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

export const AppointmentTile: FC<AppointmentTileProps> = ({ appointment }) => {
  const { appState, setAppState } = useAppState()
  const { Modal: FollowUpModal, openModal: openFollowUpModal, closeModal: closeFollowUpModal } = useModal()
  const { Modal: CancelModal, openModal: openCancelModal, closeModal: closeCancelModal } = useModal()
  const { appointmentId, time } = appState
  const tileRef = useRef<HTMLDivElement>(null)
  const { id, start: appointmentStart } = appointment

  const start = getTime(appointment?.start ?? '')
  const end = getTime(appointment?.end ?? '')
  const appointmentType = appointment.appointmentType?.value
  const cancelledText = appointment.cancelled ? ' - Cancelled ' : ''
  const headingText = `${start} - ${end}${cancelledText}`
  useEffect(handleScrollIntoView(tileRef, appointmentId, id), [appointmentId, id])

  return (
    <div ref={tileRef}>
      <CardWrap
        className={cx(appointmentId === id && elCardFocussed, appointment.cancelled && cancelledTile, elMb6)}
        onClick={handleSetAppointmentId(setAppState, appointment)}
      >
        <CardListMainWrap className={elCardListMainWrapExpanded}>
          {!appointment.cancelled && (
            <CardContextMenu
              contextMenuItems={[
                {
                  icon: 'editSystem',
                  onClick: openFollowUpModal,
                  intent: 'primary',
                },
                {
                  icon: 'trashSystem',
                  onClick: openCancelModal,
                  intent: 'danger',
                },
              ]}
            />
          )}
          <CardListHeading>{headingText}</CardListHeading>
          <CardListSubHeading>{appointmentType}</CardListSubHeading>
        </CardListMainWrap>
        {time === 'WEEK' && (
          <CardListSubHeading className={subheadingAdditional}>
            {dayjs(appointmentStart).format('dddd, Do MMMM')}
          </CardListSubHeading>
        )}
        <AppointmentItems appointment={appointment} />
        <FollowUpModal title="Follow up notes">
          <FollowUpNotesModal closeModal={closeFollowUpModal} appointment={appointment} />
        </FollowUpModal>
        <CancelModal title="Cancel appointment?">
          <CancelConfirmModal closeModal={closeCancelModal} appointment={appointment} />
        </CancelModal>
      </CardWrap>
    </div>
  )
}

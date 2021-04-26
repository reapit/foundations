import React, { FC } from 'react'
import { getTime, IconList, IconListItem, Section } from '@reapit/elements'
import { FaClock, FaStreetView, FaAddressCard } from 'react-icons/fa'
import { ExtendedAppointmentModel } from '../../../types/global'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

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

export const AppointmentItems: FC<RenderIconItemsProps> = ({ appointment }) => {
  const line2 = appointment?.property?.address?.line2 ?? ''
  const line3 = appointment?.property?.address?.line3 ?? ''
  const line4 = appointment?.property?.address?.line4 ?? ''
  const postcode = appointment?.property?.address?.postcode ?? ''
  const address = `${line2} ${line3} ${line4} ${postcode}`.trim()
  const start = getTime(appointment?.start || '')
  const end = getTime(appointment?.end || '')
  const appointmentType = appointment.appointmentType?.value

  return (
    <Section hasPadding={false}>
      <IconList
        items={
          [
            {
              icon: <FaAddressCard className="icon-list-icon" />,
              text: address,
            },
            appointmentType && {
              icon: <FaStreetView className="icon-list-icon" />,
              text: appointmentType,
            },
            {
              icon: <FaClock className="icon-list-icon" />,
              text: appointment.cancelled ? 'Appointment cancelled' : `${start} - ${end}`,
            },
          ].filter((item) => !!item) as IconListItem[]
        }
      />
    </Section>
  )
}

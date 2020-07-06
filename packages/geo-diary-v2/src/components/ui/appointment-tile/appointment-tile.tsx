import React from 'react'
import { Tile, IconList } from '@reapit/elements'
import { getTime, Button } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { FaClock, FaStreetView, FaAddressCard } from 'react-icons/fa'

export type RenderIconItemsParams = {
  appointment: ExtendedAppointmentModel
  appointmentTypes: ListItemModel[]
}

export const renderIconItems = ({ appointment, appointmentTypes }: RenderIconItemsParams) => {
  const line2 = appointment?.property?.address?.line2 ?? ''
  const line3 = appointment?.property?.address?.line3 ?? ''
  const line4 = appointment?.property?.address?.line4 ?? ''
  const typeId = appointment?.typeId ?? ''
  const postcode = appointment?.property?.address?.postcode ?? ''
  const address = `${line2} ${line3} ${line4} ${postcode}`
  const start = getTime(appointment?.start || '')
  const end = getTime(appointment?.end || '')
  const type = appointmentTypes.find(appointmentType => appointmentType.id === typeId)

  const iconItems: Array<{ icon: React.ReactElement; text: string }> = []
  if (address) {
    iconItems.push({
      icon: <FaAddressCard className="icon-list-icon" />,
      text: address,
    })
  }

  if (type && type.value) {
    iconItems.push({
      icon: <FaStreetView className="icon-list-icon" />,
      text: type.value,
    })
  }

  iconItems.push({
    icon: <FaClock className="icon-list-icon" />,
    text: appointment.cancelled ? 'Appointment cancelled' : `${start} - ${end}`,
  })
  return iconItems
}

export const renderFooterItems = () => [
  <>
    <Button type="submit" onClick={() => null} disabled={false} loading={false} fullWidth={false}>
      Details
    </Button>
    <Button type="submit" onClick={() => null} disabled={false} loading={false} fullWidth={false}>
      Directions
    </Button>
  </>,
]

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
  appointmentTypes: ListItemModel[]
}

export const AppointmentTile: React.FC<AppointmentTileProps> = ({ appointment, appointmentTypes }) => {
  const line1 = appointment?.property?.address?.line1 ?? ''
  const buildingName = appointment?.property?.address?.buildingName ?? ''
  const buildingNumber = appointment?.property?.address?.buildingNumber ?? ''
  const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`

  return (
    <Tile hightlight={false} key={appointment.id} heading={heading} footerItems={renderFooterItems()}>
      <IconList items={renderIconItems({ appointment, appointmentTypes: appointmentTypes })} />
    </Tile>
  )
}

export default AppointmentTile

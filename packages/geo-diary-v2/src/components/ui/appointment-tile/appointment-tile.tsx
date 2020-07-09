import React from 'react'
import { Tile, IconList, getTime, Button, H5, SubTitleH5 } from '@reapit/elements'
import qs from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'
import { History } from 'history'
import { FaClock, FaStreetView, FaAddressCard } from 'react-icons/fa'
import { ExtendedAppointmentModel } from '@/types/global'
import { ROUTES } from '@/core/router'
import AppointmentDetailModal from '../appointment-detail-modal'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

export type RenderIconItemsParams = {
  appointment: ExtendedAppointmentModel
}

export const renderIconItems = ({ appointment }: RenderIconItemsParams) => {
  const line2 = appointment?.property?.address?.line2 ?? ''
  const line3 = appointment?.property?.address?.line3 ?? ''
  const line4 = appointment?.property?.address?.line4 ?? ''
  const postcode = appointment?.property?.address?.postcode ?? ''
  const address = `${line2} ${line3} ${line4} ${postcode}`
  const start = getTime(appointment?.start || '')
  const end = getTime(appointment?.end || '')
  const appointmentType = appointment.appointmentType

  const iconItems: Array<{ icon: React.ReactElement; text: string }> = []
  if (address.trim()) {
    iconItems.push({
      icon: <FaAddressCard className="icon-list-icon" />,
      text: address,
    })
  }

  if (appointmentType && appointmentType.value) {
    iconItems.push({
      icon: <FaStreetView className="icon-list-icon" />,
      text: appointmentType.value,
    })
  }

  iconItems.push({
    icon: <FaClock className="icon-list-icon" />,
    text: appointment.cancelled ? 'Appointment cancelled' : `${start} - ${end}`,
  })
  return iconItems
}

export type HandleDirectionOnClickParams = {
  appointment: ExtendedAppointmentModel
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleDirectionOnClick = ({ appointment, queryParams, history }: HandleDirectionOnClickParams) => () => {
  const lat = appointment?.property?.address?.geolocation?.latitude
  const lng = appointment?.property?.address?.geolocation?.longitude
  const queryString = qs.stringify({ ...queryParams, destinationLat: lat, destinationLng: lng, tab: 'map' })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export type RenderFooterItemsParams = {
  appointment: ExtendedAppointmentModel
  queryParams: qs.ParsedQuery<string>
  history: History
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export const renderFooterItems = ({ appointment, queryParams, history, setShowDetail }) => {
  const lat = appointment?.property?.address?.geolocation?.latitude
  const lng = appointment?.property?.address?.geolocation?.longitude
  let buttons = [
    <Button
      key="viewDetails"
      type="submit"
      onClick={() => setShowDetail(true)}
      disabled={false}
      loading={false}
      fullWidth={false}
    >
      Details
    </Button>,
  ] as JSX.Element[]
  if (!!lat && !!lng) {
    buttons.push(
      <Button
        key="viewDirection"
        type="submit"
        onClick={handleDirectionOnClick({ appointment, queryParams, history })}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Directions
      </Button>,
    )
  }
  return [<>{buttons}</>]
}

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
}

export type RenderModalTitleParams = {
  appointmentType?: ListItemModel
  heading: string
}
export const renderModalTitle = ({ appointmentType, heading }) => {
  return (
    <>
      {heading && <H5>{heading}</H5>}
      {appointmentType && <SubTitleH5 className="mb-0">{appointmentType?.value}</SubTitleH5>}
    </>
  )
}

export const handleModalClose = (setShowDetail: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setShowDetail(false)
}

export const AppointmentTile: React.FC<AppointmentTileProps> = ({ appointment }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  const line1 = appointment?.property?.address?.line1 ?? ''
  const buildingName = appointment?.property?.address?.buildingName ?? ''
  const buildingNumber = appointment?.property?.address?.buildingNumber ?? ''
  const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`
  const [isShowDetail, setShowDetail] = React.useState<boolean>(false)
  return (
    <>
      <Tile
        hightlight={false}
        key={appointment.id}
        heading={heading}
        footerItems={renderFooterItems({ appointment, queryParams, history, setShowDetail })}
      >
        <IconList items={renderIconItems({ appointment })} />
      </Tile>
      <AppointmentDetailModal
        title={renderModalTitle({ heading, appointmentType: appointment?.appointmentType })}
        appointment={appointment}
        visible={isShowDetail}
        onClose={handleModalClose(setShowDetail)}
      />
    </>
  )
}

export default AppointmentTile

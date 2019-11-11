import React, { memo } from 'react'
import { Tile, getTime, closestTo, IconList } from '@reapit/elements'
import { AppointmentModel } from '@/types/appointments'
import ViewDirectionButton from '@/components/container/view-direction-button'
import ViewDetailButton from '../container/view-detail-button'
import ETAButton from './eta-button'
import { NextAppointment } from '@/reducers/next-appointment'
import containerStyle from '@/styles/pages/page-container.scss?mod'
import appointmentListStyles from '@/styles/ui/appointment-list.scss?mod'
import { ListItemModel } from '../../types/configuration'
import { FaClock, FaStreetView, FaAddressCard } from 'react-icons/fa'

export interface AppointmentListProps {
  appointments: AppointmentModel[]
  appointmentTypes: ListItemModel[]
  nextAppointment?: NextAppointment | null
  selectedAppointment: AppointmentModel | null
  isOnline: boolean
  setSelectedAppointment: (appointment: AppointmentModel | null, type?: string) => void
}

export const handleUseEffect = ({ refAppointment }) => () => {
  if (refAppointment.current) {
    refAppointment.current.scrollIntoView({
      block: 'center',
      inline: 'center'
    })
  }
}

export const AppointmentList = memo(
  ({
    appointments,
    appointmentTypes,
    nextAppointment,
    isOnline,
    selectedAppointment,
    setSelectedAppointment
  }: AppointmentListProps) => {
    const appointmentNearest = React.useMemo(() => {
      // Get all start date
      const startDatesArray = appointments.map(item => item?.start || '')
      // Find appointment nearest current time
      return appointments.find(item => item.start === closestTo(new Date(), startDatesArray))
    }, [appointments])

    const refAppointment = React.useRef<HTMLDivElement>(null)

    const onSelectAppointment = (e, item, type: string) => {
      if (e.target.type !== 'button') {
        if (selectedAppointment && selectedAppointment.id === item.id && isOnline) {
          setSelectedAppointment(null)
        } else {
          setSelectedAppointment(item, type)
        }
      }
    }

    React.useEffect(handleUseEffect({ refAppointment }), [])

    if (appointments.length === 0) {
      return <div className="py-8 px-3 text-center">No appointments</div>
    }

    return (
      <div className={`px-4 ${containerStyle.appointmentsListWrapper}`}>
        {appointments.map(item => {
          const line1 = item?.property?.address?.line1
          const line2 = item?.property?.address?.line2
          const line3 = item?.property?.address?.line3
          const line4 = item?.property?.address?.line4
          const postcode = item?.property?.address?.postcode
          const buildingName = item?.property?.address?.buildingName
          const buildingNumber = item?.property?.address?.buildingNumber
          const typeId = item?.typeId
          const start = getTime(item?.start || '')
          const end = getTime(item?.end || '')
          const lat = item?.property?.address?.geolocation?.latitude
          const lng = item?.property?.address?.geolocation?.longitude
          const type = typeId ? appointmentTypes.find(appointmentType => appointmentType.id === typeId) : null
          const cancelled = item?.cancelled

          const hightlight = selectedAppointment
            ? selectedAppointment.id === item.id
            : appointmentNearest && appointmentNearest.id === item.id
          const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`
          const address = `${line2 || ''} ${line3 || ''} ${line4 || ''} ${postcode || ''}`

          const nextAppointmentId = nextAppointment?.id
          const nextAppointmentType = (nextAppointment?.attendeeWithMobile?.type || '').toLowerCase()

          const displayETAButton =
            nextAppointmentId === item.id &&
            nextAppointmentType &&
            nextAppointmentType !== 'negotiator' &&
            nextAppointmentType !== 'office'

          let renderETAButton: React.ReactNode = null
          if (displayETAButton) {
            const tel = (nextAppointment?.attendeeWithMobile?.communicationDetails || []).filter(
              ({ label }) => label === 'Mobile'
            )[0].detail

            const name = nextAppointment?.attendeeWithMobile?.name || ''
            const negName = nextAppointment?.currentNegotiator?.name || ''
            const duration = nextAppointment?.durationText

            renderETAButton = (
              <ETAButton
                tel={tel || ''}
                body={`Hi ${name}, ${
                  negName ? `this is ${negName}, ` : ''
                }I am on my way to you. I will be with you in approximately ${duration}.`}
              >
                ETA Text
              </ETAButton>
            )
          }
          return (
            <div
              className="mb-4"
              onClick={e => onSelectAppointment(e, item, type && type.value ? type.value : '')}
              key={item.id}
              ref={hightlight ? refAppointment : null}
            >
              <Tile
                hightlight={hightlight}
                key={item.id}
                heading={heading}
                footerItems={[
                  <div className={appointmentListStyles.tileFooter}>
                    <ViewDetailButton id={item.id} />

                    {lat && lng ? <ViewDirectionButton appointment={item} /> : null}
                    {renderETAButton}
                  </div>
                ]}
              >
                <IconList
                  items={[
                    {
                      icon: <FaAddressCard className="icon-list-icon" />,
                      text: address
                    },
                    {
                      icon: <FaStreetView className="icon-list-icon" />,
                      text: type && type.value ? type.value : ''
                    },
                    {
                      icon: <FaClock className="icon-list-icon" />,
                      text: cancelled ? 'Appointment cancelled' : `${start} - ${end}`
                    }
                  ]}
                />
              </Tile>
            </div>
          )
        })}
      </div>
    )
  }
)

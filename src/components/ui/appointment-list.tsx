import React, { memo } from 'react'
import { Tile, getTime, closestTo, IconList } from '@reapit/elements'
import { AppointmentModel } from '@/types/appointments'
import ViewDirectionButton from '@/components/container/view-direction-button'
import { oc } from 'ts-optchain'
import ViewDetailButton from '../container/view-detail-button'
import ETAButton from './eta-button'
import { NextAppointment } from '@/reducers/next-appointment'
import containerStyle from '@/styles/pages/page-container.scss?mod'
import { ListItemModel } from '../../types/configuration'
import { FaClock, FaStreetView, FaAddressCard } from 'react-icons/fa'

export interface AppointmentListProps {
  appointments: AppointmentModel[]
  appointmentTypes: ListItemModel[]
  nextAppointment?: NextAppointment | null
  selectedAppointment: AppointmentModel | null
  setSelectedAppointment: (appointment: AppointmentModel | null, type?: string) => void
}

export const AppointmentList = memo(
  ({
    appointments,
    appointmentTypes,
    nextAppointment,
    selectedAppointment,
    setSelectedAppointment
  }: AppointmentListProps) => {
    const appointmentNearest = React.useMemo(() => {
      // Get all start date
      const startDatesArray = appointments.map(item => oc<AppointmentModel>(item).start(''))
      // Find appointment nearest current time
      return appointments.find(item => item.start === closestTo(new Date(), startDatesArray))
    }, [appointments])

    const refAppointment = React.useRef<HTMLDivElement>(null)

    const onSelectAppointment = (e, item, type: string) => {
      if (e.target.type !== 'button') {
        if (selectedAppointment && selectedAppointment.id === item.id) {
          setSelectedAppointment(null)
        } else {
          setSelectedAppointment(item, type)
        }
      }
    }

    React.useEffect(() => {
      if (refAppointment.current) {
        refAppointment.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        })
      }
    }, [])

    if (appointments.length === 0) {
      return <div className="py-8 px-3 text-center">No appointments</div>
    }

    return (
      <div className={`px-4 ${containerStyle.appointmentsListWrapper}`}>
        {appointments.map(item => {
          const line1 = oc<AppointmentModel>(item).property.address.line1()
          const line2 = oc<AppointmentModel>(item).property.address.line2()
          const line3 = oc<AppointmentModel>(item).property.address.line3()
          const line4 = oc<AppointmentModel>(item).property.address.line4()
          const postcode = oc<AppointmentModel>(item).property.address.postcode()
          const buildingName = oc<AppointmentModel>(item).property.address.buildingName()
          const buildingNumber = oc<AppointmentModel>(item).property.address.buildingNumber()
          const typeId = oc<AppointmentModel>(item).typeId()
          const start = getTime(oc<AppointmentModel>(item).start(''))
          const end = getTime(oc<AppointmentModel>(item).end(''))
          const lat = oc<AppointmentModel>(item).property.address.geolocation.latitude()
          const lng = oc<AppointmentModel>(item).property.address.geolocation.longitude()
          const type = typeId ? appointmentTypes.find(appointmentType => appointmentType.id === typeId) : null
          const cancelled = oc<AppointmentModel>(item).cancelled()

          const hightlight = selectedAppointment
            ? selectedAppointment.id === item.id
            : appointmentNearest && appointmentNearest.id === item.id
          const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`
          const address = `${line2 || ''} ${line3 || ''} ${line4 || ''} ${postcode || ''}`

          const displayETAButton =
            nextAppointment &&
            nextAppointment.id === item.id &&
            nextAppointment.attendeeHaveMobile &&
            // less than 10 minutes
            nextAppointment.durationValue <= 600

          let renderETAButton: React.ReactNode = null

          if (displayETAButton) {
            const tel = oc(nextAppointment)
              .attendeeHaveMobile.communicationDetails([])
              .filter(({ label }) => label === 'Mobile')[0].detail
            const name = oc(nextAppointment).attendeeHaveMobile[0].name('')

            renderETAButton = (
              <div className="mt-4 ml-4">
                <ETAButton tel={tel || ''} body={`Hi ${name}, I will be with you in 10 mins`}>
                  ETA Text
                </ETAButton>
              </div>
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
                  <>
                    <ViewDetailButton id={item.id} />

                    {lat && lng ? <ViewDirectionButton appointment={item} /> : null}
                    {renderETAButton}
                  </>
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

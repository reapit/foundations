import React, { memo } from 'react'
import { AppointmentTile, getTime, closestTo } from '@reapit/elements'
import { AppointmentModel } from '@/types/appointments'
import ViewDirectionButton from '@/components/container/view-direction-button'
import { oc } from 'ts-optchain'
import ViewDetailButton from '../container/view-detail-button'
import ETAButton from './eta-button'
import { NextAppointment } from '@/reducers/next-appointment'
import containerStyle from '@/styles/pages/page-container.scss?mod'

export interface AppointmentListProps {
  data: AppointmentModel[]
  nextAppointment?: NextAppointment | null
  selectedAppointment: AppointmentModel | null
  setSelectedAppointment: (appointment: AppointmentModel | null) => void
}

export const AppointmentList = memo(
  ({ data, nextAppointment, selectedAppointment, setSelectedAppointment }: AppointmentListProps) => {
    const appointmentNearest = React.useMemo(() => {
      // Get all start date
      const startDatesArray = data.map(item => oc<AppointmentModel>(item).start(''))
      // Find appointment nearest current time
      return data.find(item => item.start === closestTo(new Date(), startDatesArray))
    }, [data])

    const refAppointment = React.useRef<HTMLDivElement>(null)

    const onSelectAppointment = (e, item) => {
      if (e.target.type !== 'button') {
        if (selectedAppointment && selectedAppointment.id === item.id) {
          setSelectedAppointment(null)
        } else {
          setSelectedAppointment(item)
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

    if (data.length === 0) {
      return <div className="py-8 px-3 text-center">No appointments</div>
    }

    return (
      <div className={`px-4 ${containerStyle.appointmentsListWrapper}`}>
        {data.map(item => {
          const line1 = oc<AppointmentModel>(item).property.address.line1()
          const line2 = oc<AppointmentModel>(item).property.address.line2()
          const line3 = oc<AppointmentModel>(item).property.address.line3()
          const line4 = oc<AppointmentModel>(item).property.address.line4()
          const postcode = oc<AppointmentModel>(item).property.address.postcode()
          const buildingName = oc<AppointmentModel>(item).property.address.buildingName()
          const buildingNumber = oc<AppointmentModel>(item).property.address.buildingNumber()
          const type = oc<AppointmentModel>(item).typeId()
          const start = getTime(oc<AppointmentModel>(item).start(''))
          const end = getTime(oc<AppointmentModel>(item).end(''))

          const hightlight = selectedAppointment
            ? selectedAppointment.id === item.id
            : appointmentNearest && appointmentNearest.id === item.id
          const heading = `${buildingNumber || buildingName || ''} ${line1 || ''}`
          const address = `${heading} ${line2 || ''} ${line3 || ''} ${line4 || ''} ${postcode || ''}`

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
              onClick={e => onSelectAppointment(e, item)}
              key={item.id}
              ref={hightlight ? refAppointment : null}
            >
              <AppointmentTile hightlight={hightlight} key={item.id} heading={heading}>
                <ul>
                  <li>Address: {address}</li>
                  <li>
                    Time: {start} - {end}
                  </li>
                  <li>Type: {type}</li>
                </ul>
                <div className="flex">
                  <div className="mt-4 mr-4">
                    <ViewDetailButton id={item.id} />
                  </div>
                  <div className="mt-4">
                    <ViewDirectionButton appointment={item} />
                  </div>
                  {renderETAButton}
                </div>
              </AppointmentTile>
            </div>
          )
        })}
      </div>
    )
  }
)

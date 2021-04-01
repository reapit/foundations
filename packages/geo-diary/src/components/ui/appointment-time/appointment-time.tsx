import * as React from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import { History } from 'history'
import qs from 'query-string'
import { ROUTES } from '@/core/router'

export type HandleChangeTimeParams = {
  time: 'today' | 'tomorrow' | 'weekView'
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleChangeTime = ({ history, time, queryParams }: HandleChangeTimeParams) => () => {
  const queryString = qs.stringify({
    ...queryParams,
    time: time,
    destinationLat: undefined,
    destinationLng: undefined,
    appointmentId: undefined,
  })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export interface AppointmentTimeProps {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const AppointmentTime = ({ queryParams, history }: AppointmentTimeProps) => (
  <ButtonGroup className="is-narrow" isCentered>
    <Button
      type="button"
      variant={queryParams.time !== 'tomorrow' && queryParams.time !== 'weekView' ? 'primary' : 'secondary'}
      onClick={handleChangeTime({ queryParams, history, time: 'today' })}
    >
      TODAY
    </Button>
    <Button
      type="button"
      variant={queryParams.time === 'tomorrow' ? 'primary' : 'secondary'}
      onClick={handleChangeTime({ queryParams, history, time: 'tomorrow' })}
    >
      TOMORROW
    </Button>
    <Button
      type="button"
      variant={queryParams.time === 'weekView' ? 'primary' : 'secondary'}
      onClick={handleChangeTime({ queryParams, history, time: 'weekView' })}
    >
      WEEK
    </Button>
  </ButtonGroup>
)

export default React.memo(AppointmentTime)

import * as React from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import qs from 'query-string'
import { ROUTES } from '@/core/router'

export type AppointmentTime = 'Today' | 'Tomorrow' | 'Week View'

export type HandleChangeTravelModeParams = {
  time: 'today' | 'tomorrow' | 'week_view'
  queryParams: qs.ParsedQuery<string>
  history: {
    push: (queryString: string) => void
  }
}

export const handleChangeTravelMode = ({ history, time, queryParams }: HandleChangeTravelModeParams) => () => {
  const queryString = qs.stringify({ ...queryParams, time: time })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export interface AppointmentTimeProps {
  queryParams: qs.ParsedQuery<string>
  history: {
    push: (queryString: string) => void
  }
}

export const AppointmentTime = ({ queryParams, history }: AppointmentTimeProps) => (
  <ButtonGroup>
    <Button
      type="button"
      variant="secondary"
      className={queryParams.time === 'today' ? 'is-selected is-info' : ''}
      onClick={handleChangeTravelMode({ queryParams, history, time: 'today' })}
    >
      TODAY
    </Button>
    <Button
      type="button"
      variant="secondary"
      className={queryParams.time === 'tomorrow' ? 'is-selected is-info' : ''}
      onClick={handleChangeTravelMode({ queryParams, history, time: 'tomorrow' })}
    >
      TOMORROW
    </Button>
    <Button
      type="button"
      variant="secondary"
      className={queryParams.time === 'week_view' ? 'is-selected is-info' : ''}
      onClick={handleChangeTravelMode({ queryParams, history, time: 'week_view' })}
    >
      WEEK VIEW
    </Button>
  </ButtonGroup>
)

export default React.memo(AppointmentTime)

import * as React from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import { History } from 'history'
import qs from 'query-string'
import { ROUTES } from '@/core/router'
import { timeButtonGroupContainer } from './__styles__'

export type HandleChangeTravelModeParams = {
  time: 'today' | 'tomorrow' | 'weekView'
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleChangeTravelMode = ({ history, time, queryParams }: HandleChangeTravelModeParams) => () => {
  const queryString = qs.stringify({ ...queryParams, time: time })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export interface AppointmentTimeProps {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const AppointmentTime = ({ queryParams, history }: AppointmentTimeProps) => (
  <ButtonGroup className={timeButtonGroupContainer}>
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
      className={queryParams.time === 'weekView' ? 'is-selected is-info' : ''}
      onClick={handleChangeTravelMode({ queryParams, history, time: 'weekView' })}
    >
      WEEK VIEW
    </Button>
  </ButtonGroup>
)

export default React.memo(AppointmentTime)

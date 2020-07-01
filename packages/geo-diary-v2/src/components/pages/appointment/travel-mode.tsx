import * as React from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import { cx } from 'linaria'
import qs from 'query-string'
import { ROUTES } from '@/core/router'

export type TravelMode = 'DRIVING' | 'WALKING'

export type HandleChangeTravelModeParams = {
  travelMode: string
  queryParams: qs.ParsedQuery<string>
  history: {
    push: (queryString: string) => void
  }
}

export const handleChangeTravelMode = ({ history, travelMode, queryParams }: HandleChangeTravelModeParams) => () => {
  const queryString = qs.stringify({ ...queryParams, travelMode: travelMode })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export type TravelModeProps = {
  queryParams: qs.ParsedQuery<string>
  history: {
    push: (queryString: string) => void
  }
}

export const TravelMode: React.FC<TravelModeProps> = ({ queryParams, history }) => {
  return (
    <ButtonGroup>
      <Button
        type="button"
        variant="secondary"
        className={cx(queryParams.travelMode === 'DRIVING' && 'is-selected is-info')}
        onClick={handleChangeTravelMode({ queryParams, travelMode: 'DRIVING', history })}
      >
        Car
      </Button>
      <Button
        type="button"
        variant="secondary"
        className={cx(queryParams.travelMode === 'WALKING' && 'is-selected is-info')}
        onClick={handleChangeTravelMode({ queryParams, travelMode: 'WALKING', history })}
      >
        Walk
      </Button>
    </ButtonGroup>
  )
}

export default React.memo(TravelMode)

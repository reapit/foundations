import * as React from 'react'
const { useState } = React
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setCurrentLoc } from '@/actions/current-loc'
import { Button } from '@reapit/elements'

interface CurrentLocButtonMappedActions {
  setCurrentLoc: (loc: Position) => void
}

export interface CurrentLocButtonRenderProps {
  isDisableCurrentLocButton: boolean
  buttonOnClick: () => void
}

export type CurrentLocButtonProps = CurrentLocButtonMappedActions & {
  children?: React.FunctionComponent<CurrentLocButtonRenderProps>
}

const navigatorOnGetLocationSuccess = setCurrentLoc => geo => {
  setCurrentLoc(geo)
}

const navigatorOnGetLocationFailure = setFailureLoc => () => {
  setFailureLoc(true)
}

export const CurrentLocButton = ({ setCurrentLoc, children }: CurrentLocButtonProps) => {
  const [isDisableCurrentLocButton, setIsDisableCurrentLocButton] = useState(false)

  const buttonOnClick = () => {
    if (!navigator.geolocation) {
      alert("Your browser doesn't support geolocation API.")
      setIsDisableCurrentLocButton(true)
    }

    navigator.geolocation.getCurrentPosition(
      navigatorOnGetLocationSuccess(setCurrentLoc),
      navigatorOnGetLocationFailure(setIsDisableCurrentLocButton)
    )
  }

  if (typeof children === 'function') {
    return children({ isDisableCurrentLocButton, buttonOnClick })
  }

  return (
    <Button variant="primary" type="button" disabled={isDisableCurrentLocButton} onClick={buttonOnClick}>
      Get Current Location
    </Button>
  )
}

export const mapDispatchToProps = (dispatch: Dispatch): CurrentLocButtonMappedActions => ({
  setCurrentLoc: (loc: Position) => dispatch(setCurrentLoc(loc))
})

const CurrentLocButtonWithConnect = connect(
  null,
  mapDispatchToProps
)(CurrentLocButton)

CurrentLocButtonWithConnect.displayName = 'CurrentLocButtonWithConnect'

export default CurrentLocButtonWithConnect

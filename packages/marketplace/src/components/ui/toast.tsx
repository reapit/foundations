import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Toast as ToastElement } from '@reapit/elements'
import { errorClearedServer, errorClearedComponent } from '@/actions/error'
import { selectErrorState } from '@/selector/error'

export type ToastProps = {}

export const handleErrorClearedServerCallback = (dispatch: Dispatch) => {
  return () => {
    dispatch(errorClearedServer(null))
  }
}
export const handleErrorClearedComponentCallback = (dispatch: Dispatch) => {
  return () => {
    dispatch(errorClearedComponent(null))
  }
}

const Toast: React.FC<ToastProps> = () => {
  const dispatch = useDispatch()
  const { componentError, serverError } = useSelector(selectErrorState)
  const errorClearedServerCallback = React.useCallback(handleErrorClearedServerCallback(dispatch), [dispatch])
  const errorClearedComponentCallback = React.useCallback(handleErrorClearedComponentCallback(dispatch), [dispatch])

  return (
    <ToastElement
      componentError={componentError}
      serverError={serverError}
      errorClearedComponent={errorClearedComponentCallback}
      errorClearedServer={errorClearedServerCallback}
    />
  )
}

export default Toast

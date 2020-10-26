import React, { useContext } from 'react'
import { ErrorData, Toast } from '@reapit/elements'
import { ErrorContext } from '../../context/error-context'

export const serverError = (message?: string): ErrorData => ({
  type: 'SERVER',
  message: message ? message : 'Something went wrong fetching data',
})

export const componentError = (message?: string): ErrorData => ({
  type: 'COMPONENT',
  message: message ? message : 'Something went wrong with this component',
})

export const setComponentError = (setErrorComponent: React.Dispatch<ErrorData | null>) => (error?: ErrorData) => {
  if (error) return setErrorComponent(error)
  return setErrorComponent(null)
}

export const setServerError = (setErrorServer: React.Dispatch<ErrorData | null>) => (error?: ErrorData) => {
  if (error) return setErrorServer(error)
  return setErrorServer(null)
}

const ToastError: React.FC = () => {
  const { componentErrorState, setComponentErrorState, serverErrorState, setServerErrorState } = useContext(
    ErrorContext,
  )

  return (
    <Toast
      componentError={componentErrorState}
      serverError={serverErrorState}
      errorClearedComponent={setComponentError(setComponentErrorState)}
      errorClearedServer={setServerError(setServerErrorState)}
    />
  )
}

export default ToastError

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Routes from '../../../constants/routes'
import { confirmRegistration } from '../../../services/cognito-identity'

export const handleUseEffect =
  ({ userName, verificationCode, navigate }) =>
  () => {
    confirmRegistration({
      userName,
      verificationCode,
      connectClientId: process.env.connectClientId,
    })
      .then(() => {
        navigate(`${Routes.LOGIN}?isSuccess=1`)
      })
      .catch((error) => {
        console.log(error)
        navigate(`${Routes.LOGIN}?confirmError=1`)
      })
  }

export const RegisterConfirm: React.FC = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(search)
  const userName = queryParams.get('userName')
  const verificationCode = queryParams.get('verificationCode')
  React.useEffect(handleUseEffect({ userName, verificationCode, navigate }), [])
  return <React.Fragment />
}

export default RegisterConfirm

import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Routes from '@/constants/routes'
import { confirmRegistration } from '@reapit/cognito-auth'

export const handleUseEffect = ({ userName, verificationCode, replace }) => () => {
  confirmRegistration({ userName, verificationCode })
    .then(() => {
      replace(`${Routes.DEVELOPER_LOGIN}?isSuccess=1`)
    })
    .catch(error => {
      console.log(error)
      replace(`${Routes.DEVELOPER_LOGIN}?confirmError=1`)
    })
}

export const RegisterConfirm: React.FC = () => {
  const { search } = useLocation()
  const { replace } = useHistory()
  const queryParams = new URLSearchParams(search)
  const userName = queryParams.get('userName')
  const verificationCode = queryParams.get('verificationCode')
  React.useEffect(handleUseEffect({ userName, verificationCode, replace }), [])
  return <React.Fragment />
}

export default RegisterConfirm

import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { fetcher, COGNITO_API_BASE_URL } from '@reapit/elements'
import Routes from '@/constants/routes'
import { MARKETPLACE_HEADERS } from '@/constants/api'

export const callConfirmRegistration = async body => {
  const CHANGE_PASSWORD_URL = '/registration/confirm'
  const response = await fetcher({
    url: CHANGE_PASSWORD_URL,
    api: COGNITO_API_BASE_URL,
    method: 'POST',
    headers: MARKETPLACE_HEADERS,
    body: body
  })
  return response
}

export const handleUseEffect = ({ userName, verificationCode, replace }) => () => {
  callConfirmRegistration({ userName, verificationCode })
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

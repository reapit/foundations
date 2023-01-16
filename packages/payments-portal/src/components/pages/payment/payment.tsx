import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { Route, useLocation, useParams } from 'react-router'
import { Routes } from '../../../constants/routes'
import { PaymentExternalPage } from './payment-external'
import { PaymentInternalPage } from './payment-internal'
import { PaymentParams, usePaymentsState } from '../../../core/use-payments-state'

export interface PaymentUriParams {
  paymentId: string
}

export const handleSetUriParams =
  (
    setPaymentParams: Dispatch<SetStateAction<PaymentParams>>,
    paymentId: string,
    session: string | null,
    clientId: string | null,
  ) =>
  () => {
    setPaymentParams({ paymentId, session, clientId })
  }

export const Payment: FC = () => {
  const location = useLocation()
  const { paymentId } = useParams<PaymentUriParams>()
  const { paymentsDataState } = usePaymentsState()
  const { search } = location
  const queryParams = new URLSearchParams(search)
  const session = queryParams.get('session')
  const clientId = queryParams.get('clientCode')

  const { setPaymentParams } = paymentsDataState

  useEffect(handleSetUriParams(setPaymentParams, paymentId, session, clientId), [paymentId, session, clientId])

  if (session && clientId) {
    return <Route path={Routes.PAYMENT} component={PaymentExternalPage} exact />
  }

  return <Route path={Routes.PAYMENT} component={PaymentInternalPage} exact />
}

export default Payment

import React, { FC } from 'react'
import { useLocation } from 'react-router'
import PrivateRouteWrapper from '../../../core/private-route-wrapper'
import { PaymentsProvider } from '../../../core/use-payments-state'
import { MainContainer } from '@reapit/elements'
import ErrorBoundary from '../../../core/error-boundary'
import Payment from './payment'

export const PaymentPage: FC = () => {
  const location = useLocation()
  const { search } = location
  const queryParams = new URLSearchParams(search)
  const session = queryParams.get('session')
  const clientId = queryParams.get('clientCode')

  if (session && clientId) {
    return (
      <PaymentsProvider>
        <ErrorBoundary>
          <MainContainer>
            <Payment />
          </MainContainer>
        </ErrorBoundary>
      </PaymentsProvider>
    )
  }

  return (
    <ErrorBoundary>
      <PrivateRouteWrapper>
        <Payment />
      </PrivateRouteWrapper>
    </ErrorBoundary>
  )
}

export default PaymentPage

import React from 'react'
import { Route, useLocation, useParams } from 'react-router'
import { FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import PrivateRouteWrapper from '../../core/private-route-wrapper'
import PaymentExternalPage from './payment-external'
import PaymentInternalPage from './payment-internal'
import { flexHeightFix } from '../../core/__styles__/styles'

const PaymentPage: React.FC = () => {
  const location = useLocation()
  const { paymentId } = useParams<{ paymentId: string }>()
  const { search } = location
  const queryParams = new URLSearchParams(search)
  const session = queryParams.get('session')
  const clientId = queryParams.get('clientCode')

  if (session && clientId) {
    const PaymentExternalPageWithProps: React.FC = () => (
      <PaymentExternalPage session={session} paymentId={paymentId} clientId={clientId} />
    )
    return (
      <FlexContainerBasic flexColumn isScrollable isFullHeight>
        <FlexContainerResponsive className={flexHeightFix} hasPadding flexColumn hasBackground isFullHeight>
          <Route path={Routes.PAYMENT} component={PaymentExternalPageWithProps} exact />
        </FlexContainerResponsive>
      </FlexContainerBasic>
    )
  }

  const PaymentInternalPageWithProps: React.FC = () => <PaymentInternalPage paymentId={paymentId} />
  return (
    <PrivateRouteWrapper>
      <Route path={Routes.PAYMENT} component={PaymentInternalPageWithProps} exact />
    </PrivateRouteWrapper>
  )
}

export default PaymentPage

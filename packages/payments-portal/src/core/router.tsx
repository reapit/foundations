import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { RoutePaths } from '../constants/routes'
import { catchChunkError } from '@reapit/utils-react'
import { PageContainer, PersistentNotification } from '@reapit/elements'

export const history: History<any> = createBrowserHistory()

const PaymentPage = React.lazy(() => catchChunkError(() => import('../components/payment')))

export const FourOFour: FC = () => (
  <PageContainer>
    <PersistentNotification isFullWidth isInline isExpanded intent="danger">
      Page not found
    </PersistentNotification>
  </PageContainer>
)

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.PAYMENT} element={<PaymentPage />} />
    <Route path={RoutePaths.HOME} index element={<FourOFour />} />
  </Routes>
)

const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default Router

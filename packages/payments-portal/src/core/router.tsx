import React, { FC } from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { Routes } from '../constants/routes'
import { PageContainer, PersistentNotification } from '@reapit/elements'
import { catchChunkError } from '@reapit/utils-react'

export const history: History<any> = createBrowserHistory()

const PaymentPage = React.lazy(() => catchChunkError(() => import('../components/payment')))

export const FourOFour: FC = () => (
  <PageContainer>
    <PersistentNotification isFullWidth isInline isExpanded intent="danger">
      Page not found
    </PersistentNotification>
  </PageContainer>
)

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.PAYMENT} component={PaymentPage} exact />
        <Route render={() => <FourOFour />} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router

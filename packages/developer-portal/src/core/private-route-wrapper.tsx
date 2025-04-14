import React, { FC, Suspense, useEffect, PropsWithChildren } from 'react'
import Menu from './menu'
import { Navigate, NavigateFunction, useLocation, useNavigate } from 'react-router'
import Routes from '../constants/routes'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { HelperWidget, HelperWidgetApps } from '@reapit/utils-react'
import { GlobalProvider } from './use-global-state'
import { FourOFour } from './router'
import { selectIsCustomer } from '../utils/auth'
import { TAndCsHoc } from './t-and-cs-hoc'

export const handleRedirectRegistraitionPage =
  (navigate: NavigateFunction, connectSession: ReapitConnectSession | null) => () => {
    const developerId = connectSession?.loginIdentity?.developerId
    const isCustomer = selectIsCustomer(connectSession)

    if (developerId || !connectSession) return

    if (!isCustomer) {
      return navigate(Routes.SELECT_ROLE)
    }

    navigate(`${Routes.CUSTOMER_REGISTER}`)
  }

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const navigate = useNavigate()

  const currentUri = `${location.pathname}${location.search}`
  const isAusUser = connectSession?.loginIdentity.orgProduct?.toLowerCase() === 'agentbox'

  useEffect(handleRedirectRegistraitionPage(navigate, connectSession), [connectSession, history])

  if (isAusUser) {
    return <FourOFour />
  }

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  return (
    <GlobalProvider>
      <TAndCsHoc>
        <MainContainer>
          {location.pathname !== Routes.CUSTOMER_REGISTER && <Menu />}
          <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
          {process.env.appEnv !== 'production' && <HelperWidget appName={HelperWidgetApps.developerPortal} />}
        </MainContainer>
      </TAndCsHoc>
    </GlobalProvider>
  )
}

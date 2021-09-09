import { js } from './js'
import { lint } from './format'

export const generatePrivateRouterWrapper = () => {
  return lint(js`
  import * as React from 'react'
  import { useReapitConnect } from '@reapit/connect-session'
  import { reapitConnectBrowserSession } from './session'
  import { useLocation, Redirect } from 'react-router'
  import { Loader, MainContainer, PageContainer } from '@reapit/elements'
  
  const { Suspense } = React
  
  export type PrivateRouteWrapperProps = {}
  
  export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
    const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
    const location = useLocation()
    const currentUri = [location.pathname, location.search].join('')
  
    if (!connectSession) {
      return (
        <MainContainer>
          <PageContainer>
            <Loader label="Loading" fullPage />
          </PageContainer>
        </MainContainer>
      )
    }
  
    if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
      return <Redirect to={connectInternalRedirect} />
    }
    return (
      <MainContainer>
        <Menu />
        <Suspense fallback={<Loader label="Loading" fullPage />}>{children}</Suspense>
      </MainContainer>
    )
  }
  
  export default PrivateRouteWrapper
`)
}

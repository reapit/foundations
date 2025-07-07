import React, { FC, PropsWithChildren, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Navigate } from 'react-router'
import {
  Button,
  FlexContainer,
  Loader,
  MainContainer,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  Title,
  elMt5,
} from '@reapit/elements'
import { getIsAdmin } from '../utils/is-admin'
import { RoutePaths } from '../constants/routes'
import { openNewPage } from '../utils/navigation'

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = location?.pathname
  const { isAdmin, isFoundationsAdmin } = getIsAdmin(connectSession)

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (!isAdmin) {
    return <Navigate to={RoutePaths.LOGIN} />
  }

  if (!isFoundationsAdmin && currentUri === RoutePaths.ORGS) {
    return <Navigate to={RoutePaths.USERS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} />
  }

  if (currentUri === RoutePaths.HOME) {
    return <Navigate to={RoutePaths.USERS} />
  }

  return (
    <MainContainer>
      <Nav />
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <SmallText tag="p" hasGreyText>
            This app will allow Reapit Employees to manage Reapit Connect user accounts. Specifically, you can see
            information about users (Org and User Claims), change the active status and can also reset passwords.
          </SmallText>
          <SmallText tag="p" hasSectionMargin hasGreyText className={elMt5}>
            Should you encounter an issue or need support, please use the &apos;Help&apos; button below.
          </SmallText>
          <Button
            intent="neutral"
            onClick={openNewPage(
              'https://reapit.atlassian.net/wiki/spaces/FOUN/pages/2874114065/Reapit+Connect+Service+App',
            )}
          >
            Help
          </Button>
        </SecondaryNavContainer>
        <PageContainer>
          <FlexContainer isFlexColumn>
            <Title>{location.pathname === RoutePaths.ORGS ? 'Organisations' : 'Users'}</Title>
            <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
          </FlexContainer>
        </PageContainer>
      </FlexContainer>
    </MainContainer>
  )
}

export default PrivateRouteWrapper

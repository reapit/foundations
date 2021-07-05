import {
  elHFull,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import React, { FC, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import { navigate } from '../../ui/menu'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { graphQLWrapper } from './__styles__/index'

export const GraphQLPage: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const graphQlRef = useRef<HTMLDivElement | null>(null)
  const { pathname } = location

  useEffect(() => {
    window.GraphQLPlayground.init(graphQlRef.current, {
      endpoint: window.reapit.config.graphQLUri,
      headers: {
        authorization: connectSession?.idToken,
        ['reapit-connect-token']: connectSession?.accessToken,
      },
      settings: {
        ['tracing.tracingSupported']: false,
        ['editor.theme']: 'light',
      },
    })
  }, [graphQlRef, connectSession])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <SecondaryNav>
          <SecondaryNavItem onClick={navigate(history, Routes.SWAGGER)} active={pathname === Routes.SWAGGER}>
            Foundations API
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.GRAPHQL)} active={pathname === Routes.GRAPHQL}>
            GraphQL
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>GraphQL</Title>
        <div className={graphQLWrapper} ref={graphQlRef} />
      </PageContainer>
    </FlexContainer>
  )
}

export default GraphQLPage

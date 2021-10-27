import {
  SmallText,
  Button,
  elHFull,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
} from '@reapit/elements'
import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { graphQLWrapper } from './__styles__/index'
import { GRAPHQL_CONSTANTS } from '../../../constants/graphql'
import { openNewPage, ExternalPages, navigate } from '../../../utils/navigation'

const { scriptSrc, scriptId, localStorageKey, settings } = GRAPHQL_CONSTANTS

// Load the GQL playground script dynamically from a CDN when I load the page as the React component.
// does mot work with the latest React Redux versions
export const handleLoadGQLPlayground = (setLoaded: Dispatch<SetStateAction<boolean>>) => () => {
  const existingScript = document.getElementById(scriptId)
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = scriptSrc
    script.id = scriptId
    document.body.appendChild(script)
    script.onload = () => {
      setLoaded(true)
    }
  } else {
    setLoaded(true)
  }
}

export const handleInitGQLPlayground =
  (loaded: boolean, graphQlRef: MutableRefObject<HTMLDivElement | null>, connectSession: ReapitConnectSession | null) =>
  () => {
    if (!loaded) {
      // While the script  is loading, nuke local storage as playground caches access tokens and causes
      // a 401 by not refreshing them
      localStorage.removeItem(localStorageKey)
    }

    if (loaded && connectSession?.accessToken && connectSession?.idToken) {
      const { accessToken, idToken } = connectSession
      // Script has loaded so initialize playground with headers and settings
      window.GraphQLPlayground.init(graphQlRef.current, {
        endpoint: window.reapit.config.graphQLUri,
        headers: {
          authorization: idToken,
          ['reapit-connect-token']: accessToken,
        },
        settings,
      })
    }
  }

export const GraphQLPage: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loaded, setLoaded] = useState(false)
  const graphQlRef = useRef<HTMLDivElement | null>(null)
  const { pathname } = location

  useEffect(handleLoadGQLPlayground(setLoaded), [])

  useEffect(handleInitGQLPlayground(loaded, graphQlRef, connectSession), [graphQlRef, connectSession, loaded])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>API</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigate(history, Routes.SWAGGER)} active={pathname === Routes.SWAGGER}>
            REST API
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.WEBHOOKS_ABOUT)} active={pathname.includes('webhooks')}>
            Webhooks
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.GRAPHQL)} active={pathname === Routes.GRAPHQL}>
            GraphQL
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon className={elMb5} icon="graphQlInfographic" iconSize="large" />
        <Subtitle>GraphQL Playground</Subtitle>
        <SmallText hasGreyText>
          GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
          GraphQL gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve
          APIs over time, and enables powerful developer tools.
        </SmallText>
        <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.graphQLDocs)}>
          View Docs
        </Button>
        <Button className={elMb5} intent="critical" onClick={openNewPage(window.reapit.config.graphQLUri)}>
          Open New
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>GraphQL</Title>
        {!loaded && <Loader label="Loading" fullPage />}
        <div className={graphQLWrapper} ref={graphQlRef} />
      </PageContainer>
    </FlexContainer>
  )
}

export default GraphQLPage

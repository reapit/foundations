import {
  elHFull,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import { navigate } from '../../ui/menu'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { graphQLWrapper } from './__styles__/index'
import { GRAPHQL_CONSTANTS } from '../../../constants/graphql'

const { scriptSrc, scriptId, localStorageKey, settings } = GRAPHQL_CONSTANTS

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

export const handleInitGQLPlayground = (
  loaded: boolean,
  graphQlRef: MutableRefObject<HTMLDivElement | null>,
  connectSession: ReapitConnectSession | null,
) => () => {
  if (!loaded) {
    localStorage.removeItem(localStorageKey)
  }

  if (loaded && connectSession?.accessToken && connectSession?.idToken) {
    const { accessToken, idToken } = connectSession
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

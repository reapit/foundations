import { Loader, Title } from '@reapit/elements'
import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { graphQLWrapper } from './__styles__/index'
import { GRAPHQL_CONSTANTS } from '../../constants/graphql'

const { scriptSrc, scriptId, localStorageKey, settings } = GRAPHQL_CONSTANTS

// Load the GQL playground script dynamically from a CDN when I load the page as the React component.
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
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loaded, setLoaded] = useState(false)
  const graphQlRef = useRef<HTMLDivElement | null>(null)
  useEffect(handleLoadGQLPlayground(setLoaded), [])

  useEffect(handleInitGQLPlayground(loaded, graphQlRef, connectSession), [graphQlRef, connectSession, loaded])

  return (
    <>
      <Title>GraphQL</Title>
      {!loaded && <Loader />}
      <div className={graphQLWrapper} ref={graphQlRef} />
    </>
  )
}

export default GraphQLPage

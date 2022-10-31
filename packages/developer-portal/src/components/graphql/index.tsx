import { Loader, Title } from '@reapit/elements'
import React, { FC, useEffect, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { ApolloExplorer } from '@apollo/explorer/react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { cx } from '@linaria/core'
import { graphQLWrapper } from './__styles__'

export const GraphQLPage: FC = () => {
  const { connectSession, connectHasSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (connectHasSession && loading) {
      setLoading(false)
    }
  }, [connectHasSession])

  return (
    <>
      <Title>GraphQL</Title>
      {loading ? (
        <Loader />
      ) : (
        <ApolloExplorer
          className={cx(graphQLWrapper)}
          graphRef=""
          endpointUrl={window.reapit.config.graphQLUri as any}
          initialState={{
            document: `query GetApplicants {
  get_applicants_(embed: ["areas"]) {
    _embedded {
      id,
      created,
      modified,
      currency,
      _embedded,
    },
    pageSize,
    pageCount,
    pageNumber,
    totalCount,
    totalPageCount,
  }
}`,
            headers: {
              Authorization: `Bearer ${
                window.reapit.config.graphQLUri.includes('v2') ? connectSession?.accessToken : connectSession?.idToken
              }`,
            },
            displayOptions: {
              theme: 'light',
              showHeadersAndEnvVars: true,
            },
          }}
        />
      )}
    </>
  )
}

export default GraphQLPage

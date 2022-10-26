import { Loader, Title } from '@reapit/elements'
import React, { FC, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { ApolloExplorer } from '@apollo/explorer/react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { cx } from '@linaria/core'
import { graphQLWrapper } from './__styles__'

export const GraphQLPage: FC = () => {
  const { connectSession, connectHasSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(true)

  if (connectHasSession && loading) {
    setLoading(false)
  }

  return (
    <>
      <Title>GraphQL</Title>
      {loading ? (
        <Loader />
      ) : (
        <ApolloExplorer
          className={cx(graphQLWrapper)}
          graphRef=""
          endpointUrl={'http://localhost:4000/graphql' as any}
          initialState={{
            document: `query GetApplicants {
  get_applicants_ {
    _embedded {
      id,
      created,
      modified,
      currency,
    },
    pageSize,
    pageCount,
    pageNumber,
    totalCount,
    totalPageCount,
  }
}`,
            headers: {
              Authorization: `Bearer ${connectSession?.accessToken}`,
            },
            displayOptions: {
              showHeadersAndEnvVars: true,
            },
          }}
        />
      )}
    </>
  )
}

export default GraphQLPage

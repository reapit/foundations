import { Title } from '@reapit/elements'
import React, { FC } from 'react'
import { GraphQLV1 } from './v1'
import { GraphQLV2 } from './v2'

export const GraphQLPage: FC = () => {
  return (
    <>
      <Title>GraphQL</Title>
      {window.reapit.config.GRAPHQL_EXPLORER ? <GraphQLV2 /> : <GraphQLV1 />}
    </>
  )
}

export default GraphQLPage

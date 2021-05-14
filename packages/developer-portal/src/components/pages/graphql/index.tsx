import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import React from 'react'
import { Playground } from 'graphql-playground-react'

export const GraphQLPage = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  console.log(connectSession)

  return (
    <>
      <Playground endpoint={''} settings={{}} />
    </>
  )
}

import React, { FC } from 'react'
import { H3 } from '@reapit/elements-legacy'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  console.log(connectSession)

  return (
    <>
      <H3>Deployment Service UI</H3>
    </>
  )
}

export default Authenticated

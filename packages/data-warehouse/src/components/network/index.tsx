import React, { FC } from 'react'
import { NetworkProvider } from './use-network-state'
import { Network } from './network'

const NetworkPage: FC = () => (
  <NetworkProvider>
    <Network />
  </NetworkProvider>
)

export default NetworkPage

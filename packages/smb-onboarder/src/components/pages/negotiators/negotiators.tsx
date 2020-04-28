import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import NegotiatorList from '@/components/ui/negotiators-list'

export type NegotiatorsProps = {}

export const Negotiators: React.FC<NegotiatorsProps> = () => {
  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Users</H3>
        <NegotiatorList />
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Negotiators

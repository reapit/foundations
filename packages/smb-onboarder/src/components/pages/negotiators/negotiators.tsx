import * as React from 'react'
import { H3, Section } from '@reapit/elements'
import NegotiatorList from '@/components/ui/negotiators-list'

export type NegotiatorsProps = {}

export const Negotiators: React.FC<NegotiatorsProps> = () => {
  return (
    <>
      <Section>
        <H3>Users</H3>
      </Section>

      <NegotiatorList />
    </>
  )
}

export default Negotiators

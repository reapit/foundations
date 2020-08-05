import * as React from 'react'
import { H3, Section } from '@reapit/elements'
import OfficesTab from '../../ui/offices-tab'

export type OfficesProps = {}

export const Offices: React.FC<OfficesProps> = () => {
  return (
    <>
      <Section>
        <H3>Offices</H3>
      </Section>
      <Section>
        <OfficesTab />
      </Section>
    </>
  )
}

export default Offices

import React from 'react'
import { H3, H5, Section, Content } from '@reapit/elements'

export type HealthProps = {}

export const Health: React.FC<HealthProps> = () => {
  return (
    <Content>
      <H3 isHeadingSection>Health</H3>
      <Section>
        <H5>Next steps:</H5>
      </Section>
    </Content>
  )
}

export default Health

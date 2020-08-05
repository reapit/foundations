import * as React from 'react'
import { H3, Content } from '@reapit/elements'
import ConfigForm from '../ui/config-form'

export type AuthenticatedProps = {}

export const Authenticated: React.FC<AuthenticatedProps> = () => {
  return (
    <>
      <Content>
        <H3 isHeadingSection>Property Projector</H3>
        <ConfigForm />
      </Content>
    </>
  )
}

export default Authenticated

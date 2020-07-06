import * as React from 'react'
import { H3, Section, SubTitleH5 } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'

export type AuthenticatedProps = {}

export const Authenticated: React.FunctionComponent<AuthenticatedProps> = () => {
  return (
    <ErrorBoundary>
      <Section>
        <H3>Welcome To Reapit Foundations</H3>
        <SubTitleH5>You are now authenticated against our sandbox data</SubTitleH5>
      </Section>
    </ErrorBoundary>
  )
}

export default Authenticated

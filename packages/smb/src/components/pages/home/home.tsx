import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { useAuthContext } from '@/context/auth-context'

export type AuthenticatedProps = {}

export const Authenticated: React.FunctionComponent<AuthenticatedProps> = () => {
  console.log('accessToken', useAuthContext().loginSession?.accessToken)

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding>
        <FlexContainerResponsive flexColumn hasPadding hasBackground>
          <H3>Welcome To Reapit Foundations</H3>
          <SubTitleH5>You are now authenticated against our sandbox data</SubTitleH5>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default Authenticated

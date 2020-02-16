import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'

export interface AuthenticatedMappedActions {}

export interface AuthenticatedMappedProps {}

export type AuthenticatedProps = AuthenticatedMappedActions & AuthenticatedMappedProps

export const Authenticated: React.FunctionComponent<AuthenticatedProps> = () => {
  return (
    <FlexContainerBasic hasPadding>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Welcome To Reapit Foundations</H3>
        <SubTitleH5>You are now authenticated against our sandbox data</SubTitleH5>
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Authenticated

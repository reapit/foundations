import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'

export type HomeProps = RouteComponentProps

export const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding hasBackground>
        <FlexContainerResponsive flexColumn hasPadding hasBackground>
          <H3>Welcome To Reapit Elements</H3>
          <SubTitleH5>
            Click <Link to="/login">here</Link> to login
          </SubTitleH5>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default Home

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'

export type HomeMappedActions = {}

export type HomeMappedProps = {
  homeState: any
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>

export const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Welcome To Reapit Elements</H3>
        <SubTitleH5>
          Click <Link to="/login">here</Link> to login
        </SubTitleH5>
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default withRouter(Home)

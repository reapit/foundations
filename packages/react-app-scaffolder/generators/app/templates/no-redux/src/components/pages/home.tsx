import * as React from 'react'
<<<<<<< HEAD
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'

export type HomeProps = RouteComponentProps
=======
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { HomeState } from '@/reducers/home'
import ErrorBoundary from '@/components/hocs/error-boundary'

export interface HomeMappedActions {}

export interface HomeMappedProps {
  homeState: HomeState
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>
>>>>>>> temp

export const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding hasBackground>
        <FlexContainerResponsive flexColumn hasPadding hasBackground>
          <H3>Welcome To Reapit Foundations</H3>
          <SubTitleH5>
            Click <Link to="/login">here</Link> to login
          </SubTitleH5>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

<<<<<<< HEAD
export default Home
=======
const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  homeState: state.home,
})

const mapDispatchToProps = (): HomeMappedActions => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
>>>>>>> temp

import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../../types/core'
import { authLogout } from '../../actions/auth'
// import { DeveloperState } from '../../reducers/developer'
// import { developerClearData, developerRequestData } from '../../actions/developer'

export interface DeveloperMappedActions {
  logout: () => void
}

export interface DeveloperMappedProps {
  // developerState: DeveloperState
}
export type DeveloperProps = DeveloperMappedActions & DeveloperMappedProps

export const Developer: React.FunctionComponent<DeveloperProps> = ({ logout }) => (
  <div>
    Developer
    <br />
    <button onClick={() => logout()}>Logout</button>
  </div>
)

const mapStateToProps = (state: ReduxState): DeveloperMappedProps => ({})

const mapDispatchToProps = (dispatch: any): DeveloperMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Developer)

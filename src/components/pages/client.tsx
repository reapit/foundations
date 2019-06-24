import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../../types/core'
import { authLogout } from '../../actions/auth'
// import { ClientState } from '../../reducers/client'
// import { clientClearData, clientRequestData } from '../../actions/client'

export interface ClientMappedActions {
  logout: () => void
}

export interface ClientMappedProps {
  // clientState: ClientState
}
export type ClientProps = ClientMappedActions & ClientMappedProps

export const Client: React.FunctionComponent<ClientProps> = ({ logout }) => (
  <div>
    Client page
    <br />
    <button onClick={() => logout()}>Logout</button>
  </div>
)

const mapStateToProps = (state: ReduxState): ClientMappedProps => ({})

const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client)

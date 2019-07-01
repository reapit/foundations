import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import { ClientState } from '@/reducers/client'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import AppCard from '../ui/app-card'

export interface ClientMappedProps {
  clientState: ClientState
}

export interface ClientMappedActions {
  logout: () => void
}

export interface ClientMappedProps {
  clientState: ClientState
}
export type ClientProps = ClientMappedActions & ClientMappedProps

export const Client: React.FunctionComponent<ClientProps> = ({ logout, clientState }) => (
  <div className="container pt-5">
    {clientState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className="row">
          {clientState.clientData &&
            clientState.clientData.data.map(child => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={child.id}>
                <AppCard {...child} />
              </div>
            ))}
        </div>
      </ErrorBoundary>
    )}
  </div>
)

const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client
})

const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client)

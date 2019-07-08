import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import { ClientState } from '@/reducers/client'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import AppCard from '../ui/app-card'
import bulma from '@/styles/vendor/bulma'
import bulmaUtils from '../../styles/vendor/bulma-utils'

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

const { container, columns, isMultiLine } = bulma
const { isResponsiveColumn } = bulmaUtils

export const Client: React.FunctionComponent<ClientProps> = ({ logout, clientState }) => (
  <div className={container}>
    {clientState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className={`${columns} ${isMultiLine}`} data-test="client-card-container">
          {clientState.clientData &&
            clientState.clientData.data.map(child => (
              <div className={`${isResponsiveColumn}`} key={child.id}>
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

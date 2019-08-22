import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AdminState } from '@/reducers/admin'
import bulma from '../../styles/vendor/bulma'

export interface AdminHomeMappedProps {
  adminState: AdminState
}

export type AdminHomeProps = AdminHomeMappedProps

const { container } = bulma

export const AdminHome: React.FunctionComponent<AdminHomeProps> = ({ adminState }) => (
  <div className={container}>
    {adminState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div>Admin area</div>
      </ErrorBoundary>
    )}
  </div>
)

const mapStateToProps = (state: ReduxState): AdminHomeMappedProps => ({
  adminState: state.admin
})

export default connect(mapStateToProps)(AdminHome)

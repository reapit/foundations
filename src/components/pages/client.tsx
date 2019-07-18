import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { appDetailRequestData } from '@/actions/app-detail'
import { ClientState } from '@/reducers/client'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import AppCard from '../ui/app-card'
import bulma from '@/styles/vendor/bulma'
import bulmaUtils from '../../styles/vendor/bulma-utils'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { AppDetailState } from '@/reducers/app-detail'

export interface ClientMappedProps {
  clientState: ClientState
}

export interface ClientMappedActions {
  fetchAppDetail: (id: string) => void
}

export interface ClientMappedProps {
  clientState: ClientState
  appDetail: AppDetailState
}

export type ClientProps = ClientMappedActions & ClientMappedProps

const { container, columns, isMultiLine } = bulma
const { isResponsiveColumn } = bulmaUtils

export const Client: React.FunctionComponent<ClientProps> = ({ appDetail, clientState, fetchAppDetail }) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div className={container}>
      {clientState.loading ? (
        <Loader />
      ) : (
        <ErrorBoundary>
          <div className={`${columns} ${isMultiLine}`} data-test="client-card-container">
            {clientState.clientData &&
              clientState.clientData.data.map(child => (
                <div className={`${isResponsiveColumn}`} key={child.id}>
                  <AppCard
                    {...child}
                    onClick={() => {
                      setVisible(true)
                      if (!appDetail.appDetailData || appDetail.appDetailData.data.id !== child.id) {
                        fetchAppDetail(child.id)
                      }
                    }}
                  />
                </div>
              ))}
          </div>
          <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
        </ErrorBoundary>
      )}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client,
  appDetail: state.appDetail
})

const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client)

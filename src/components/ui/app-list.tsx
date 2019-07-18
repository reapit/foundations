import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import bulmaUtils from '../../styles/vendor/bulma-utils'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import AppCard from './app-card'
import styles from '@/styles/blocks/app-list.scss?mod'
import Loader from './loader'
import AppDetailModal from './app-detail-modal'
import { ReduxState } from '@/types/core'
import { connect } from 'react-redux'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'

export interface AppListMappedProps {
  appDetail: AppDetailState
}

export interface AppListMappedActions {
  fetchAppDetail: (id: string) => void
}

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
} & AppListMappedActions &
  AppListMappedProps

export const AppList: React.FunctionComponent<AppListProps> = ({ list, loading, fetchAppDetail, appDetail }) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div className={`${bulma.container} ${bulma.isRelative} ${styles.container}`} data-test="app-list-container">
      <div className={`${bulma.columns} ${bulma.isMultiLine} ${loading ? styles.contentIsLoading : ''}`}>
        {list.map(app => (
          <div className={`${bulmaUtils.isResponsiveColumn}`} key={app.id}>
            <AppCard
              app={app}
              onClick={() => {
                setVisible(true)
                if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
                  fetchAppDetail(app.id)
                }
              }}
            />
          </div>
        ))}
      </div>
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </div>
  )
}

const mapStateToProps = (state: ReduxState): AppListMappedProps => ({
  appDetail: state.appDetail
})

const mapDispatchToProps = (dispatch: any): AppListMappedActions => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList)

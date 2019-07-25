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

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
}

export const AppList: React.FunctionComponent<AppListProps> = ({ list, loading, onCardClick }) => {
  return (
    <div className={`${bulma.container} ${bulma.isRelative} ${styles.container}`} data-test="app-list-container">
      <div className={`${bulma.columns} ${bulma.isMultiLine} ${loading ? styles.contentIsLoading : ''}`}>
        {list.map(app => (
          <div className={`${bulmaUtils.isResponsiveColumn}`} key={app.id}>
            <AppCard
              app={app}
              onClick={() => {
                typeof onCardClick === 'function' && onCardClick(app)
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
    </div>
  )
}

export default AppList

import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import bulmaUtils from '../../styles/vendor/bulma-utils'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import AppCard from './app-card'
import styles from '@/styles/blocks/app-list.scss?mod'
import { Loader } from '@reapit/elements'
import Info, { InfoType } from '../pages/info'

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  onSettingsClick?: (app: AppSummaryModel) => void
  title: string
  infoType: InfoType
}

export const AppList: React.FunctionComponent<AppListProps> = ({
  list,
  loading,
  onCardClick,
  onSettingsClick,
  title,
  infoType
}) => {
  return (
    <div className={`${bulma.container} ${bulma.isRelative} ${styles.container}`} data-test="app-list-container">
      <h3 className={`${bulma.title} ${bulma.is3}`}>{title}</h3>
      <div className={`${bulma.columns} ${bulma.isMultiLine} ${loading ? styles.contentIsLoading : ''}`}>
        {!list.length && !loading ? (
          <Info infoType={infoType} />
        ) : (
          list.map(app => (
            <div className={`${bulmaUtils.isResponsiveColumn}`} key={app.id}>
              <AppCard
                app={app}
                onClick={
                  onCardClick
                    ? (event: React.MouseEvent) => {
                        event.stopPropagation()
                        onCardClick(app)
                      }
                    : undefined
                }
                onSettingsClick={
                  onSettingsClick
                    ? (event: React.MouseEvent) => {
                        event.stopPropagation()
                        onSettingsClick(app)
                      }
                    : undefined
                }
              />
            </div>
          ))
        )}
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

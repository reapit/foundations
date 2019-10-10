import * as React from 'react'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import AppCard from './app-card'
import styles from '@/styles/blocks/app-list.scss?mod'
import { Loader, H3, InfoType, Info, FlexContainerBasic, GridFiveCol, GridFiveColItem } from '@reapit/elements'

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
    <FlexContainerBasic flexColumn data-test="app-list-container">
      <H3>{title}</H3>
      <GridFiveCol className={` ${loading ? styles.contentIsLoading : ''}`}>
        {!list.length && !loading ? (
          <Info infoType={infoType} />
        ) : (
          list.map(app => (
            <GridFiveColItem key={app.id}>
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
            </GridFiveColItem>
          ))
        )}
      </GridFiveCol>
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </FlexContainerBasic>
  )
}

export default AppList

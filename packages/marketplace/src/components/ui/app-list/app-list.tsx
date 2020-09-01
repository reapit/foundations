import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import AppCard from '../app-card'
import * as styles from './__styles__'
import { Loader, InfoType, GridFourCol, GridThreeColItem, Helper, infoText } from '@reapit/elements'
import { cx } from 'linaria'

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  onSettingsClick?: (app: AppSummaryModel) => void
  infoType: InfoType
  animated?: boolean
}

export const AppList: React.FunctionComponent<AppListProps> = ({
  list,
  loading,
  onCardClick,
  onSettingsClick,
  infoType,
  animated = false,
}) => {
  return (
    <div className="overflow-hidden mb-4">
      {!list.length && !loading ? (
        <Helper variant="info">
          {infoType
            ? infoText(infoType)
            : 'We are unable to find any Apps that match your search criteria. Please try again.'}
        </Helper>
      ) : (
        <GridFourCol className={cx(loading && styles.contentIsLoading)} data-test="app-list-container">
          {list.map(app => (
            <GridThreeColItem key={app.id}>
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
                animated={animated}
              />
            </GridThreeColItem>
          ))}
        </GridFourCol>
      )}
      {loading && <Loader body />}
    </div>
  )
}

export default AppList

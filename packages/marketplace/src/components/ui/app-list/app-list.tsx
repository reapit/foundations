import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import AppCard from '../app-card'
import * as styles from './__styles__'
import { Loader, InfoType, GridFourCol, GridFourColItem, Helper, infoText } from '@reapit/elements'
import { cx } from 'linaria'
import FadeIn from '../../../core/__styles__/fade-in'
import { ComingSoonAppComponent } from '../../pages/apps/coming-soon'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  onSettingsClick?: (app: AppSummaryModel) => void
  infoType: InfoType
}

export const AppList: React.FunctionComponent<AppListProps> = ({
  list,
  loading,
  onCardClick,
  onSettingsClick,
  infoType,
}) => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const comingSoonApps = (window.location.href.includes('/apps') && window.reapit.config.comingSoonApps) || []
  return (
    <div className="mb-4">
      {!list.length && !loading ? (
        <Helper variant="info">
          {infoType
            ? infoText(infoType)
            : 'We are unable to find any Apps that match your search criteria. Please try again.'}
        </Helper>
      ) : (
        <GridFourCol className={cx(loading && styles.contentIsLoading)} data-test="app-list-container">
          {list.map((app) => (
            <GridFourColItem className="" key={app.id}>
              <FadeIn>
                <AppCard
                  app={app}
                  connectIsDesktop={connectIsDesktop}
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
              </FadeIn>
            </GridFourColItem>
          ))}
          {comingSoonApps.map((app) => (
            <ComingSoonAppComponent app={app} key={app.image} isDesktop={connectIsDesktop} />
          ))}
        </GridFourCol>
      )}
      {loading && <Loader body />}
    </div>
  )
}

export default AppList

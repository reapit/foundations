import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router'
import { Loader, H3, isMobile, H5, Content, Section } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import InstalledAppList from '@/components/pages/installed-apps/installed-app-list'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { getParamsFromPath } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import { selectAppsListState } from '@/selector/apps'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { cx } from 'linaria'
import { useMemo } from 'react'
import { helperText } from './__styles__/installed-app-list'

export const handleOnChange = history => (page: number) => history.push(`${routes.INSTALLED_APPS}?page=${page}`)

export const handleOnCardClick = (connectIsDesktop: Boolean) => (app: AppSummaryModel) =>
  handleLaunchApp(app, connectIsDesktop)

export const InstalledApps: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const installedAppsState = useSelector(selectAppsListState)
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  const queryParams = getParamsFromPath(location.search)
  const { page: pageNumber = 1 } = queryParams

  const unfetched = !installedAppsState.data
  const loading = installedAppsState.isLoading
  const list = installedAppsState?.data || []
  const { totalCount, pageSize } = installedAppsState || {}
  const { code, state } = getParamsFromPath(history.location.search)
  const isMobileView = isMobile()
  const directApiApps = useMemo(() => list.filter(item => item.isDirectApi), [list])
  const agencyCloudApps = useMemo(() => list.filter(item => !item.isDirectApi), [list])

  // redirect to browser app page if no app installed and come from login page
  if (code && state && !list.length) {
    return <Redirect to={Routes.APPS} />
  }

  return (
    <ErrorBoundary>
      <H3 className={cx(isMobileView && 'text-center')} isHeadingSection>
        Installed Apps
      </H3>
      {unfetched || loading ? (
        <Loader />
      ) : (
        <Content>
          {!isMobileView && (
            <Section>
              <H5 className="mb-2">Agency Cloud Apps</H5>
              <i className={helperText}>
                These apps will launch within Agency Cloud desktop CRM or, if you are viewing this page in a web
                browser, you will be navigated directly to the app directly.
              </i>
            </Section>
          )}
          <InstalledAppList
            list={agencyCloudApps}
            loading={loading}
            onCardClick={handleOnCardClick(connectIsDesktop)}
            infoType="INSTALLED_APPS_EMPTY"
            pagination={{
              totalCount,
              pageSize,
              pageNumber,
              onChange: handleOnChange(history),
            }}
          />
          {!isMobileView && (
            <>
              <Section>
                <H5 className="mb-2">Third Party Apps (Direct API)</H5>
                <i className={helperText}>
                  These apps are installed by your organisation and integrate with Reapit Data however, you will need to
                  visit the app directly or follow the instructions fron the developer to launch and use the
                  functionality.
                </i>
              </Section>
              <InstalledAppList
                list={directApiApps}
                loading={loading}
                onCardClick={handleOnCardClick(connectIsDesktop)}
                infoType="INSTALLED_APPS_EMPTY"
                pagination={{
                  totalCount,
                  pageSize,
                  pageNumber,
                  onChange: handleOnChange(history),
                }}
              />
            </>
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default InstalledApps

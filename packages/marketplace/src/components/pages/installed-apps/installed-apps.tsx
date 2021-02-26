import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router'
import { Loader, H3, isMobile, Content, Section } from '@reapit/elements'
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
import { selectIsAdmin, selectSandboxDeveloper } from '../../../selector/auth'
import { Link } from 'react-router-dom'

export const handleOnChange = (history) => (page: number) => history.push(`${routes.INSTALLED_APPS}?page=${page}`)

export const handleOnCardClick = (connectIsDesktop: Boolean) => (app: AppSummaryModel) =>
  handleLaunchApp(app, connectIsDesktop)

export const InstalledApps: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const installedAppsState = useSelector(selectAppsListState)
  const { connectIsDesktop, connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const queryParams = getParamsFromPath(location.search)
  const { page: pageNumber = 1 } = queryParams

  const unfetched = !installedAppsState.data
  const loading = installedAppsState.isLoading
  const list = installedAppsState?.data || []
  const { totalCount, pageSize } = installedAppsState || {}
  const { code, state } = getParamsFromPath(history.location.search)
  const isMobileView = isMobile()
  const directApiApps = useMemo(() => list.filter((item) => item.isDirectApi), [list])
  const agencyCloudApps = useMemo(() => list.filter((item) => !item.isDirectApi), [list])
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const sandboxDeveloper = Boolean(selectSandboxDeveloper(connectSession))
  const isAdmin = isDesktopAdmin || sandboxDeveloper

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
          {!isMobileView && isAdmin && directApiApps.length ? (
            <Section>
              <i className={helperText}>
                You currently have {directApiApps.length} {directApiApps.length > 1 ? 'integrations' : 'integration'}{' '}
                installed for your organisation. To view or manage{' '}
                {directApiApps.length > 1 ? 'these integrations' : 'this integration'}, please click{' '}
                <Link to={Routes.MY_APPS}>here.</Link>
              </i>
            </Section>
          ) : null}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default InstalledApps

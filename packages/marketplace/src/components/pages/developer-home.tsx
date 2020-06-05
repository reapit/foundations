import * as React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { Loader } from '@reapit/elements'
import { selectDeveloper } from '@/selector'
import AppList from '@/components/ui/app-list'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { SandboxPopUp } from '@/components/ui/sandbox-pop-up'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { getParamValueFromPath } from '@/utils/client-url-params'
import Routes from '@/constants/routes'

export const handleOnCardClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.DEVELOPER_MY_APPS}/${app.id}`)
}

export const handleOnChange = (history: History) => (page: number) =>
  history.push(`${Routes.DEVELOPER_MY_APPS}?page=${page}`)

export type DeveloperProps = {}

export const DeveloperHome: React.FunctionComponent<DeveloperProps> = () => {
  const history = useHistory()
  const developerState = useSelector(selectDeveloper)

  let pageNumber = 1

  if (location && location.search) {
    const pageQueryString = getParamValueFromPath(location.search, 'page')
    if (pageQueryString) {
      pageNumber = Number(pageQueryString)
    }
  }

  const unfetched = !developerState.developerData
  const loading = developerState.loading
  const list = developerState?.developerData?.data?.data || []
  const { totalCount, pageSize } = developerState?.developerData?.data || {}

  if (unfetched || loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <div id="page-developer-home-container">
        <AppList
          list={list}
          hasSubmitButton
          title="My Apps"
          loading={loading}
          onCardClick={handleOnCardClick(history)}
          infoType="DEVELOPER_APPS_EMPTY"
          pagination={{
            totalCount,
            pageSize,
            pageNumber,
            onChange: handleOnChange(history),
          }}
        />
        <SandboxPopUp loading={loading} />
      </div>
    </ErrorBoundary>
  )
}

export default DeveloperHome

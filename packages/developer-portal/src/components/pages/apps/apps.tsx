import * as React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { Loader, Pagination, Section, H3, Button } from '@reapit/elements'
import AppList from '@/components/ui/apps/app-list'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { SandboxPopUp } from '@/components/ui/popup/sandbox-pop-up'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { getParamValueFromPath } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import { SubmitAppWizardModal } from '@/components/ui/submit-app-wizard'
import { selectAppListState } from '@/selector/apps/app-list'

export const handleOnCardClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.APPS}/${app.id}`)
}

export const handleOnChange = (history: History) => (page: number) => history.push(`${Routes.APPS}?page=${page}`)

export const onShowSubmitAppModal = (setSubmitAppModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => () =>
  setSubmitAppModalVisible(true)

export const onCloseSubmitAppModal = (setSubmitAppModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => () =>
  setSubmitAppModalVisible(false)

export const Apps: React.FC = () => {
  const history = useHistory()
  const { isLoading, data = [], totalCount, pageSize } = useSelector(selectAppListState)
  const [submitAppModalVisible, setSubmitAppModalVisible] = React.useState<boolean>(false)

  let pageNumber = 1

  if (location && location.search) {
    const pageQueryString = getParamValueFromPath(location.search, 'page')
    if (pageQueryString) {
      pageNumber = Number(pageQueryString)
    }
  }

  const unfetched = !data

  return (
    <ErrorBoundary>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">My Apps</H3>
        <Button onClick={onShowSubmitAppModal(setSubmitAppModalVisible)} type="button" variant="primary">
          Create new app
        </Button>
        <SubmitAppWizardModal
          visible={submitAppModalVisible}
          onClose={onCloseSubmitAppModal(setSubmitAppModalVisible)}
        />
      </Section>
      {unfetched || isLoading ? (
        <Loader />
      ) : (
        <>
          <AppList
            list={data}
            loading={isLoading}
            onCardClick={handleOnCardClick(history)}
            infoType="DEVELOPER_APPS_EMPTY"
          />
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            pageNumber={pageNumber}
            onChange={handleOnChange(history)}
          />
        </>
      )}
      <SandboxPopUp loading={isLoading} />
    </ErrorBoundary>
  )
}

export default Apps

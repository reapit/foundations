import * as React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { Pagination } from '@reapit/elements-legacy'
import AppList from '@/components/ui/apps/app-list'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { SandboxPopUp } from '@/components/ui/popup/sandbox-pop-up'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { getParamValueFromPath } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import { SubmitAppWizardModal } from '@/components/ui/submit-app-wizard'
import { selectAppListState } from '@/selector/apps/app-list'
import {
  SmallText,
  Button,
  elHFull,
  elMb3,
  elMb8,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
  ButtonGroup,
  useMediaQuery,
} from '@reapit/elements'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()
  const { isMobile } = useMediaQuery()
  const { pathname } = location
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
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>Apps</Title>
          <SecondaryNav className={elMb8}>
            <SecondaryNavItem
              onClick={navigate(history, Routes.APPS)}
              active={pathname === Routes.APPS && !submitAppModalVisible}
            >
              My Apps
            </SecondaryNavItem>
            <SecondaryNavItem onClick={onShowSubmitAppModal(setSubmitAppModalVisible)} active={submitAppModalVisible}>
              Create New App
            </SecondaryNavItem>
          </SecondaryNav>
          <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
          <Subtitle>Apps Documentation</Subtitle>
          <SmallText hasGreyText>
            This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
            created an app before or you need help, please take the time to view our getting started guide.
          </SmallText>
          <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
            View Docs
          </Button>
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <FlexContainer isFlexJustifyBetween>
            <Title>My Apps</Title>
            {isMobile && (
              <ButtonGroup alignment="right">
                <Button intent="low" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
                  Docs
                </Button>
                <Button intent="primary" onClick={onShowSubmitAppModal(setSubmitAppModalVisible)}>
                  New App
                </Button>
              </ButtonGroup>
            )}
          </FlexContainer>
          {unfetched || isLoading ? (
            <Loader label="Loading" fullPage />
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
        </PageContainer>
      </FlexContainer>
      <SubmitAppWizardModal visible={submitAppModalVisible} onClose={onCloseSubmitAppModal(setSubmitAppModalVisible)} />
      <SandboxPopUp loading={isLoading} />
    </ErrorBoundary>
  )
}

export default Apps

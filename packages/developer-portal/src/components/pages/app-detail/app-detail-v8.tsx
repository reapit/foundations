import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { selectInstallationsListData } from '@/selector/installations'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { selectInstallationsListLoading } from '@/selector/installations'
import { Section } from '@reapit/elements-legacy'
import routes from '@/constants/routes'
import AppContent from './app-content-v8'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/app-detail'
import {
  Button,
  elMb3,
  elMb8,
  elMr6,
  elWFull,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
  Subtitle,
  Tabs,
  Title,
} from '@reapit/elements'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import Routes from '@/constants/routes'
import { onCloseSubmitAppModal, onShowSubmitAppModal } from '../apps/apps'
import { SubmitAppWizardModal } from '@/components/ui/submit-app-wizard'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AppPipeline } from './pipeline'
import { MEDIA_INDEX } from '@/constants/media'
import ImagePlaceHolder from '@/assets/images/default-app-icon.jpg'
import { cx } from '@linaria/core'

export type AppDetailProps = {}

export const handleOnDeleteAppSuccess = (history: History) => () => {
  history.replace(routes.APPS)
}

export const closeInstallationsModal = (setIsInstallationsModalOpen: (isVisible: boolean) => void) => () => {
  setIsInstallationsModalOpen(false)
}

export const closeAppRevisionComparisonModal =
  (setIsAppRevisionComparisonModalOpen: (isVisible: boolean) => void) => () => {
    setIsAppRevisionComparisonModalOpen(false)
  }

export const closeDeleteAppModal = (setIsDeleteModalOpen: (isVisible: boolean) => void) => () => {
  setIsDeleteModalOpen(false)
}

export const onBackToAppsButtonClick = (history: History) => () => {
  history.push(routes.APPS)
}

const AppDetailsTabs = ({ tab }: { tab: string }) => {
  const appDetailState = useSelector(selectAppDetailState)

  switch (tab) {
    case 'pipelines':
      return <AppPipeline />
    default:
    case 'details':
      return (
        <Section isFlex isFlexColumn hasBackground isFullHeight hasPadding>
          <AppContent appDetailState={appDetailState} />
        </Section>
      )
  }
}

const AppDetailV8: React.FC<AppDetailProps> = () => {
  const appDetailState = useSelector(selectAppDetailState)
  const appDetailData = useSelector(selectAppDetailData)
  const appIcon = appDetailData.media?.filter(({ type }) => type === 'icon')[MEDIA_INDEX.ICON]
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const isLoadingInstallations = useSelector(selectInstallationsListLoading)
  const installationsData = useSelector(selectInstallationsListData)
  const unfetch = !appDetailState?.data || !installationsData
  const [tab, setTab] = useState<string>('details')
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const [submitAppModalVisible, setSubmitAppModalVisible] = useState<boolean>(false)

  if (isLoadingAppDetail || isLoadingInstallations || unfetch) {
    return <Loader label="Loading" fullPage />
  }

  return (
    <ErrorBoundary>
      <FlexContainer className={elWFull} isFlexInitial>
        <SecondaryNavContainer>
          <Title>Apps</Title>
          <SecondaryNav className={elMb8}>
            <SecondaryNavItem
              onClick={navigate(history, Routes.APPS)}
              active={pathname === Routes.APPS && !submitAppModalVisible}
            >
              My Apps
            </SecondaryNavItem>
            <SecondaryNavItem active={/^\/v8\/apps\/[a-z0-9-]/.test(pathname)}>App Details</SecondaryNavItem>
            <SecondaryNavItem active={/^\/v8\/apps\/[a-z0-9-]\/edit/.test(pathname)}>Edit App</SecondaryNavItem>
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
        <PageContainer>
          <FlexContainer isFlexRow isFlexAlignCenter>
            {
              <img
                className={cx('image', 'is-96x96', elMr6)}
                src={appIcon?.uri || ImagePlaceHolder}
                alt={appDetailData.name}
              />
            }
            <Title>{appDetailData.name}</Title>
          </FlexContainer>
          <Tabs
            isFullWidth
            name="app_tabs"
            onChange={(event) =>
              // @ts-ignore
              setTab(event.target.value)
            }
            options={[
              {
                id: 'details',
                value: 'details',
                text: 'General Info',
                isChecked: tab === 'details',
              },
              {
                id: 'pipelines',
                value: 'pipelines',
                text: 'Pipeline',
                isChecked: tab === 'pipelines',
              },
            ]}
          ></Tabs>
          <AppDetailsTabs tab={tab} />
        </PageContainer>
        <SubmitAppWizardModal
          visible={submitAppModalVisible}
          onClose={onCloseSubmitAppModal(setSubmitAppModalVisible)}
        />
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default AppDetailV8

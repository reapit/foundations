import React, { FC, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { History } from 'history'
import {
  Button,
  ButtonGroup,
  elMb5,
  elMb8,
  elMb9,
  elWFull,
  FlexContainer,
  Icon,
  Label,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Tabs,
  Title,
  useMediaQuery,
  useModal,
  SmallText,
} from '@reapit/elements'
import Routes from '../../../constants/routes'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import { WebhooksAbout } from './webhooks-about'
import { WebhooksManage } from './webhooks-manage'
import { WebhooksLogs } from './webhooks-logs'
import { WebhooksNew } from './webhooks-new'
import WebhooksControls from './webhooks-controls'
import { useWebhooksState } from './state/use-webhooks-state'

export const handleChangeTab = (history: History) => (event: ChangeEvent<HTMLInputElement>) => {
  history.push(`${event.target.value}${history.location.search}`)
}

export const getTabContent = (pathname: string) => {
  switch (pathname) {
    case Routes.WEBHOOKS_NEW:
      return <WebhooksNew />
    case Routes.WEBHOOKS_MANAGE:
      return <WebhooksManage />
    case Routes.WEBHOOKS_LOGS:
      return <WebhooksLogs />
    case Routes.WEBHOOKS_ABOUT:
    default:
      return <WebhooksAbout />
  }
}

export const WebhooksWrapper: FC = () => {
  const history = useHistory()
  const { webhooksDataState } = useWebhooksState()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const { apps } = webhooksDataState
  const { pathname } = window.location
  const isAboutPage = pathname === Routes.WEBHOOKS_ABOUT
  const isManagePage = pathname === Routes.WEBHOOKS_MANAGE
  const isLogsPage = pathname === Routes.WEBHOOKS_LOGS
  const isNewPage = !isAboutPage && !isLogsPage && !isManagePage

  return (
    <FlexContainer className={elWFull} isFlexInitial>
      <SecondaryNavContainer>
        <Title>API</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigate(history, Routes.SWAGGER)} active={pathname === Routes.SWAGGER}>
            REST API
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.WEBHOOKS_ABOUT)} active={pathname.includes('webhooks')}>
            Webhooks
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.GRAPHQL)} active={pathname === Routes.GRAPHQL}>
            GraphQL
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.DESKTOP)} active={pathname === Routes.DESKTOP}>
            Desktop
          </SecondaryNavItem>
        </SecondaryNav>
        {isAboutPage && (
          <>
            <Icon className={elMb5} icon="webhooksInfographic" iconSize="large" />
            <Subtitle>Webhooks Documentation</Subtitle>
            <SmallText hasGreyText>
              This system is designed to flexibly work with how your application is built and deployed. If you wish, you
              can set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to set up
              a different webhook subscription per topic or per customer. For more information about Webhooks, please
              see our documentation.
            </SmallText>
            <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.webhooksDocs)}>
              View Docs
            </Button>
          </>
        )}
        {(isManagePage || isLogsPage) && (
          <div className={elMb8}>
            <Label>
              {isManagePage
                ? 'Please select an App from the list below to view the associated Webhooks'
                : 'Please select a Time slot and an App from the list below to view the associated Webhooks. Please note, we only support a range of times up to 6 months.'}
            </Label>
          </div>
        )}
        {apps?.data && <WebhooksControls />}
      </SecondaryNavContainer>
      <PageContainer>
        <FlexContainer isFlexJustifyBetween>
          <Title>Webhooks</Title>
          {isMobile && !isNewPage && (
            <ButtonGroup alignment="right">
              {isAboutPage && (
                <Button className={elMb5} intent="low" onClick={openNewPage(ExternalPages.webhooksDocs)}>
                  View Docs
                </Button>
              )}
              {(isManagePage || isLogsPage) && (
                <Button intent="low" onClick={openModal}>
                  Filters
                </Button>
              )}
            </ButtonGroup>
          )}
        </FlexContainer>
        {isMobile && apps?.data && (
          <Modal title="Filters">
            <WebhooksControls />
            <ButtonGroup alignment="center">
              <Button intent="secondary" onClick={closeModal}>
                Close
              </Button>
            </ButtonGroup>
          </Modal>
        )}
        <Tabs
          name="webhook-tabs"
          isFullWidth
          onChange={handleChangeTab(history)}
          options={[
            {
              id: 'webhook-tab-about',
              value: Routes.WEBHOOKS_ABOUT,
              text: 'About Webhooks',
              isChecked: pathname === Routes.WEBHOOKS_ABOUT,
            },
            {
              id: 'webhook-tab-new',
              value: Routes.WEBHOOKS_NEW,
              text: 'Add Webhook',
              isChecked: pathname === Routes.WEBHOOKS_NEW,
            },
            {
              id: 'webhook-tab-manage',
              value: Routes.WEBHOOKS_MANAGE,
              text: 'Manage Webhooks',
              isChecked: pathname === Routes.WEBHOOKS_MANAGE,
            },
            {
              id: 'webhook-tab-logs',
              value: Routes.WEBHOOKS_LOGS,
              text: 'Transaction Logs',
              isChecked: pathname === Routes.WEBHOOKS_LOGS,
            },
          ]}
        />
        {getTabContent(pathname)}
      </PageContainer>
    </FlexContainer>
  )
}

export default WebhooksWrapper

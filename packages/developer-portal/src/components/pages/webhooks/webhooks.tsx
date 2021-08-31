import React, { FC, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { History } from 'history'
import {
  BodyText,
  Button,
  elMb5,
  elMb9,
  elWFull,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Tabs,
  Title,
} from '@reapit/elements'
import Routes from '../../../constants/routes'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import { WebhooksAbout } from './webhooks-about'
import { WebhooksManage } from './webhooks-manage'
import { WebhooksLogs } from './webhooks-logs'
import { WebhooksNew } from './webhooks-new'

export const handleChangeTab = (history: History) => (event: ChangeEvent<HTMLInputElement>) => {
  history.push(event.target.value)
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
  const { pathname } = location

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
        </SecondaryNav>
        <Icon className={elMb5} icon="webhooksInfographic" iconSize="large" />
        <Subtitle>Webhooks Documentation</Subtitle>
        <BodyText hasGreyText>
          This system is designed to flexibly work with how your application is built and deployed. If you wish, you can
          set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to set up a
          different webhook subscription per topic or per customer. For more information about Webhooks, please see our
          documentation.
        </BodyText>
        <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.webhooksDocs)}>
          View Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <Title>Webhooks</Title>
        <Tabs
          name="webhook-tabs"
          isFullWidth
          onChange={handleChangeTab(history)}
          options={[
            {
              id: 'webhook-tab-about',
              value: Routes.WEBHOOKS_ABOUT,
              text: 'About Webhooks',
              isChecked: true,
            },
            {
              id: 'webhook-tab-new',
              value: Routes.WEBHOOKS_NEW,
              text: 'Add Webhook',
              isChecked: false,
            },
            {
              id: 'webhook-tab-manage',
              value: Routes.WEBHOOKS_MANAGE,
              text: 'Manage Webhooks',
              isChecked: false,
            },
            {
              id: 'webhook-tab-logs',
              value: Routes.WEBHOOKS_LOGS,
              text: 'Transaction Logs',
              isChecked: false,
            },
          ]}
        />
        {getTabContent(pathname)}
      </PageContainer>
    </FlexContainer>
  )
}

export default WebhooksWrapper

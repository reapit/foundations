import React, { FC, ChangeEvent } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { History } from 'history'
import { Button, ButtonGroup, elMb5, FlexContainer, Tabs, Title, useMediaQuery, useModal } from '@reapit/elements'
import Routes from '../../constants/routes'
import { openNewPage, ExternalPages } from '../../utils/navigation'
import WebhooksAbout from './webhooks-about'
import WebhooksManage from './webhooks-manage'
import WebhooksLogs from './webhooks-logs'
import WebhooksNew from './webhooks-new'
import WebhooksControls from './webhooks-controls'
import { useWebhooksState } from './state/use-webhooks-state'

export const handleChangeTab = (history: History) => (event: ChangeEvent<HTMLInputElement>) => {
  history.push(`${event.target.value}${history.location.search}`)
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
    <>
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
            isChecked: isAboutPage,
          },
          {
            id: 'webhook-tab-new',
            value: Routes.WEBHOOKS_NEW,
            text: 'Add Webhook',
            isChecked: isNewPage,
          },
          {
            id: 'webhook-tab-manage',
            value: Routes.WEBHOOKS_MANAGE,
            text: 'Manage Webhooks',
            isChecked: isManagePage,
          },
          {
            id: 'webhook-tab-logs',
            value: Routes.WEBHOOKS_LOGS,
            text: 'Transaction Logs',
            isChecked: isLogsPage,
          },
        ]}
      />
      <Switch>
        <Route path={Routes.WEBHOOKS_NEW} exact component={WebhooksNew} />
        <Route path={Routes.WEBHOOKS_MANAGE} component={WebhooksManage} />
        <Route path={Routes.WEBHOOKS_LOGS} exact component={WebhooksLogs} />
        <Route path={Routes.WEBHOOKS_ABOUT} exact component={WebhooksAbout} />
      </Switch>
    </>
  )
}

export default WebhooksWrapper

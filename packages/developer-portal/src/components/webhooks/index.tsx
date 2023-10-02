import React, { FC, ChangeEvent } from 'react'
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, MobileControls, Tabs, Title, useMediaQuery, useModal } from '@reapit/elements'
import RoutePaths from '../../constants/routes'
import WebhooksAbout from './webhooks-about'
import WebhooksManage from './webhooks-manage'
import WebhooksLogs from './webhooks-logs'
import WebhooksNew from './webhooks-new'
import WebhooksControls from './webhooks-controls'
import { useWebhooksState } from './state/use-webhooks-state'

export const handleChangeTab = (navigate: NavigateFunction) => (event: ChangeEvent<HTMLInputElement>) => {
  navigate(`${event.target.value}${window.location.search}`)
}

export const WebhooksWrapper: FC = () => {
  const navigate = useNavigate()
  const { webhooksDataState } = useWebhooksState()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const { apps } = webhooksDataState
  const { pathname } = window.location
  const isAboutPage = pathname === RoutePaths.WEBHOOKS_ABOUT
  const isManagePage = pathname === RoutePaths.WEBHOOKS_MANAGE
  const isLogsPage = pathname === RoutePaths.WEBHOOKS_LOGS
  const isNewPage = !isAboutPage && !isLogsPage && !isManagePage

  return (
    <>
      <Title>Webhooks</Title>
      <MobileControls onClick={openModal} />
      {isMobile && apps?.data && (
        <Modal title="Filters">
          <WebhooksControls />
          <ButtonGroup alignment="right">
            <Button intent="primary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <Tabs
        name="webhook-tabs"
        isFullWidth
        onChange={handleChangeTab(navigate)}
        options={[
          {
            id: 'webhook-tab-about',
            value: RoutePaths.WEBHOOKS_ABOUT,
            text: 'About Webhooks',
            isChecked: isAboutPage,
          },
          {
            id: 'webhook-tab-new',
            value: RoutePaths.WEBHOOKS_NEW,
            text: 'Add Webhook',
            isChecked: isNewPage,
          },
          {
            id: 'webhook-tab-manage',
            value: RoutePaths.WEBHOOKS_MANAGE,
            text: 'Manage Webhooks',
            isChecked: isManagePage,
          },
          {
            id: 'webhook-tab-logs',
            value: RoutePaths.WEBHOOKS_LOGS,
            text: 'Transaction Logs',
            isChecked: isLogsPage,
          },
        ]}
      />
      <Routes>
        <Route path={RoutePaths.WEBHOOKS_NEW.replace('/webhooks/', '')} element={<WebhooksNew />} />
        <Route path={RoutePaths.WEBHOOKS_MANAGE.replace('/webhooks/', '')} element={<WebhooksManage />} />
        <Route path={RoutePaths.WEBHOOKS_LOGS.replace('/webhooks/', '')} element={<WebhooksLogs />} />å
        <Route path={RoutePaths.WEBHOOKS_ABOUT.replace('/webhooks/', '')} element={<WebhooksAbout />} />
      </Routes>
    </>
  )
}

export default WebhooksWrapper

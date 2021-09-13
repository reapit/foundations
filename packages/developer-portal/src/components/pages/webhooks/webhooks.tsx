import React, { FC, ChangeEvent, useEffect, useState, SetStateAction, Dispatch } from 'react'
import { useHistory } from 'react-router-dom'
import { History } from 'history'
import {
  BodyText,
  Button,
  elBorderRadius,
  elMb5,
  elMb8,
  elMb9,
  elWFull,
  FlexContainer,
  Icon,
  InputGroup,
  Label,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Select,
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
import { useDispatch, useSelector } from 'react-redux'
import { selectAppListState } from '../../../selector/apps/app-list'
import { fetchAppList } from '../../../actions/apps'
import { GET_ALL_PAGE_SIZE } from '../../../constants/paginator'
import { FetchAppListParams } from '../../../reducers/apps/app-list'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Dispatch as ReduxDispatch } from 'redux'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { requestWebhookSubcriptionData } from '../../../actions/webhooks-subscriptions'
import { cx } from '@linaria/core'
import { StringMap } from '../../../types/core'
import dayjs from 'dayjs'

export interface WebhookQueryParams {
  applicationId: string
  from: string
  to: string
}

export type SelectAppIdHandler = (
  setWebhookQueryParams: Dispatch<SetStateAction<WebhookQueryParams>>,
  history: History,
) => SelectAppIdEventHandler

export type SelectAppIdEventHandler = (
  event?: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | undefined,
  applicationId?: string | undefined,
) => void

export const handleChangeTab = (history: History) => (event: ChangeEvent<HTMLInputElement>) => {
  history.push(`${event.target.value}${history.location.search}`)
}

export const getTabContent = (
  pathname: string,
  webhookQueryParams: WebhookQueryParams,
  selectAppIdHandler: SelectAppIdEventHandler,
) => {
  switch (pathname) {
    case Routes.WEBHOOKS_NEW:
      return <WebhooksNew webhookQueryParams={webhookQueryParams} selectAppIdHandler={selectAppIdHandler} />
    case Routes.WEBHOOKS_MANAGE:
      return <WebhooksManage webhookQueryParams={webhookQueryParams} />
    case Routes.WEBHOOKS_LOGS:
      return <WebhooksLogs webhookQueryParams={webhookQueryParams} />
    case Routes.WEBHOOKS_ABOUT:
    default:
      return <WebhooksAbout />
  }
}

export const handleFetchApps = (dispatch: ReduxDispatch, apps?: AppSummaryModel[], totalCount?: number) => () => {
  if (apps?.length && totalCount === apps.length) return
  dispatch(fetchAppList({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE } as FetchAppListParams))
}

export const handleFetchSubscriptions = (dispatch: ReduxDispatch, webhookQueryParams: WebhookQueryParams) => () => {
  const { applicationId } = webhookQueryParams
  if (!applicationId) return

  dispatch(requestWebhookSubcriptionData(applicationId))
}

export const handleHistoryToQueryParams = (history: History): WebhookQueryParams => {
  const queryParams = new URLSearchParams(history.location.search)
  return {
    applicationId: queryParams.get('applicationId') ?? '',
    from: queryParams.get('from') ?? dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    to: queryParams.get('to') ?? dayjs().format('YYYY-MM-DD'),
  }
}

export const handleSelectAppId: SelectAppIdHandler = (setWebhookQueryParams, history) => (event, applicationId) => {
  const value = applicationId ? applicationId : event?.target.value
  const name = applicationId ? 'applicationId' : event?.target.name

  if (!value || !name) return

  const queryParams = handleHistoryToQueryParams(history)
  const newParams = {
    ...queryParams,
    [name]: value,
  }
  const cleanedParams = Object.keys(newParams).reduce((prev: StringMap | undefined, next: string) => {
    if (newParams[next] && prev) {
      prev[next] = newParams[next]
    }
    return prev
  }, {})
  const newQueryString = new URLSearchParams(cleanedParams).toString()
  setWebhookQueryParams(newParams)
  history.push(`${history.location.pathname}?${newQueryString}`)
}

export const WebhooksWrapper: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = location
  const [webhookQueryParams, setWebhookQueryParams] = useState<WebhookQueryParams>(handleHistoryToQueryParams(history))
  const isAboutPage = pathname === Routes.WEBHOOKS_ABOUT
  const isManagePage = pathname === Routes.WEBHOOKS_MANAGE
  const isLogsPage = pathname === Routes.WEBHOOKS_LOGS
  const selectAppIdHandler = handleSelectAppId(setWebhookQueryParams, history)
  const { data: apps, totalCount } = useSelector(selectAppListState)

  useEffect(handleFetchApps(dispatch, apps, totalCount), [totalCount, apps])
  useEffect(handleFetchSubscriptions(dispatch, webhookQueryParams), [webhookQueryParams])

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
        {isAboutPage && (
          <>
            <Icon className={elMb5} icon="webhooksInfographic" iconSize="large" />
            <Subtitle>Webhooks Documentation</Subtitle>
            <BodyText hasGreyText>
              This system is designed to flexibly work with how your application is built and deployed. If you wish, you
              can set up a single endpoint to catch all topics for all customers. Alternatively, you may wish to set up
              a different webhook subscription per topic or per customer. For more information about Webhooks, please
              see our documentation.
            </BodyText>
            <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.webhooksDocs)}>
              View Docs
            </Button>
          </>
        )}
        {(isManagePage || isLogsPage) && (
          <>
            <div className={elMb8}>
              <Label>
                {isManagePage
                  ? 'Please select an App from the list below to view the associated Webhooks'
                  : 'Please select a Time slot and an App from the list below to view the associated Webhooks:'}
              </Label>
            </div>
            <div className={cx(elBorderRadius, overflowHidden)}>
              {isLogsPage && (
                <>
                  <ControlsContainer>
                    <InputGroup
                      className={inputFullWidth}
                      value={webhookQueryParams.from}
                      type="date"
                      name="from"
                      label="Date From"
                      onChange={selectAppIdHandler}
                    />
                  </ControlsContainer>
                  <ControlsContainer>
                    <InputGroup
                      className={inputFullWidth}
                      value={webhookQueryParams.to}
                      type="date"
                      name="to"
                      label="Date To"
                      onChange={selectAppIdHandler}
                    />
                  </ControlsContainer>
                </>
              )}
              <ControlsContainer>
                <InputGroup>
                  <Select
                    className={elWFull}
                    value={webhookQueryParams.applicationId ?? ''}
                    name="applicationId"
                    onChange={selectAppIdHandler}
                  >
                    <option key="default-option" value="">
                      None selected
                    </option>
                    {apps?.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.name}
                      </option>
                    ))}
                  </Select>
                  <Label>App Name</Label>
                </InputGroup>
              </ControlsContainer>
            </div>
          </>
        )}
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
        {getTabContent(pathname, webhookQueryParams, selectAppIdHandler)}
      </PageContainer>
    </FlexContainer>
  )
}

export default WebhooksWrapper

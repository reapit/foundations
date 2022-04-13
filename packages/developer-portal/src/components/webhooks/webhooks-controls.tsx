import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { elBorderRadius, elWFull, InputGroup, Label, Select } from '@reapit/elements'
import Routes from '../../constants/routes'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { cx } from '@linaria/core'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { StringMap } from '@reapit/utils-common'
import { useWebhooksState, WebhooksFilterState } from './state/use-webhooks-state'
import { History } from 'history'
import { useHistory } from 'react-router'

export type HandleSelectFilters = (
  setWebhookQueryParams: Dispatch<SetStateAction<WebhooksFilterState>>,
  history: History,
) => SelectAppIdEventHandler

export type SelectAppIdEventHandler = (
  event?: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | undefined,
  applicationId?: string | undefined,
) => void

export const handleHistoryToQueryParams = (history: History): WebhooksFilterState => {
  const queryParams = new URLSearchParams(history.location.search)
  return {
    applicationId: queryParams.get('applicationId') ?? '',
    from: queryParams.get('from') ?? dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    to: queryParams.get('to') ?? dayjs().format('YYYY-MM-DD'),
  }
}

export const handleSelectFilters: HandleSelectFilters =
  (setWebhookQueryParams, history) =>
  (event?: ChangeEvent<HTMLSelectElement | HTMLInputElement>, applicationId?: string) => {
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

export const WebhooksControls: FC = () => {
  const { webhooksFilterState, webhooksDataState, setWebhooksFilterState } = useWebhooksState()
  const history = useHistory()
  const { to, from, applicationId } = webhooksFilterState
  const { apps } = webhooksDataState
  const { pathname } = window.location
  const isManagePage = pathname === Routes.WEBHOOKS_MANAGE
  const isLogsPage = pathname === Routes.WEBHOOKS_LOGS

  return (
    <>
      {(isManagePage || isLogsPage) && (
        <>
          <div className={cx(elBorderRadius, overflowHidden)}>
            {isLogsPage && (
              <>
                <ControlsContainer>
                  <InputGroup
                    className={inputFullWidth}
                    value={from}
                    type="date"
                    name="from"
                    label="Date From"
                    min={dayjs(to).subtract(6, 'months').format('YYYY-MM')}
                    max={dayjs(to).format('YYYY-MM-DD')}
                    onChange={handleSelectFilters(setWebhooksFilterState, history)}
                  />
                </ControlsContainer>
                <ControlsContainer>
                  <InputGroup
                    className={inputFullWidth}
                    value={to}
                    type="date"
                    name="to"
                    label="Date To"
                    min={dayjs(from).format('YYYY-MM-DD')}
                    max={dayjs().format('YYYY-MM-DD')}
                    onChange={handleSelectFilters(setWebhooksFilterState, history)}
                  />
                </ControlsContainer>
              </>
            )}
            <ControlsContainer>
              <InputGroup>
                <Select
                  className={elWFull}
                  value={applicationId ?? ''}
                  name="applicationId"
                  onChange={handleSelectFilters(setWebhooksFilterState, history)}
                >
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {apps?.data?.map((app: AppSummaryModel) => (
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
    </>
  )
}

export default WebhooksControls

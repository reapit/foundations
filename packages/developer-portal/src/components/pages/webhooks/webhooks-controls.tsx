import React, { ChangeEvent, FC } from 'react'
import { elBorderRadius, elWFull, InputGroup, Label, Select } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { useSelector } from 'react-redux'
import { selectAppListState } from '../../../selector/apps/app-list'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { cx } from '@linaria/core'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { WebhookQueryParams } from './webhooks'

export interface WebhooksControlsProps {
  selectAppIdHandler: (event?: ChangeEvent<HTMLSelectElement | HTMLInputElement>, applicationId?: string) => void
  webhookQueryParams: WebhookQueryParams
}

export const WebhooksControls: FC<WebhooksControlsProps> = ({ selectAppIdHandler, webhookQueryParams }) => {
  const { pathname } = window.location
  const isManagePage = pathname === Routes.WEBHOOKS_MANAGE
  const isLogsPage = pathname === Routes.WEBHOOKS_LOGS
  const { data: apps } = useSelector(selectAppListState)

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
                  {apps?.map((app: AppSummaryModel) => (
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

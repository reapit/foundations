import { BodyText, ColSplit, Grid, Loader, PersistantNotification, Select } from '@reapit/elements'
import React, { FC, useEffect } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'
import { selectAppListState } from '../../../selector/apps/app-list'
import { fetchAppList } from '../../../actions/apps'
import { GET_ALL_PAGE_SIZE } from '../../../constants/paginator'
import { FetchAppListParams } from '../../../reducers/apps/app-list'

interface WebhooksNewAppProps {
  register: UseFormRegister<CreateWebhookParams>
}

export const handleFetchApps = (dispatch: ReduxDispatch) => () => {
  dispatch(fetchAppList({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE } as FetchAppListParams))
}

export const WebhooksNewApp: FC<WebhooksNewAppProps> = ({ register }) => {
  const dispatch = useDispatch()
  const { data: apps, isLoading } = useSelector(selectAppListState)

  useEffect(handleFetchApps(dispatch), [])
  console.log(apps)
  return (
    <Grid>
      <ColSplit>
        <BodyText hasGreyText>
          Webhooks subscriptions can be set up for any customer who has installed your application. Additionally, you
          can choose ‘SBOX’ to listen for sandbox environment notifications.
        </BodyText>
        {isLoading ? (
          <Loader label="Loading" />
        ) : apps && apps.length ? (
          // <InputGroup>
          <Select {...register('applicationId')}>
            <option key="default-option" value={undefined}>
              Please select an app
            </option>
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </Select>
        ) : (
          // </InputGroup>
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No apps found. This is probably because you have not yet created an app from the apps page. When you have
            created your first app, you will be able to add a webhook here.
          </PersistantNotification>
        )}
      </ColSplit>
    </Grid>
  )
}

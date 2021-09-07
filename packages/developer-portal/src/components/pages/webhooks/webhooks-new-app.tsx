import {
  BodyText,
  ColSplit,
  elMb11,
  Grid,
  InputAddOn,
  InputGroup,
  Loader,
  PersistantNotification,
  Select,
  Subtitle,
} from '@reapit/elements'
import React, { FC, useEffect } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { selectAppListState } from '../../../selector/apps/app-list'
import { fetchAppList } from '../../../actions/apps'
import { GET_ALL_PAGE_SIZE } from '../../../constants/paginator'
import { FetchAppListParams } from '../../../reducers/apps/app-list'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewAppProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  errors: DeepMap<CreateWebhookFormSchema, FieldError>
}

export const handleFetchApps = (dispatch: ReduxDispatch, apps?: AppSummaryModel[], totalCount?: number) => () => {
  if (apps?.length && totalCount === apps.length) return
  dispatch(fetchAppList({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE } as FetchAppListParams))
}

export const WebhooksNewApp: FC<WebhooksNewAppProps> = ({ register, errors }) => {
  const dispatch = useDispatch()
  const { data: apps, isLoading, totalCount } = useSelector(selectAppListState)

  useEffect(handleFetchApps(dispatch, apps, totalCount), [totalCount, apps])

  const errorMessage = errors?.applicationId?.message
  return (
    <Grid>
      <ColSplit>
        <div className={elMb11}>
          <BodyText hasGreyText hasNoMargin>
            Webhooks subscriptions can be set up for any customer who has installed your application. Additionally, you
            can choose ‘SBOX’ to listen for sandbox environment notifications.
          </BodyText>
        </div>
        {isLoading ? (
          <Loader label="Loading" />
        ) : apps && apps.length ? (
          <>
            <Subtitle>Plese select an app</Subtitle>
            <InputGroup>
              <Select {...register('applicationId')}>
                <option key="default-option" value="">
                  None selected
                </option>
                {apps.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </Select>
              {errorMessage && <InputAddOn intent="danger">{errorMessage}</InputAddOn>}
            </InputGroup>
          </>
        ) : (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No apps found. This is probably because you have not yet created an app from the apps page. When you have
            created your first app, you will be able to add a webhook here.
          </PersistantNotification>
        )}
      </ColSplit>
    </Grid>
  )
}

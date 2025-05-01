import React, { FC, useEffect } from 'react'
import { elMt5, FormLayout, InputWrap, Label, ToggleRadio } from '@reapit/elements'
import { useForm, UseFormWatch } from 'react-hook-form'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'

export interface ToggleConsumptionForm {
  fixedApiConsumptionCost?: 'FREE' | 'NOT_FREE'
}

export interface ToggleConsumptionProps {
  appIdConsumption: string
  apps: Marketplace.AppSummaryModelPagedResult | null
  appsRefresh: () => void
}

export const handleToggleConsumption =
  (updateApp: SendFunction<Marketplace.UpdateAppModel, boolean>) =>
  ({ fixedApiConsumptionCost }: ToggleConsumptionForm) => {
    const value = fixedApiConsumptionCost === 'FREE' ? 0 : undefined
    updateApp({ fixedApiConsumptionCost: value })
  }

export const handleRefreshApps = (appsRefresh: () => void, shouldRefresh?: boolean) => () => {
  if (shouldRefresh) {
    appsRefresh()
  }
}

export const handleWatchToggle =
  (updateApp: SendFunction<Marketplace.UpdateAppModel, boolean>, watch: UseFormWatch<ToggleConsumptionForm>) => () => {
    const subscription = watch(handleToggleConsumption(updateApp))
    return () => subscription.unsubscribe()
  }

export const ToggleConsumption: FC<ToggleConsumptionProps> = ({ appIdConsumption, apps, appsRefresh }) => {
  const { register, watch } = useForm<ToggleConsumptionForm>()
  const currentConsumptionPaid = apps?.data?.find((app) => app.id === appIdConsumption)?.fixedApiConsumptionCost !== 0

  const [, , updateApp, appUpdated] = useReapitUpdate<Marketplace.UpdateAppModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateApp],
    method: 'PUT',
    uriParams: {
      appId: appIdConsumption,
    },
  })

  useEffect(handleRefreshApps(appsRefresh, Boolean(appUpdated)), [appUpdated])
  useEffect(handleWatchToggle(updateApp, watch), [updateApp])

  return (
    <form>
      <FormLayout className={elMt5}>
        <InputWrap>
          <Label>API Consumption Charges</Label>
          <ToggleRadio
            {...register('fixedApiConsumptionCost')}
            hasGreyBg
            options={[
              {
                id: 'option-free-false',
                value: 'NOT_FREE',
                text: 'Pays for API consumption',
                isChecked: currentConsumptionPaid,
              },
              {
                id: 'option-free-true',
                value: 'FREE',
                text: 'API consumption free',
                isChecked: !currentConsumptionPaid,
              },
            ]}
          />
        </InputWrap>
      </FormLayout>
    </form>
  )
}

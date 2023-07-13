import React, { FC, useEffect } from 'react'
import { elMt5, FormLayout, InputWrap, Label, ToggleRadio } from '@reapit/elements'
import { useForm, UseFormWatch } from 'react-hook-form'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface ToggleConsumptionForm {
  isFeatured?: 'FEATURED' | 'NOT_FEATURED'
}

export interface ToggleConsumptionProps {
  appIdConsumption: string
  apps: AppSummaryModelPagedResult | null
  appsRefresh: () => void
}

export const handleToggleConsumption =
  (featureApp: SendFunction<void, boolean>, unFeatureApp: SendFunction<void, boolean>) =>
  ({ isFeatured }: ToggleConsumptionForm) => {
    const featured = isFeatured === 'FEATURED'
    const updateFeatured = featured ? featureApp : unFeatureApp

    updateFeatured()
  }

export const handleRefreshAppsFeatured = (appsRefresh: () => void, shouldRefresh?: boolean) => () => {
  if (shouldRefresh) {
    appsRefresh()
  }
}

export const handleWatchToggle =
  (
    featureApp: SendFunction<void, boolean>,
    unFeatureApp: SendFunction<void, boolean>,
    watch: UseFormWatch<ToggleConsumptionForm>,
  ) =>
  () => {
    const subscription = watch(handleToggleConsumption(featureApp, unFeatureApp))
    return () => subscription.unsubscribe()
  }

export const ToggleConsumption: FC<ToggleConsumptionProps> = ({ appIdConsumption, apps, appsRefresh }) => {
  const { register, watch } = useForm<ToggleConsumptionForm>()
  const currentConsumption = Boolean(apps?.data?.find((app) => app.id === appIdConsumption)?.)

  const [, , featureApp, appFeatured] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.featureApp],
    method: 'PUT',
    uriParams: {
      appId: appIdConsumption,
    },
  })

  const [, , unFeatureApp, appUnfeatured] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.unFeatureApp],
    method: 'DELETE',
    uriParams: {
      appId: appIdConsumption,
    },
  })

  useEffect(handleRefreshAppsFeatured(appsRefresh, appFeatured || appUnfeatured), [appFeatured, appUnfeatured])
  useEffect(handleWatchToggle(featureApp, unFeatureApp, watch), [featureApp, unFeatureApp])

  return (
    <form>
      <FormLayout className={elMt5}>
        <InputWrap>
          <Label>Is Featured In AppMarket</Label>
          <ToggleRadio
            {...register('isFeatured')}
            hasGreyBg
            options={[
              {
                id: 'option-featured-true',
                value: 'FEATURED',
                text: 'Featured',
                isChecked: Boolean(currentConsumption),
              },
              {
                id: 'option-featured-false',
                value: 'NOT_FEATURED',
                text: 'Not Featured',
                isChecked: !currentConsumption,
              },
            ]}
          />
        </InputWrap>
      </FormLayout>
    </form>
  )
}

import React, { FC, useEffect } from 'react'
import { elMt5, FormLayout, InputWrap, Label, ToggleRadio } from '@reapit/elements'
import { useForm, UseFormWatch } from 'react-hook-form'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'

export interface ToggleFeaturedForm {
  isFeatured?: 'FEATURED' | 'NOT_FEATURED'
}

export interface ToggleFeaturedProps {
  appIdFeatured: string
  apps: Marketplace.AppSummaryModelPagedResult | null
  appsRefresh: () => void
}

export const handleToggleFeatured =
  (featureApp: SendFunction<void, boolean>, unFeatureApp: SendFunction<void, boolean>) =>
  ({ isFeatured }: ToggleFeaturedForm) => {
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
    watch: UseFormWatch<ToggleFeaturedForm>,
  ) =>
  () => {
    const subscription = watch(handleToggleFeatured(featureApp, unFeatureApp))
    return () => subscription.unsubscribe()
  }

export const ToggleFeatured: FC<ToggleFeaturedProps> = ({ appIdFeatured, apps, appsRefresh }) => {
  const { register, watch } = useForm<ToggleFeaturedForm>()
  const currentAppFeatured = Boolean(apps?.data?.find((app) => app.id === appIdFeatured)?.isFeatured)

  const [, , featureApp, appFeatured] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.featureApp],
    method: 'PUT',
    uriParams: {
      appId: appIdFeatured,
    },
  })

  const [, , unFeatureApp, appUnfeatured] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.unFeatureApp],
    method: 'DELETE',
    uriParams: {
      appId: appIdFeatured,
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
                isChecked: Boolean(currentAppFeatured),
              },
              {
                id: 'option-featured-false',
                value: 'NOT_FEATURED',
                text: 'Not Featured',
                isChecked: !currentAppFeatured,
              },
            ]}
          />
        </InputWrap>
      </FormLayout>
    </form>
  )
}

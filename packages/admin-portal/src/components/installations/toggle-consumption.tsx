import React, { FC, useEffect } from 'react'
import { elMt5, FormLayout, InputGroup, InputWrap, Label, ToggleRadio } from '@reapit/elements'
import { useForm, UseFormWatch } from 'react-hook-form'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'

export interface ToggleConsumptionForm {
  fixedApiConsumptionCost?: 'FREE' | 'NOT_FREE'
}

export interface ToggleConsumptionProps {
  installIdConsumption: string
  installations: Marketplace.InstallationModelPagedResult | null
  installationsRefresh: () => void
}

export const handleToggleConsumption =
  (updateInstallation: SendFunction<Marketplace.UpdateInstallationModel, boolean>) =>
  ({ fixedApiConsumptionCost }: ToggleConsumptionForm) => {
    const value = fixedApiConsumptionCost === 'FREE' ? 0 : undefined
    updateInstallation({ fixedApiConsumptionCost: value })
  }

export const handleRefreshInstallations = (installationsRefresh: () => void, shouldRefresh?: boolean) => () => {
  if (shouldRefresh) {
    installationsRefresh()
  }
}

export const handleWatchToggle =
  (
    updateInstallation: SendFunction<Marketplace.UpdateInstallationModel, boolean>,
    watch: UseFormWatch<ToggleConsumptionForm>,
  ) =>
  () => {
    const subscription = watch(handleToggleConsumption(updateInstallation))
    return () => subscription.unsubscribe()
  }

export const ToggleConsumption: FC<ToggleConsumptionProps> = ({
  installIdConsumption,
  installations,
  installationsRefresh,
}) => {
  const { register, watch } = useForm<ToggleConsumptionForm>()
  const currentConsumptionPaid =
    installations?.data?.find((install) => install.id === installIdConsumption)?.fixedApiConsumptionCost !== 0

  const [, , updateInstallation, appUpdated] = useReapitUpdate<Marketplace.UpdateInstallationModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateInstallation],
    method: 'PUT',
    uriParams: {
      installationId: installIdConsumption,
    },
  })

  useEffect(handleRefreshInstallations(installationsRefresh, Boolean(appUpdated)), [appUpdated])
  useEffect(handleWatchToggle(updateInstallation, watch), [updateInstallation])

  return (
    <form>
      <FormLayout className={elMt5}>
        <InputWrap>
          <InputGroup>
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
          </InputGroup>
        </InputWrap>
      </FormLayout>
    </form>
  )
}

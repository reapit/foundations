import React, { FC } from 'react'
import {
  BodyText,
  FormLayout,
  InputWrapFull,
  MultiSelectInput,
  Subtitle,
  InputError,
  Loader,
  MultiSelectOption,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { useReapitGet } from '@reapit/utils-react'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useAppState } from '../state/use-app-state'

export const AcIntegrationTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { appEditState } = useAppState()
  const { appEditForm } = appEditState
  const [desktopIntegrationTypes, desktopIntegrationTypesLoading] =
    useReapitGet<DesktopIntegrationTypeModelPagedResult>({
      reapitConnectBrowserSession,
      action: getActions(window.reapit.config.appEnv)[GetActionNames.getDesktopIntegrationTypes],
    })

  const { desktopIntegrationTypeIds } = formFields
  const { name } = desktopIntegrationTypeIds

  return (
    <>
      <Subtitle>AgencyCloud Integration</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      {desktopIntegrationTypesLoading && <Loader />}
      <FormLayout hasMargin>
        {desktopIntegrationTypes && (
          <InputWrapFull>
            <MultiSelectInput
              id={name}
              {...desktopIntegrationTypeIds}
              {...register('desktopIntegrationTypeIds')}
              options={
                desktopIntegrationTypes?.data?.map(({ name, id }) => ({
                  name,
                  value: id,
                })) as MultiSelectOption[]
              }
              defaultValues={appEditForm.desktopIntegrationTypeIds.split(',').filter(Boolean)}
            />
            {errors.desktopIntegrationTypeIds?.message && (
              <InputError message={errors.desktopIntegrationTypeIds?.message} />
            )}
          </InputWrapFull>
        )}
      </FormLayout>
    </>
  )
}

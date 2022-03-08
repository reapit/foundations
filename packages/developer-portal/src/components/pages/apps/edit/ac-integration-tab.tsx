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
import { ExternalPages, openNewPage } from '../../../../utils/navigation'

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
      <BodyText hasGreyText>
        When your application is integrated with AgencyCloud you can either launch it from the dedicated Apps menu in
        the AgencyCloud software, or from a series of menus embedded within other pages. Your app can receive contextual
        entity ids as global variables so it can launch with relevant data for your users. For more on our desktop API{' '}
        <a onClick={openNewPage(ExternalPages.desktopDocs)}>see here.</a>
      </BodyText>
      <BodyText hasGreyText hasSectionMargin>
        The below list maps to the various menus from which you can launch your app or replace an AgencyCloud Screen.
        You should select the ones that are relevant to your app only.
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
                desktopIntegrationTypes.data?.map(({ name, id }) => ({
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

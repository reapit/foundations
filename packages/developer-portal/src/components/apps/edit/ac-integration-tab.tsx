import React, { FC } from 'react'
import {
  BodyText,
  FormLayout,
  InputWrapFull,
  MultiSelectInput,
  InputError,
  Loader,
  MultiSelectOption,
  ElToggleItem,
  InputGroup,
  InputWrap,
  Label,
  Toggle,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { useReapitGet } from '@reapit/utils-react'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useAppState } from '../state/use-app-state'
import { ExternalPages, openNewPage } from '../../../utils/navigation'
import { useWatch } from 'react-hook-form'

export const AcIntegrationTab: FC<AppEditTabsProps> = ({ register, errors, control }) => {
  const { appEditState } = useAppState()
  const { appEditForm } = appEditState
  const isAgencyCloudIntegratedValue = useWatch({
    control,
    name: 'isAgencyCloudIntegrated',
  })
  const [desktopIntegrationTypes, desktopIntegrationTypesLoading] =
    useReapitGet<DesktopIntegrationTypeModelPagedResult>({
      reapitConnectBrowserSession,
      action: getActions(process.env.appEnv)[GetActionNames.getDesktopIntegrationTypes],
      fetchWhenTrue: [isAgencyCloudIntegratedValue],
    })

  const { desktopIntegrationTypeIds, isAgencyCloudIntegrated } = formFields
  const { name } = desktopIntegrationTypeIds

  const filteredDesktopIntegrationTypes = desktopIntegrationTypes?.data?.filter(
    (type) => !type.name?.includes('Payment'),
  )

  return (
    <>
      <BodyText hasGreyText>
        When your application is integrated with AgencyCloud you can either launch it from the dedicated Apps menu in
        the AgencyCloud software, or from a series of menus embedded within other pages. Your app can receive contextual
        entity ids as global variables so it can launch with relevant data for your users. For more on our desktop API{' '}
        <a onClick={openNewPage(ExternalPages.desktopDocs)}>see here.</a>
      </BodyText>
      <BodyText hasGreyText>
        You should toggle &lsquo;AgencyCloud Integration&rsquo; only if you are intending your app to be launched from
        within AgencyCloud
      </BodyText>
      <BodyText hasGreyText>
        The below list maps to the various menus from which you can launch your app or replace an AgencyCloud Screen.
        You should select the ones that are relevant to your app only.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup>
            <Label>{isAgencyCloudIntegrated.label}</Label>
            <Toggle id="app-edit-is-ac-inegrated" {...register('isAgencyCloudIntegrated')} hasGreyBg>
              <ElToggleItem>Yes</ElToggleItem>
              <ElToggleItem>No</ElToggleItem>
            </Toggle>
          </InputGroup>
        </InputWrap>
        {desktopIntegrationTypesLoading && (
          <InputWrapFull>
            <Loader />
          </InputWrapFull>
        )}
        {desktopIntegrationTypes && (
          <InputWrapFull>
            <MultiSelectInput
              id={name}
              {...desktopIntegrationTypeIds}
              {...register('desktopIntegrationTypeIds')}
              options={
                filteredDesktopIntegrationTypes?.map(({ name, id }) => ({
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

import React, { FC } from 'react'
import { BodyText, FormLayout, InputWrapFull, MultiSelectInput, Subtitle, InputError, Loader } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { useReapitGet } from '@reapit/utils-react'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'

export const AcIntegrationTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const [desktopIntegrationTypes, desktopIntegrationTypesLoading] = useReapitGet<DesktopIntegrationTypeModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDesktopIntegrationTypes],
  })

  const { desktopIntegrationTypeIds } = formFields
  const { name } = desktopIntegrationTypeIds
  console.log(desktopIntegrationTypes)
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
        <InputWrapFull>
          <MultiSelectInput
            id={name}
            {...register('desktopIntegrationTypeIds')}
            options={[
              {
                name: 'Item one',
                value: 'item-one',
              },
              {
                name: 'Item two',
                value: 'item-two',
              },
              {
                name: 'Item three',
                value: 'item-three',
              },
            ]}
            defaultValues={['item-one']}
          />
          {errors.desktopIntegrationTypeIds?.message && (
            <InputError message={errors.desktopIntegrationTypeIds?.message} />
          )}
        </InputWrapFull>
      </FormLayout>
    </>
  )
}

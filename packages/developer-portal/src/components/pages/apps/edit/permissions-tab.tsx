import React, { FC } from 'react'
import {
  BodyText,
  FormLayout,
  InputError,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
  Subtitle,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { ProductModelPagedResult, ScopeModel } from '@reapit/foundations-ts-definitions'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useAppState } from '../state/use-app-state'
import { formFields } from './form-schema/form-fields'

export const PermissionsTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { appEditState } = useAppState()
  const { appEditForm } = appEditState

  const [scopesList, scopesListLoading] = useReapitGet<ScopeModel[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppPermissions],
  })

  const [productsList, productListLoading] = useReapitGet<ProductModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getProducts],
  })

  const { scopes, products } = formFields

  return (
    <>
      <Subtitle>Permissions</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      {scopesListLoading && <Loader />}
      <FormLayout hasMargin>
        {scopesList && (
          <InputWrapFull>
            <MultiSelectInput
              id="app-edit-scopes-select"
              {...scopes}
              {...register('scopes')}
              options={
                scopesList?.map(({ name, description }) => ({
                  name: description,
                  value: name,
                })) as MultiSelectOption[]
              }
              defaultValues={appEditForm.scopes.split(',').filter(Boolean)}
            />
            {errors.scopes?.message && <InputError message={errors.scopes?.message} />}
          </InputWrapFull>
        )}
      </FormLayout>
      <Subtitle>Reapit Products</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        This section refers to products that are available within the Reapit Group of Companies. For UK based
        developers, this will typically default to Agency Cloud however, as we launch the Reapit AppMarket in other
        countries and with different products, you may wish for your application to list in these alternative
        AppMarkets. You can select more than one option but at least one option must be selected.
      </BodyText>
      {productListLoading && <Loader />}
      <FormLayout hasMargin>
        {productsList?.data && (
          <InputWrapFull>
            <MultiSelectInput
              id="app-edit-products-select"
              {...products}
              {...register('products')}
              options={productsList?.data?.map((product) => ({
                value: product.id ?? '',
                name: product.name ?? '',
              }))}
              defaultValues={appEditForm.products.split(',').filter(Boolean)}
            />
            {errors.products?.message && <InputError message={errors.products?.message} />}
          </InputWrapFull>
        )}
      </FormLayout>
    </>
  )
}

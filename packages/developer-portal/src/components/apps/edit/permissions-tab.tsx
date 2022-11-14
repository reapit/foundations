import React, { FC } from 'react'
import {
  BodyText,
  ElToggleItem,
  FormLayout,
  InputError,
  InputGroup,
  InputWrap,
  InputWrapFull,
  InputWrapMed,
  Label,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
  Toggle,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { ProductModelPagedResult, ScopeModel } from '@reapit/foundations-ts-definitions'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useAppState } from '../state/use-app-state'
import { formFields } from './form-schema/form-fields'
import { Link } from 'react-router-dom'
import Routes from '../../../constants/routes'
import { useWatch } from 'react-hook-form'
import { ExternalPages, openNewPage } from '../../../utils/navigation'

export const PermissionsTab: FC<AppEditTabsProps> = ({ register, errors, control }) => {
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

  const isPrivateAppValue = useWatch({
    control,
    name: 'isPrivateApp',
  })

  const { scopes, products, isPrivateApp, limitToClientIds } = formFields

  const filteredScopes = scopesList?.filter((scope) => !scope.name?.includes('payment'))

  return (
    <>
      <BodyText hasGreyText>
        Permissions are registered as scopes against the access token you receive back from one of our Authentication
        Flows. They map 1:1 and on a read/write basis to endpoints in our Platform REST API. As such, it is worth
        looking at the{' '}
        <Link to={Routes.SWAGGER} target="_blank" rel="noopener noreferrer">
          API explorer here{' '}
        </Link>
        before proceeding, to investigate which permissions you think you will need.
      </BodyText>
      {scopesListLoading && <Loader />}
      <FormLayout hasMargin>
        {filteredScopes && (
          <InputWrapFull>
            <Label>{scopes.label}</Label>
            <MultiSelectInput
              id="app-edit-scopes-select"
              {...scopes}
              {...register('scopes')}
              options={
                filteredScopes.map(({ name, description }) => ({
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
      <BodyText hasGreyText>
        This section refers to products that are available within the Reapit Group of Companies. For UK based
        developers, this will typically default to Agency Cloud however, as we launch the Reapit AppMarket in other
        countries and with different products, you may wish for your application to list in these alternative
        AppMarkets. You can select more than one option but at least one option must be selected.
      </BodyText>
      {productListLoading && <Loader />}
      <FormLayout hasMargin>
        {productsList?.data && (
          <InputWrapFull>
            <Label>{products.label}</Label>
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
      <BodyText hasGreyText>
        You should toggle &lsquo;Private App&rsquo; if you only want your app to be private to a select group of
        customers (max of 3). Simply enter their &lsquo;Customer ID&rsquo; as a comma separated list. For more
        information on how to find the Customer ID,{' '}
        <a onClick={openNewPage(ExternalPages.customerIdFindDocs)}> please see here.</a>
      </BodyText>
      {productListLoading && <Loader />}
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup>
            <Label>{isPrivateApp.label}</Label>
            <Toggle id="app-edit-is-private-app" {...register('isPrivateApp')} hasGreyBg>
              <ElToggleItem>Yes</ElToggleItem>
              <ElToggleItem>No</ElToggleItem>
            </Toggle>
          </InputGroup>
        </InputWrap>
        <InputWrapMed>
          <InputGroup
            {...limitToClientIds}
            {...register('limitToClientIds')}
            disabled={!isPrivateAppValue}
            errorMessage={errors?.limitToClientIds?.message}
            icon={errors?.limitToClientIds?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrapMed>
      </FormLayout>
    </>
  )
}

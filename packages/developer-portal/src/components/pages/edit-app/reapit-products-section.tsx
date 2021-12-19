import React, { FC } from 'react'
import { FormSection, Grid, GridItem, FormSubHeading, FormHeading, Field, FieldProps } from '@reapit/elements-legacy'
import { formFields } from './form-schema/form-fields'
import { MultiSelectInput, MultiSelectOption } from '@reapit/elements'
import { AppDetailModel, ProductModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

const { products } = formFields

export interface ReapitProductsSectionProps {
  app: AppDetailModel
}

export const ReapitProductsSection: FC<ReapitProductsSectionProps> = ({ app }) => {
  const [productsList] = useReapitGet<ProductModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getProducts],
  })

  const options = productsList
    ? (productsList?.data
        ?.map((product) => ({
          value: product.id ?? '',
          name: product.name ?? '',
        }))
        .filter(Boolean) as MultiSelectOption[])
    : []

  return (
    <FormSection>
      <FormHeading>Reapit Products</FormHeading>
      <FormSubHeading>
        This section refers to products that are available within the Reapit Group of Companies. For UK based
        developers, this will typically default to Agency Cloud however, as we launch the Reapit AppMarket in other
        countries and with different products, you may wish for your application to list in these alternative
        AppMarkets. You can select more than one option but at least one option must be selected.
      </FormSubHeading>
      <Grid>
        <GridItem>
          <Field type="input" name={products.name}>
            {({ field }: FieldProps<string | string[]>) => {
              return (
                <MultiSelectInput
                  id="react-example"
                  noneSelectedLabel="Select at least one product fom below"
                  options={options}
                  defaultValues={app.products ?? []}
                  {...field}
                />
              )
            }}
          </Field>
        </GridItem>
      </Grid>
    </FormSection>
  )
}

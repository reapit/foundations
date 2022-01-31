import {
  BodyText,
  MultiSelectInput,
  Loader,
  MultiSelectOption,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Label,
  elFadeIn,
  InputWrapMed,
} from '@reapit/elements'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCustomers, selectLoading } from '../../../selector/webhooks-subscriptions'
import { DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewCustomersProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  getValues: UseFormGetValues<CreateWebhookFormSchema>
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>
}

export const SANDBOX_CLIENT = {
  name: 'Sandbox Estates',
  value: 'SBOX',
}

export const ALL_CLIENTS = {
  name: 'All Customers',
  value: 'ALL',
}

export const handleCustomersToOptions = (installations: InstallationModel[]) => () => {
  const customers = installations
    .map(({ customerName, customerId, status }) => {
      if (status === 'Active') {
        return {
          name: customerName ?? '',
          value: customerId ?? '',
        }
      }
    })
    .filter(Boolean)

  const jsonCustomers = [
    JSON.stringify(ALL_CLIENTS),
    JSON.stringify(SANDBOX_CLIENT),
    ...customers.map((customer) => JSON.stringify(customer)),
  ]
  const uniqueCustomers: MultiSelectOption[] = [...new Set(jsonCustomers)].map((customer) => JSON.parse(customer))

  return uniqueCustomers
}

export const WebhooksNewCustomers: FC<WebhooksNewCustomersProps> = ({ register, getValues, errors }) => {
  const customers = useSelector(selectCustomers)
  const isLoading = useSelector(selectLoading)
  const customerOptions = useMemo(handleCustomersToOptions(customers), [customers])
  const selectedCustomers = getValues().customerIds?.split(',').filter(Boolean) ?? [SANDBOX_CLIENT.value]

  return (
    <FormLayout className={elFadeIn}>
      <InputWrapFull>
        <BodyText hasNoMargin hasGreyText>
          Select customers from the list below by default we have prepopulated this with &lsquo;Sandbox Estates
          (SBOX)&rsquo;. If you select one customer, you will need to specify each customer individually. If you select
          &lsquo;All Customers&rsquo;, the sandbox environment will be excluded and you will need to create a separate
          webhook for &lsquo;Sandbox Estates (SBOX)&rsquo;.
        </BodyText>
      </InputWrapFull>
      <InputWrapMed>
        {isLoading ? (
          <Loader label="Loading" />
        ) : (
          <InputGroup>
            <MultiSelectInput
              id="customer-ids"
              noneSelectedLabel={errors.customerIds ? errors.customerIds.message : 'Please select from the list below'}
              options={customerOptions}
              defaultValues={selectedCustomers}
              {...register('customerIds')}
            />
            <Label>Subscription Customers</Label>
          </InputGroup>
        )}
      </InputWrapMed>
    </FormLayout>
  )
}

import { Grid, elMb11, BodyText, Subtitle, ColSplit, MultiSelectInput, Loader, elMb7 } from '@reapit/elements'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCustomers, selectLoading } from '../../../selector/webhooks-subscriptions'
import { UseFormRegister } from 'react-hook-form'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksNewCustomersProps {
  register: UseFormRegister<CreateWebhookFormSchema>
}

export const SANDBOX_CLIENT = {
  name: 'Sandbox Estates',
  value: 'SBOX',
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

  const jsonCustomers = [JSON.stringify(SANDBOX_CLIENT), ...customers.map((customer) => JSON.stringify(customer))]
  const uniqueCustomers = [...new Set(jsonCustomers)].map((customer) => JSON.parse(customer))

  return uniqueCustomers
}

export const WebhooksNewCustomers: FC<WebhooksNewCustomersProps> = ({ register }) => {
  const customers = useSelector(selectCustomers)
  const isLoading = useSelector(selectLoading)
  const customerOptions = useMemo(handleCustomersToOptions(customers), [customers])

  return (
    <Grid>
      <ColSplit>
        <div className={elMb11}>
          <BodyText hasNoMargin hasGreyText>
            Select customers from the list below. If you leave this option blank, your webhook will default to
            &rdquo;All Customers&ldquo; that have installed your application including Sandbox (SBOX). If you select one
            customer, you will need to specify each customer individually. In this case, you will also need to specify
            SBOX explicity.
          </BodyText>
        </div>
        <Subtitle>Subscription Customers</Subtitle>
        {isLoading ? (
          <Loader label="Loading" />
        ) : (
          <MultiSelectInput
            className={elMb7}
            id="customer-ids"
            hasGreyChips
            options={customerOptions}
            {...register('customerIds')}
          />
        )}
      </ColSplit>
    </Grid>
  )
}

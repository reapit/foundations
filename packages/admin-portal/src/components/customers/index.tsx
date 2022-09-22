import React, { FC, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import { combineAddress, GetActionNames, getActions } from '@reapit/utils-common'
import { CustomerModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  elMb11,
  FormLayout,
  InputGroup,
  InputWrap,
  Loader,
  PageContainer,
  Pagination,
  Table,
  Title,
} from '@reapit/elements'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useForm } from 'react-hook-form'

export type CustomerFilterValues = {
  name?: string
  agencyCloudId?: string
}

export const Customers: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [customerFilters, setCustomerFilters] = useState<CustomerFilterValues>({})
  const { name, agencyCloudId } = customerFilters
  const { register, handleSubmit } = useForm<CustomerFilterValues>({
    mode: 'onChange',
  })

  const queryParams = objectToQuery(customerFilters)

  const [customers, customersLoading] = useReapitGet<CustomerModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getCustomers],
    queryParams: {
      ...queryParams,
      pageSize: 12,
      pageNumber,
    },
    fetchWhenTrue: [name || agencyCloudId],
  })

  return (
    <ErrorBoundary>
      <PageContainer>
        <Title>Customers</Title>
        <form onChange={handleSubmit(setCustomerFilters)}>
          <FormLayout className={elMb11}>
            <InputWrap>
              <InputGroup {...register('name')} label="Customer Name" type="search" />
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('agencyCloudId')} label="Customer Code" type="search" />
            </InputWrap>
          </FormLayout>
        </form>
        {customersLoading ? (
          <Loader />
        ) : (
          <>
            <Table
              className={elMb11}
              rows={customers?.data?.map(({ name, address, agencyCloudId, billingReference, id }) => ({
                cells: [
                  {
                    label: 'Customer Name',
                    value: name,
                    icon: 'flatInfographic',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Agency Cloud Id',
                    value: agencyCloudId,
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Customer Id',
                    value: id,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Customer Billing Reference',
                    value: billingReference ? billingReference : '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Customer Address',
                    value: combineAddress(address),
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
              }))}
            />
            <Pagination
              callback={setPageNumber}
              currentPage={pageNumber}
              numberPages={Math.ceil((customers?.totalCount ?? 1) / 12)}
            />
          </>
        )}
      </PageContainer>
    </ErrorBoundary>
  )
}

export default Customers

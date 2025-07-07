import React, { Dispatch, FC, useState, SetStateAction } from 'react'
import ErrorBoundary from '../error-boundary'
import { combineAddress } from '@reapit/utils-common'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import {
  Button,
  ButtonGroup,
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
import { objectToQuery, useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useForm } from 'react-hook-form'
import debounce from 'just-debounce-it'
import { OrgGroupsTable } from './org-groups-table'

export type CustomerFilterValues = {
  name?: string
  agencyCloudId?: string
}

export const handleFetchGroups = (setOrgId: Dispatch<SetStateAction<string | null>>, orgId?: string) => () => {
  if (orgId) {
    setOrgId(orgId)
  }
}

export const Customers: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [customerFilters, setCustomerFilters] = useState<CustomerFilterValues>({})
  const [orgId, setOrgId] = useState<string | null>(null)
  const { name, agencyCloudId } = customerFilters
  const { register, handleSubmit } = useForm<CustomerFilterValues>({
    mode: 'onChange',
  })

  const queryParams = objectToQuery(customerFilters)

  const [customers, customersLoading] = useReapitGet<Marketplace.CustomerModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getCustomers],
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
        <form onChange={handleSubmit(debounce(setCustomerFilters, 500))}>
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
                    icon: 'property',
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
                expandableContent: {
                  content: (
                    <>
                      <ButtonGroup alignment="center">
                        <Button intent="primary" onClick={handleFetchGroups(setOrgId, id)}>
                          Fetch Office Groups
                        </Button>
                      </ButtonGroup>
                      {orgId && orgId === id && <OrgGroupsTable orgId={orgId} />}
                    </>
                  ),
                },
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

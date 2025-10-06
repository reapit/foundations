import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Icon,
  Loader,
  Table,
  Pagination,
  PersistentNotification,
  FormLayout,
  InputGroup,
  InputWrap,
  elFadeIn,
  elMb11,
  BodyText,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrganisationModel, OrganisationModelPagedResult } from '@reapit/foundations-ts-definitions'
import ErrorBoundary from '../error-boundary'
import { useForm, UseFormWatch } from 'react-hook-form'
import { cx } from '@linaria/core'
import { GetActionNames, getActions, objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import debounce from 'just-debounce-it'
import dayjs from 'dayjs'
import { combineAddress } from '@reapit/utils-common'
import { OrgContent } from './org-content'

export interface UserFilters {
  name?: string
  agencyCloudId?: string
}

export const handleSetAdminFilters =
  (setUserSearch: Dispatch<SetStateAction<UserFilters>>, watch: UseFormWatch<UserFilters>) => () => {
    const subscription = watch(debounce(setUserSearch, 200))
    return () => subscription.unsubscribe()
  }

export const OrgsPage: FC = () => {
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { register, watch } = useForm<UserFilters>({ mode: 'all' })
  const queryParams = objectToQuery(userSearch)

  const [orgs, orgsLoading, , refreshOrgs] = useReapitGet<OrganisationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getOrgs],
    queryParams: { pageSize: 12, pageNumber, ...queryParams },
  })

  useEffect(handleSetAdminFilters(setUserSearch, watch), [])

  return (
    <ErrorBoundary>
      <form>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup {...register('name')} placeholder="Search by org name" label="Org Name" />
          </InputWrap>
          <InputWrap>
            <InputGroup {...register('agencyCloudId')} placeholder="Search Client Code" label="Client Code" />
          </InputWrap>
        </FormLayout>
      </form>
      {orgsLoading ? (
        <Loader />
      ) : orgs?._embedded?.length ? (
        <>
          <BodyText>Total Organisations: {orgs?.totalCount}</BodyText>
          <Table
            className={cx(elFadeIn, elMb11)}
            rows={orgs?._embedded?.map((org) => {
              const { agencyCloudId, name, address, created, inactive } = org
              return {
                cells: [
                  {
                    label: 'Org Name',
                    value: name ?? '-',
                    icon: 'contact',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Org Type(s)',
                    value: (org as OrganisationModel & { types?: string[] })?.types
                      ?.filter((type) => type !== 'organisation')
                      .join(', '),
                  },
                  {
                    label: 'Client Code',
                    value: agencyCloudId ?? '-',
                    icon: 'email',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Date Created',
                    value: created ? dayjs(created).format('DD-MM-YYYY') : '-',
                    icon: 'calendar',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Address',
                    value: combineAddress(address),
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Active',
                    value: <Icon icon={inactive ? 'close' : 'check'} intent={inactive ? 'danger' : 'success'} />,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                expandableContent: {
                  content: <OrgContent org={org} refreshOrgs={refreshOrgs} />,
                },
              }
            })}
          />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((orgs?.totalCount ?? 1) / 12)}
          />
        </>
      ) : (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No organisations found based on your current search.
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}

export default OrgsPage

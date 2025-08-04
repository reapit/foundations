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
  Label,
  ToggleRadio,
  Select,
  BodyText,
  Button,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GroupModelPagedResult, UserModel, UserModelPagedResult } from '@reapit/foundations-ts-definitions'
import ErrorBoundary from '../error-boundary'
import { useForm, UseFormWatch } from 'react-hook-form'
import { cx } from '@linaria/core'
import { GetActionNames, getActions, objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import debounce from 'just-debounce-it'
import dayjs from 'dayjs'
import { UserContent } from './user-content'
import { useReapitConnect } from '@reapit/connect-session'
import { getPlatformApiUrl } from '@reapit/use-reapit-data/src/api-regions'

export interface UserFilters {
  email?: string
  name?: string
  organisationName?: string
  agencyCloudId?: string
  active?: string
  groupId?: string
  mfaEnabled?: string
  firstLoginDateFrom?: string
  firstLoginDateTo?: string
}

export const handleSetAdminFilters =
  (setUserSearch: Dispatch<SetStateAction<UserFilters>>, watch: UseFormWatch<UserFilters>) => () => {
    const subscription = watch(debounce(setUserSearch, 200))
    return () => subscription.unsubscribe()
  }

export const downloadCSV = async ({
  setDownloadGenerating,
  filters,
  token,
}: {
  setDownloadGenerating: Dispatch<SetStateAction<boolean>>
  filters: UserFilters
  token: string
}) => {
  const data: UserModel[] = []
  let page = 1
  let totalPageCount = 2

  const getPage = async (page: number): Promise<{ items: UserModel[]; page: number; totalPageCount: number }> => {
    const query = new URLSearchParams({
      ...filters,
      pageSize: '100',
      pageNumber: page.toString(),
    })
    const result = await fetch(`${getPlatformApiUrl()}/organisations/users?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'api-version': 'latest',
      },
    })

    const body = await result.json()

    const items = body._embedded
    const totalPageCount = body.totalPageCount

    return {
      page: page + 1,
      items,
      totalPageCount,
    }
  }
  setDownloadGenerating(true)

  do {
    const { items, page: newPage, totalPageCount: newTotalPageCount } = await getPage(page)
    items.forEach((item) => data.push(item))

    totalPageCount = newTotalPageCount
    page = newPage
  } while (page <= totalPageCount)

  setDownloadGenerating(false)

  const dataForDownload = data.map((row) => [
    row.name,
    row.email,
    row.jobTitle ?? '',
    row.inactive ? 'Inactive' : 'Active',
    row.mfaEnabled ? 'Enabled' : 'Not Configured',
    row.organisationName ?? '',
    row.organisationId ?? '',
    row.created,
    row.firstLoginDate,
    row.consentToTrack ? 'Yes' : 'No',
    row.userGroups?.map((group) => group.groupId),
  ])

  dataForDownload.unshift([
    'Name',
    'Email',
    'JobTitle',
    'Status',
    'MFA Status',
    'Organisation Name',
    'Organisation Id',
    'Created',
    'First Login Date',
    'Consent to Track',
    'User Roles',
  ])

  console.log(dataForDownload)

  const csv = dataForDownload
    .map((row) =>
      row
        .map(String)
        .map((value) => value.replaceAll('"', '""'))
        .map((value) => `"${value}"`)
        .join(','),
    )
    .join('\r\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const button = document.createElement('a')
  button.href = url
  button.setAttribute('download', 'users.csv')
  button.click()
}

export const UsersPage: FC = () => {
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true)
  const [downloadGenerating, setDownloadGenerating] = useState<boolean>(false)
  const { register, watch } = useForm<UserFilters>({ mode: 'all' })
  const emailQuery = {
    email: userSearch.email ? encodeURIComponent(userSearch.email) : undefined,
  }
  const queryParams = objectToQuery({
    ...userSearch,
    ...emailQuery,
  })
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [users, usersLoading, , refreshUsers] = useReapitGet<UserModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUsers],
    queryParams: { pageSize: 12, pageNumber, ...queryParams },
    fetchWhenTrue: [],
  })

  const [userGroups] = useReapitGet<GroupModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserGroups],
    queryParams: { pageSize: 100 },
    fetchWhenTrue: [],
  })

  useEffect(handleSetAdminFilters(setUserSearch, watch), [])
  useEffect(() => {
    setDownloadDisabled(!Object.values(userSearch).some((value) => value !== ''))
  }, [userSearch])

  return (
    <ErrorBoundary>
      <form>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup
              {...register('organisationName')}
              type="search"
              icon="search"
              placeholder="Search by organisation name"
              label="Org Name"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('email')}
              type="search"
              icon="search"
              placeholder="Search by email"
              label="User Email"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('name')}
              type="search"
              icon="search"
              placeholder="Search by user name"
              label="User Name"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Select {...register('groupId')}>
                <option key="default-option" value={''}>
                  Please Select
                </option>
                {userGroups?._embedded?.map(({ id }) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </Select>
              <Label htmlFor="myId">Select User Group</Label>
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('agencyCloudId')}
              type="search"
              icon="search"
              placeholder="Search by Negotiator ID"
              label="Negotiator ID"
            />
          </InputWrap>
          <InputWrap>
            <Label>User Active</Label>
            <ToggleRadio
              hasGreyBg
              {...register('active')}
              options={[
                {
                  id: 'usr-active-all',
                  value: '',
                  text: 'All',
                  isChecked: true,
                },
                {
                  id: 'usr-active-true',
                  value: 'true',
                  text: 'Active',
                  isChecked: false,
                },
                {
                  id: 'usr-active-false',
                  value: 'false',
                  text: 'Inactive',
                  isChecked: false,
                },
              ]}
            />
          </InputWrap>
          <InputWrap>
            <Label>MFA Enabled</Label>
            <ToggleRadio
              {...register('mfaEnabled')}
              hasGreyBg
              options={[
                {
                  id: 'mfa-enabled-all',
                  value: '',
                  text: 'All',
                  isChecked: true,
                },
                {
                  id: 'mfa-enabled-true',
                  value: 'true',
                  text: 'Enabled',
                  isChecked: false,
                },
                {
                  id: 'mfa-enabled-false',
                  value: 'false',
                  text: 'Not Configured',
                  isChecked: false,
                },
              ]}
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('firstLoginDateFrom')}
              type="date"
              icon="calendar"
              placeholder="First Login Date From"
              label="First Login Date From"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('firstLoginDateTo')}
              type="date"
              icon="calendar"
              placeholder="First Login Date To"
              label="First Login Date To"
            />
          </InputWrap>
          
        </FormLayout>
      </form>
      {usersLoading ? (
        <Loader />
      ) : users?._embedded?.length ? (
        <>
          <BodyText>Total Users: {users?.totalCount}</BodyText>
          <Table
            className={cx(elFadeIn, elMb11)}
            rows={users?._embedded?.map((user) => {
              const {
                name,
                email,
                created,
                jobTitle,
                inactive,
                organisationName,
                organisationId,
                agencyCloudNegotiatorId,
                firstLoginDate,
              } = user
              return {
                cells: [
                  {
                    label: 'Name',
                    value: name ?? '-',
                    icon: 'contact',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Email',
                    value: email ?? '-',
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
                    label: 'First Login Date',
                    value: firstLoginDate ? dayjs(firstLoginDate).format('DD-MM-YYYY') : '-',
                  },
                  {
                    label: 'Job Title',
                    value: jobTitle ?? '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Organisation',
                    value: organisationName ?? '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Customer Id',
                    value: organisationId ?? '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Neg Id',
                    value: agencyCloudNegotiatorId ?? '-',
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
                  content: <UserContent user={user} refreshUsers={refreshUsers} userGroups={userGroups} />,
                },
              }
            })}
          />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((users?.totalCount ?? 1) / 12)}
          />
          <InputWrap>
            <Button
              onClick={() =>
                downloadCSV({
                  setDownloadGenerating,
                  token: connectSession?.accessToken as string,
                  filters: queryParams,
                })
              }
              disabled={downloadDisabled || downloadGenerating}
              intent="primary"
              loading={downloadGenerating}
            >
              {downloadGenerating ? 'Generating' : 'Download'}
            </Button>
          </InputWrap>
        </>
      ) : (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No users found based on your current search.
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}

export default UsersPage

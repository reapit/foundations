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
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GroupModelPagedResult, UserModelPagedResult } from '@reapit/foundations-ts-definitions'
import ErrorBoundary from '../error-boundary'
import { useForm, UseFormWatch } from 'react-hook-form'
import { cx } from '@linaria/core'
import { GetActionNames, getActions, objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import debounce from 'just-debounce-it'
import dayjs from 'dayjs'
import { UserContent } from './user-content'

export interface UserFilters {
  email?: string
  name?: string
  organisationName?: string
  active?: string
  groupId?: string
  mfaEnabled?: string
}

export const handleSetAdminFilters =
  (setUserSearch: Dispatch<SetStateAction<UserFilters>>, watch: UseFormWatch<UserFilters>) => () => {
    const subscription = watch(debounce(setUserSearch, 200))
    return () => subscription.unsubscribe()
  }

export const UsersPage: FC = () => {
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { register, watch } = useForm<UserFilters>({ mode: 'all' })
  const emailQuery = {
    email: userSearch.email ? encodeURIComponent(userSearch.email) : undefined,
  }
  const queryParams = objectToQuery({
    ...userSearch,
    ...emailQuery,
  })

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

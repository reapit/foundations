import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Title,
  Subtitle,
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
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
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UserModelPagedResult } from '@reapit/foundations-ts-definitions'
import { openNewPage } from '../../utils/navigation'
import ErrorBoundary from '../error-boundary'
import { useForm, UseFormWatch } from 'react-hook-form'
import { cx } from '@linaria/core'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions, StringMap } from '@reapit/utils-common'
import { FetchAuthenticators } from './fetch-authenticators'
import debounce from 'just-debounce-it'
import { DownloadUsersCSV } from './download-users-csv'

export interface UserFilters {
  email?: string
  name?: string
  mfaEnabled?: string
}

export const handleSetAdminFilters =
  (setUserSearch: Dispatch<SetStateAction<UserFilters>>, watch: UseFormWatch<UserFilters>) => () => {
    const subscription = watch(debounce(setUserSearch, 200))
    return () => subscription.unsubscribe()
  }

export const AdminPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { register, watch } = useForm<UserFilters>({ mode: 'all' })
  const organisationId = connectSession?.loginIdentity.orgId
  const queryParams = { ...objectToQuery(userSearch), organisationId } as StringMap

  const [users, usersLoading] = useReapitGet<UserModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getUsers],
    queryParams: { pageSize: 12, pageNumber, ...queryParams },
    fetchWhenTrue: [organisationId],
  })

  useEffect(handleSetAdminFilters(setUserSearch, watch), [])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Admin</Title>
        <Icon className={elMb5} icon="userAuthInfographic" iconSize="large" />
        <Subtitle>Your User Config</Subtitle>
        <SmallText hasGreyText>
          This page allows you to configure and reset the Multi Factor Authentication (MFA) devices for your
          organisation users. For more information on how to do this, please refer to the documentation link below.
        </SmallText>
        <Button className={elMb5} intent="neutral" onClick={openNewPage('')}>
          Docs
        </Button>
        <DownloadUsersCSV queryParams={queryParams} />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <ErrorBoundary>
          <Title>Users List</Title>
          <form>
            <FormLayout hasMargin>
              <InputWrap>
                <InputGroup {...register('email')} placeholder="Search for a user" label="Email" />
              </InputWrap>
              <InputWrap>
                <InputGroup {...register('name')} placeholder="Search for a user" label="Name" />
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
              <Table
                className={cx(elFadeIn, elMb11)}
                rows={users?._embedded?.map(({ id, name, email, jobTitle, inactive }) => ({
                  cells: [
                    {
                      label: 'Name',
                      value: name ?? '',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Email',
                      value: email ?? '',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Job Title',
                      value: jobTitle ?? '',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Active',
                      value: (
                        <Icon
                          icon={inactive ? 'closeSystem' : 'checkSystem'}
                          intent={inactive ? 'danger' : 'success'}
                        />
                      ),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                  ],
                  expandableContent: {
                    content: <FetchAuthenticators userId={id} />,
                  },
                }))}
              />
              <Pagination
                callback={setPageNumber}
                currentPage={pageNumber}
                numberPages={Math.ceil((users?.totalCount ?? 1) / 12)}
              />
            </>
          ) : (
            <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
              No users found based on your current search.
            </PersistentNotification>
          )}
        </ErrorBoundary>
      </PageContainer>
    </FlexContainer>
  )
}

export default AdminPage

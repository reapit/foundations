import React, { FC, useState } from 'react'
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
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UserModel, UserModelPagedResult } from '@reapit/foundations-ts-definitions'
import { openNewPage } from '../../utils/navigation'
import ErrorBoundary from '../error-boundary'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'

export interface UserFilters {
  email?: string
  name?: string
}

export const AdminPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { register, handleSubmit } = useForm<UserFilters>({ mode: 'all' })
  const organisationId = connectSession?.loginIdentity.orgId

  const [users, usersLoading] = useReapitGet<UserModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getUsers],
    queryParams: { organisationId, pageSize: 12, pageNumber, ...userSearch },
    fetchWhenTrue: [organisationId],
  })

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Admin</Title>
        <Icon className={elMb5} icon="webhooksInfographic" iconSize="large" />
        <Subtitle>Data Fetching</Subtitle>
        <SmallText hasGreyText>
          This simple example demonstrates how to fetch data from our Appointment Config service, authenticated with
          Reapit Connect using the Connect Session library. You can view the relevant docs below.
        </SmallText>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage('https://developers.reapit.cloud/api-docs/app-development/connect-session')}
        >
          Connect Session
        </Button>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage('https://developers.reapit.cloud/api-docs/api/api-documentation')}
        >
          REST API
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <ErrorBoundary>
          <Title>Users List</Title>
          <form onChange={handleSubmit(setUserSearch)}>
            <FormLayout hasMargin>
              <InputWrap>
                <InputGroup {...register('email')} placeholder="Search for a user" label="Email" />
              </InputWrap>
              <InputWrap>
                <InputGroup {...register('name')} placeholder="Search for a user" label="Name" />
              </InputWrap>
            </FormLayout>
          </form>
          {usersLoading ? (
            <Loader />
          ) : users?._embedded?.length ? (
            <>
              <Table
                className={cx(elFadeIn, elMb11)}
                rows={users?._embedded?.map((user: UserModel) => ({
                  cells: [
                    {
                      label: 'Name',
                      value: user.name ?? '',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Email',
                      value: user.email ?? '',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Active',
                      value: (
                        <Icon
                          icon={user.inactive ? 'closeSystem' : 'checkSystem'}
                          intent={user.inactive ? 'danger' : 'success'}
                        />
                      ),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                  ],
                  expandableContent: {
                    content: (
                      <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
                        Visit the dedicated apps page to perform actions on this app
                      </PersistentNotification>
                    ),
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

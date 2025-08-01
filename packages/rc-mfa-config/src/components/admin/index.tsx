import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
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
  elBorderRadius,
  Select,
  elWFull,
  BodyText,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UserInfoModel, UserModelPagedResult, UserOrganisationModel } from '@reapit/foundations-ts-definitions'
import { openNewPage } from '../../utils/navigation'
import ErrorBoundary from '../error-boundary'
import { useForm, UseFormWatch } from 'react-hook-form'
import { cx } from '@linaria/core'
import { GetActionNames, getActions, StringMap, objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import { FetchAuthenticators } from './fetch-authenticators'
import debounce from 'just-debounce-it'
import { DownloadUsersCSV } from './download-users-csv'
import { ControlsContainer } from './__styles__'

export interface UserFilters {
  email?: string
  name?: string
  mfaEnabled?: string
  active?: string
}

export const handleSetAdminFilters =
  (setUserSearch: Dispatch<SetStateAction<UserFilters>>, watch: UseFormWatch<UserFilters>) => () => {
    const subscription = watch(debounce(setUserSearch, 200))
    return () => subscription.unsubscribe()
  }

export const handleInitialUserOrgSet =
  (setOrganisationId: Dispatch<SetStateAction<string>>, orgId?: string | null) => () => {
    if (orgId) {
      setOrganisationId(orgId)
    }
  }

export const handleUserOrgChange =
  (setOrganisationId: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const orgId = event.target.value

    if (orgId) {
      setOrganisationId(orgId)
    }
  }

export const getAdminOrgs = (userOrgs: UserOrganisationModel[]) =>
  userOrgs.filter((userOrg) => {
    const groups = userOrg.groups ?? []
    const isOrgAdmin = groups.includes('OrganisationAdmin')
    const isMarketplaceAdmin = groups.includes('MarketplaceAdmin')
    const isUserAdmin = groups.includes('ReapitUserAdmin')
    return isOrgAdmin || isMarketplaceAdmin || isUserAdmin
  })

export const AdminPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [organisationId, setOrganisationId] = useState<string>('')
  const { register, watch } = useForm<UserFilters>({ mode: 'all' })
  const email = connectSession?.loginIdentity.email
  const queryParams = { ...objectToQuery(userSearch), organisationId } as StringMap

  const [userInfo, userInfoLoading] = useReapitGet<UserInfoModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserInfo],
    queryParams: { email: encodeURIComponent(email ?? '') },
    fetchWhenTrue: [email],
  })

  const [users, usersLoading] = useReapitGet<UserModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUsers],
    queryParams: { pageSize: 12, pageNumber, ...queryParams },
    fetchWhenTrue: [organisationId],
  })

  const userOrgs = userInfo?.userOrganisations ?? []
  const adminOrgs = getAdminOrgs(userOrgs)
  const hasMultiOrgs = adminOrgs.length > 1
  const orgId = adminOrgs.length === 1 ? adminOrgs[0].organisationId : null

  useEffect(handleSetAdminFilters(setUserSearch, watch), [])
  useEffect(handleInitialUserOrgSet(setOrganisationId, orgId), [orgId])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Icon className={elMb5} icon="userAuthInfographic" iconSize="large" />
        <Subtitle>Your User Config</Subtitle>
        <SmallText hasGreyText>
          This page allows you to configure and reset the Multi Factor Authentication (MFA) devices for your
          organisation users. For more information on how to do this, please refer to the documentation link below.
        </SmallText>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage(
            window.location?.hostname?.includes('.au.')
              ? 'https://help.agentboxcrm.com.au/reapit-connect'
              : 'https://reapit-1.gitbook.io/reapit-connect-mfa/',
          )}
        >
          Docs
        </Button>
        <DownloadUsersCSV queryParams={queryParams} />
        {hasMultiOrgs && (
          <div className={elMb5}>
            <Subtitle>Organisations</Subtitle>
            <SmallText hasGreyText>
              You are an admin for multiple organisations - select from the list below for data specific to one of these
              organisations
            </SmallText>
            <ControlsContainer className={elBorderRadius}>
              <InputGroup>
                <Select
                  className={elWFull}
                  value={organisationId ?? ''}
                  onChange={handleUserOrgChange(setOrganisationId)}
                >
                  <option key="default-option" value={''}>
                    Please Select
                  </option>
                  {adminOrgs?.map((option) => (
                    <option key={option.organisationId} value={option.organisationId}>
                      {option.name}
                    </option>
                  ))}
                </Select>
                <Label htmlFor="myId">Select Organisation</Label>
              </InputGroup>
            </ControlsContainer>
          </div>
        )}
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
            </FormLayout>
          </form>
          {usersLoading || userInfoLoading ? (
            <Loader />
          ) : users?._embedded?.length ? (
            <>
              <BodyText>Total Users: {users?.totalCount}</BodyText>
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
                      value: <Icon icon={inactive ? 'close' : 'check'} intent={inactive ? 'danger' : 'success'} />,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                  ],
                  expandableContent: {
                    content: <FetchAuthenticators userId={id} name={name} />,
                  },
                }))}
              />
              <Pagination
                callback={setPageNumber}
                currentPage={pageNumber}
                numberPages={Math.ceil((users?.totalCount ?? 1) / 12)}
              />
            </>
          ) : !organisationId ? (
            <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
              Please select an organisation from the left hand side before proceeding.
            </PersistentNotification>
          ) : (
            <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
              No users found based on your current search.
            </PersistentNotification>
          )}
        </ErrorBoundary>
      </PageContainer>
    </FlexContainer>
  )
}

export default AdminPage

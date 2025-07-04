import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  Grid,
  Loader,
  PersistentNotification,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  elMb7,
  useModal,
} from '@reapit/elements'
import { DisplayChip, threeColTable } from './__styles__'
import {
  GetActionNames,
  SendFunction,
  UpdateActionNames,
  getActions,
  updateActions,
  useReapitGet,
  useReapitUpdate,
} from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  AuthenticatorModel,
  EmailSuppressionModel,
  GroupModelPagedResult,
  UpdateUserModel,
  UserInfoModel,
  UserModel,
} from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { getIsAdmin } from '../../utils/is-admin'
import { ActiveAuthenticator } from './active-authenticator'
import { EditUserGroups } from './edit-user-groups'
import { UpdateUserName } from './update-user-name'
import { ViewOrganisations } from './view-organisations'
import { UpdateUserActive } from './update-user-active'
import { UserStatusHistory } from './user-status-history'

export interface UserContentProps {
  user: UserModel
  userGroups: GroupModelPagedResult | null
  refreshUsers: () => void
}

export interface ShouldFetchState {
  authenticators?: boolean
  password?: boolean
  suppressionList?: boolean
  officeGroups?: boolean
  loginLogs?: boolean
  userGroups?: boolean
}

export const handleUpdateUserStatus =
  (updateUser: SendFunction<UpdateUserModel, boolean>, user: UserModel, refreshUsers: () => void) =>
  async (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const isUpdated = await updateUser({ ...(user as UpdateUserModel), inactive: !isChecked })
    if (isUpdated) {
      refreshUsers()
    }
  }

export const handleShouldFetch =
  (setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>, shouldFetchState: ShouldFetchState) => () => {
    setShouldFetch(shouldFetchState)
  }

export const handleResetPassword =
  (
    deleteUserPassword: SendFunction<void, boolean>,
    refreshUsers: () => void,
    setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>,
  ) =>
  async () => {
    const hasReset = await deleteUserPassword()

    if (hasReset) {
      refreshUsers()
      setShouldFetch({})
    }
  }

export const handleEmailSuppressionList =
  (
    removeFromSuppressionList: SendFunction<void, boolean>,
    refreshUsers: () => void,
    setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>,
  ) =>
  async () => {
    const hasBeenRemoved = await removeFromSuppressionList()

    if (hasBeenRemoved) {
      refreshUsers()
      setShouldFetch({})
    }
  }

export const UserContent: FC<UserContentProps> = ({ user, refreshUsers, userGroups }) => {
  const [shouldFetch, setShouldFetch] = useState<ShouldFetchState>({})
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { isSupport, isFoundationsAdmin } = getIsAdmin(connectSession)
  const { Modal } = useModal()

  const [authenticators, authenticatorsLoading, , refreshAuthenticators] = useReapitGet<AuthenticatorModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserAuthenticators],
    uriParams: { userId: user.id },
    fetchWhenTrue: [user.id, shouldFetch.authenticators],
  })

  const [userInfo, userInfoLoading] = useReapitGet<UserInfoModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserInfo],
    queryParams: { email: encodeURIComponent(user.email ?? ''), includeIdpData: true },
    fetchWhenTrue: [user.email, shouldFetch.officeGroups || shouldFetch.loginLogs],
  })

  const [userSuppressionList, userSuppressionListLoading] = useReapitGet<EmailSuppressionModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserSuppressionList],
    uriParams: { userId: user.id },
    fetchWhenTrue: [user.id, shouldFetch.suppressionList],
    onError: () => {
      // suppress error
    },
  })

  const [userPasswordLoading, , deleteUserPassword] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteUserPassword],
    method: 'DELETE',
    uriParams: {
      userId: user.id,
    },
  })

  const [userSuppressionListDeleteLoading, , deleteUserSuppressionList] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteUserSuppressionList],
    method: 'DELETE',
    uriParams: {
      userId: user.id,
    },
  })

  const activeAuthenticator = authenticators?.find((authenticator) => authenticator.status === 'active')
  const isLoading =
    authenticatorsLoading ||
    userPasswordLoading ||
    userSuppressionListLoading ||
    userSuppressionListDeleteLoading ||
    userInfoLoading

  return (
    <ErrorBoundary>
      <Grid className={elMb7}>
        <Col>
          <Subtitle>Groups</Subtitle>
          <BodyText hasGreyText>
            {user?.groups?.sort().map((group, index) => <DisplayChip key={index}>{group!}</DisplayChip>)}
          </BodyText>
        </Col>
        <Col>
          <Subtitle>User Claims</Subtitle>
          <BodyText hasGreyText>
            {user.userClaims?.map(({ claim, value }, index) => {
              if (claim?.includes('payrollNumber')) return null
              return (
                <DisplayChip key={index}>
                  {claim}: {value}
                </DisplayChip>
              )
            })}
          </BodyText>
        </Col>
        <Col>
          <Subtitle>Organisation Claims</Subtitle>
          <BodyText>
            {user.organisationClaims?.map(({ claim, value }, index) => {
              if (claim?.includes('EmailHeader')) return null
              return (
                <DisplayChip key={index}>
                  {claim}: {value}
                </DisplayChip>
              )
            })}
          </BodyText>
        </Col>
        <Col>
          <Subtitle>Status</Subtitle>
          {isSupport ? (
            <>
              <BodyText hasGreyText>{user.inactive ? 'Inactive' : 'Active'}</BodyText>
              <ButtonGroup>
                <UpdateUserActive user={user} />
                <UserStatusHistory user={user} />
              </ButtonGroup>
            </>
          ) : (
            <BodyText hasGreyText>{user.inactive ? 'Inactive' : 'Active'}</BodyText>
          )}
        </Col>
        <Col>
          <Subtitle>Password</Subtitle>
          <BodyText hasGreyText>
            <Button intent="primary" onClick={handleShouldFetch(setShouldFetch, { password: true })}>
              Reset Password
            </Button>
          </BodyText>
        </Col>
        <Col>
          <Subtitle>Suppression List</Subtitle>
          <BodyText hasGreyText>
            <Button
              intent="primary"
              loading={userSuppressionListLoading}
              disabled={!isSupport || userSuppressionListLoading}
              onClick={handleShouldFetch(setShouldFetch, { suppressionList: true })}
            >
              Check
            </Button>
          </BodyText>
        </Col>
        <Col>
          <Subtitle>Office Groups</Subtitle>
          <BodyText hasGreyText>
            <Button
              loading={userInfoLoading && shouldFetch.officeGroups}
              intent="primary"
              disabled={userInfoLoading && shouldFetch.officeGroups}
              onClick={handleShouldFetch(setShouldFetch, { officeGroups: true })}
            >
              Check
            </Button>
          </BodyText>
        </Col>
        <Col>
          <Subtitle>Login Info</Subtitle>
          <BodyText hasGreyText>
            <Button
              loading={userInfoLoading && shouldFetch.loginLogs}
              intent="primary"
              disabled={!isSupport || (userInfoLoading && shouldFetch.loginLogs)}
              onClick={handleShouldFetch(setShouldFetch, { loginLogs: true })}
            >
              Check
            </Button>
          </BodyText>
        </Col>
        <Col>
          <Subtitle>MFA Authenticators</Subtitle>
          <ButtonGroup alignment="left">
            <Button
              intent="primary"
              loading={authenticatorsLoading}
              disabled={!isSupport || Boolean(authenticatorsLoading || authenticators)}
              onClick={handleShouldFetch(setShouldFetch, { authenticators: true })}
            >
              Fetch Current Authenticators
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Subtitle>Manage User Groups</Subtitle>
          <ButtonGroup alignment="left">
            <Button
              intent="primary"
              disabled={(!isSupport && !isFoundationsAdmin) || !userGroups}
              onClick={handleShouldFetch(setShouldFetch, { userGroups: true })}
            >
              Load Group Management
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Subtitle>Update Name</Subtitle>
          <UpdateUserName user={user} />
        </Col>
        <Col>
          <Subtitle>Organisations</Subtitle>
          <ViewOrganisations user={user} />
        </Col>
      </Grid>
      {isLoading && <Loader />}
      {activeAuthenticator && isSupport && shouldFetch.authenticators ? (
        <ActiveAuthenticator activeAuthenticator={activeAuthenticator} refreshAuthenticators={refreshAuthenticators} />
      ) : shouldFetch.authenticators ? (
        <PersistentNotification isFullWidth isExpanded isInline intent="primary">
          No authenticators configured for this user.
        </PersistentNotification>
      ) : null}
      {userInfo && shouldFetch.officeGroups && userInfo.officeGroupIds ? (
        <>
          <Table>
            <TableHeadersRow className={threeColTable}>
              <TableHeader>Group Name</TableHeader>
              <TableHeader>Office Group Id</TableHeader>
              <TableHeader>Office Ids</TableHeader>
            </TableHeadersRow>
            <TableRow className={threeColTable}>
              <TableCell>{userInfo.officeGroupName}</TableCell>
              <TableCell>{userInfo.officeGroupId}</TableCell>
              <TableCell>{userInfo.officeGroupIds}</TableCell>
            </TableRow>
          </Table>
        </>
      ) : shouldFetch.officeGroups ? (
        <PersistentNotification isFullWidth isExpanded isInline intent="primary">
          User not part of an office group.
        </PersistentNotification>
      ) : null}
      {userInfo && shouldFetch.loginLogs && userInfo.idpData?.authEvents?.length ? (
        userInfo.idpData?.authEvents.slice(0, 5).map((event) => <DisplayChip key={event}>{event}</DisplayChip>)
      ) : shouldFetch.loginLogs ? (
        <PersistentNotification isFullWidth isExpanded isInline intent="primary">
          No info available for this user.
        </PersistentNotification>
      ) : null}
      {shouldFetch.userGroups && <EditUserGroups refreshUsers={refreshUsers} user={user} userGroups={userGroups} />}
      {shouldFetch.password && (
        <Modal title="Confirm reset user password" isOpen={Boolean(shouldFetch.password)}>
          <BodyText>Are you sure you wish to reset this user password?</BodyText>
          <ButtonGroup alignment="center">
            <Button
              intent="danger"
              disabled={userPasswordLoading}
              onClick={handleResetPassword(deleteUserPassword, refreshUsers, setShouldFetch)}
            >
              Reset Password
            </Button>
            <Button intent="default" onClick={handleShouldFetch(setShouldFetch, {})}>
              Cancel
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      {shouldFetch.suppressionList && !userSuppressionListLoading && (
        <Modal title="User Email Suppression List" isOpen={Boolean(shouldFetch.suppressionList)}>
          {userSuppressionList ? (
            <BodyText>User is on the email suppression list - you can remove them below</BodyText>
          ) : (
            <BodyText>User is not on the email suppression list</BodyText>
          )}
          <ButtonGroup alignment="center">
            {userSuppressionList && (
              <Button
                intent="primary"
                disabled={userSuppressionListDeleteLoading}
                onClick={handleEmailSuppressionList(deleteUserSuppressionList, refreshUsers, setShouldFetch)}
              >
                Remove from list
              </Button>
            )}
            <Button intent="default" onClick={handleShouldFetch(setShouldFetch, {})}>
              Cancel
            </Button>
          </ButtonGroup>
        </Modal>
      )}
    </ErrorBoundary>
  )
}

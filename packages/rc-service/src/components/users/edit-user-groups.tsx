import React, { FC, useCallback } from 'react'
import {
  UserModel,
  GroupModelPagedResult,
  GroupModel,
  RemoveGroupMembershipModel,
  CreateGroupMembershipModel,
} from '@reapit/foundations-ts-definitions'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  FormLayout,
  InputWrapFull,
  MultiSelectInput,
  MultiSelectOption,
  PersistentNotification,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { SendFunction, UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export interface EditUserGroupsProps {
  refreshUsers: () => void
  user: UserModel
  userGroups: GroupModelPagedResult | null
  orgId: string
  closeModal?: () => void
}

interface UpdateUserModel {
  groupIds: string
}

export const sortAddRemoveGroups = (user: UserModel, groupIds: string) => {
  const currentGroups = user.groups ?? []
  const removeIds = currentGroups.filter((group) => !groupIds.includes(group)).filter(Boolean)
  const addIds = groupIds
    .split(',')
    .filter((group) => !currentGroups.includes(group))
    .filter(Boolean)

  return {
    removeIds,
    addIds,
  }
}

export const prepareUserGroupOptions: (data: GroupModel[]) => MultiSelectOption[] = (data) =>
  data.sort().map((userGroup: GroupModel) => {
    const { id } = userGroup

    return {
      value: id,
      name: id,
    } as MultiSelectOption
  })

export const onHandleSubmit =
  (
    refreshUsers: () => void,
    user: UserModel,
    removeMemberFromGroup: SendFunction<RemoveGroupMembershipModel, boolean>,
    addMemberToGroup: SendFunction<CreateGroupMembershipModel, boolean>,
    organisationId: string,
  ) =>
  async (params: UpdateUserModel) => {
    const { groupIds } = params
    const { id: userId } = user
    if (!user || !userId) return null

    const { removeIds, addIds } = sortAddRemoveGroups(user, groupIds)
    const totalUpdates = removeIds.length + addIds.length

    const updateUserRes = await Promise.all([
      ...removeIds.map((groupId) => removeMemberFromGroup({ organisationId }, { uriParams: { groupId } })),
      ...addIds.map((groupId) => addMemberToGroup({ organisationId, userId }, { uriParams: { groupId } })),
    ])

    const positiveResponses = updateUserRes.filter((res) => Boolean(res))

    if (positiveResponses && positiveResponses.length === totalUpdates) {
      return refreshUsers()
    }
  }

export const EditUserGroups: FC<EditUserGroupsProps> = ({ refreshUsers, user, userGroups, orgId, closeModal }) => {
  const [removeMemberFromGroupLoading, , removeMemberFromGroup] = useReapitUpdate<RemoveGroupMembershipModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.removeMemberFromGroup],
    method: 'DELETE',
    uriParams: {
      userId: user.id,
    },
  })

  const [addMemberToGroupLoading, , addMemberToGroup] = useReapitUpdate<CreateGroupMembershipModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.addMemberToGroup],
    method: 'POST',
  })

  const onSubmit = useCallback(onHandleSubmit(refreshUsers, user, removeMemberFromGroup, addMemberToGroup, orgId), [
    user,
    orgId,
  ])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ groupIds: string }>({
    defaultValues: {
      groupIds: user.userGroups ? user.userGroups.filter((ug) => ug.organisationId === orgId).join(',') : '',
    },
  })

  const userGroupOptions = prepareUserGroupOptions(userGroups?._embedded ?? [])
  const isLoading = removeMemberFromGroupLoading || addMemberToGroupLoading

  if (!userGroups) return null

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BodyText hasGreyText>Please use the section below to manage which groups this user belongs to:</BodyText>
      <FormLayout hasMargin className={elFadeIn}>
        <InputWrapFull>
          <MultiSelectInput
            id={`user-groups-ids-${user.id}`}
            noneSelectedLabel="No groups selected for this user"
            defaultValues={user.groups ? [...new Set(user.groups)] : []}
            options={userGroupOptions}
            {...register('groupIds')}
          />
          {errors.groupIds && (
            <PersistentNotification isFullWidth isExpanded intent="danger" isInline>
              {errors.groupIds.message}
            </PersistentNotification>
          )}
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="right">
        <Button intent="primary" type="submit" disabled={isLoading} loading={isLoading}>
          Submit
        </Button>
        <Button intent="secondary" type="button" onClick={closeModal}>
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  )
}

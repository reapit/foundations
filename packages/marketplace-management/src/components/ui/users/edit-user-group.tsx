import React, { FC } from 'react'
import useSWR from 'swr'
import {
  GroupMembershipModelPagedResult,
  GroupModel,
  UserModel,
  UserModelPagedResult,
} from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { addMemberToGroup, removeMemberFromGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  elMb11,
  elP8,
  FormLayout,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
  PersistantNotification,
  Subtitle,
  useSnack,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import { useForm } from 'react-hook-form'

export interface EditUserGroupFormProps {
  userGroup: GroupModel
  onComplete: () => void
  orgId: string
}

interface UpdateUserGroupModel {
  userIds: string
}

export const prepareGroupOptions = (data: GroupModel[]): MultiSelectOption[] =>
  data.map((userGroupGroup: UserModel) => {
    const { id, name } = userGroupGroup

    return {
      value: id,
      name: name,
    } as MultiSelectOption
  })

const addUserToGroup = async (id: string, userId: string) => {
  const addUserRes = await addMemberToGroup({ id, userId })
  return addUserRes
}

const removeUserFromGroup = async (id: string, userId: string) => {
  const removeUserRes = await removeMemberFromGroup({ id, userId })
  return removeUserRes
}

export const onHandleSubmit =
  (
    onComplete: () => void,
    refetchMembers: () => void,
    success: (message: string) => void,
    error: (message: string) => void,
    originalUserIds: string[],
    userGroupId: string,
  ) =>
  async ({ userIds }: UpdateUserGroupModel) => {
    const newUserIds = userIds.split(',')
    const idsToRemmove = originalUserIds.filter((id) => !newUserIds.includes(id))
    const idsToAdd = newUserIds.filter((id) => !originalUserIds.includes(id))

    for (const user of idsToAdd) {
      const addUserRes = await addUserToGroup(userGroupId, user)
      if (!addUserRes) {
        return error(toastMessages.FAILED_TO_EDIT_USER_GROUP)
      }
    }

    for (const user of idsToRemmove) {
      const removeUserRes = await removeUserFromGroup(userGroupId, user)
      if (!removeUserRes) {
        return error(toastMessages.FAILED_TO_EDIT_USER_GROUP)
      }
    }

    success(toastMessages.CHANGES_SAVE_SUCCESS)

    onComplete()
    refetchMembers()
  }

export const EditUserGroupForm: FC<EditUserGroupFormProps> = ({ userGroup, onComplete, orgId }) => {
  const id = userGroup?.id
  const { success, error } = useSnack()

  const { data } = useSWR<UserModelPagedResult | undefined>(`${URLS.USERS}?pageSize=999&organisationId=${orgId}`)

  const { data: members, mutate: refetchMembers } = useSWR<GroupMembershipModelPagedResult | undefined>(
    id && orgId ? `${URLS.USERS_GROUPS}/${id}/members?pageSize=999&organisationId=${orgId}` : null,
  )

  const groupMembers = members?._embedded ?? []
  const listUserGroup = data?._embedded ?? []

  const userIds = groupMembers.map((member) => member.id ?? '').filter(Boolean)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ userIds: string }>({
    defaultValues: {
      userIds: '',
    },
  })

  if (!data || !members) return <Loader />

  const onSubmit = onHandleSubmit(onComplete, refetchMembers, success, error, userIds, userGroup.id ?? '')

  const userGroupGroupOptions = prepareGroupOptions(listUserGroup)

  return (
    <form className={elP8} onSubmit={handleSubmit(onSubmit)}>
      <FormLayout className={cx(elFadeIn, elMb11)}>
        <InputWrapFull>
          <Subtitle>Edit User Group</Subtitle>
          <BodyText hasGreyText>
            The list below contains all available member groups for your organisation. You can manage users associated
            to each group by selecting them from the list below.
          </BodyText>
        </InputWrapFull>
        <InputWrapFull>
          <MultiSelectInput
            id={`user-groups-ids-${userGroup.id}`}
            noneSelectedLabel="No users selected for this group"
            defaultValues={[...new Set(userIds)]}
            options={userGroupGroupOptions}
            {...register('userIds')}
          />
          {errors.userIds && (
            <PersistantNotification isFullWidth isExpanded intent="danger" isInline>
              {errors.userIds.message}
            </PersistantNotification>
          )}
        </InputWrapFull>
        <InputWrapFull>
          <ButtonGroup alignment="right">
            <Button intent="secondary" onClick={onComplete} type="button">
              Cancel
            </Button>
            <Button intent="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </form>
  )
}

export default EditUserGroupForm

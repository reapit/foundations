import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import {
  GroupMembershipModel,
  GroupMembershipModelPagedResult,
  GroupModel,
  UserModel,
  UserModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { URLS } from '../../../constants/api'
import { addMemberToGroup, removeMemberFromGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  elP8,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
  PersistentNotification,
  Subtitle,
  useSnack,
} from '@reapit/elements'
import { useForm, UseFormGetValues } from 'react-hook-form'
import debounce from 'just-debounce-it'

export interface EditUserGroupFormProps {
  userGroup: GroupModel
  onComplete: () => void
  orgId: string
}

export interface UpdateUserGroupModel {
  userIds: string
}

export interface EditUserGroupSchema {
  userIds: string
}

export const prepareGroupOptions = (data: MultiSelectOption[]): MultiSelectOption[] =>
  data.sort((a, b) => {
    const nameA = a.name?.toLowerCase()
    const nameB = b.name?.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

const addUserToGroup = async (id: string, userId: string, organisationId: string) => {
  const addUserRes = await addMemberToGroup({ id, userId, organisationId })
  return addUserRes
}

const removeUserFromGroup = async (id: string, userId: string, organisationId: string) => {
  const removeUserRes = await removeMemberFromGroup({ id, userId, organisationId })
  return removeUserRes
}

export const handleSetOptions =
  (
    defaultUserIds: string[],
    users: UserModel[],
    groupMembers: GroupMembershipModel[],
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
    getValues: UseFormGetValues<EditUserGroupSchema>,
  ) =>
  () => {
    const userIds = getValues().userIds ?? defaultUserIds.join(',')

    if (userIds && users && groupMembers) {
      const userOptions = users.map(({ id, name }) => ({ value: id, name }))
      const groupOptions = groupMembers.map(({ id, name }) => ({ value: id, name }))
      const options = [...userOptions, ...groupOptions]

      const uniqueOptions = [...new Set([...options.map((option) => JSON.stringify(option))])].map((jsonOption) =>
        JSON.parse(jsonOption),
      )
      const officeOptions = prepareGroupOptions(uniqueOptions)
      setOptions(officeOptions)
    }
  }

export const onHandleSubmit =
  (
    onComplete: () => void,
    refetchMembers: () => void,
    success: (message: string) => void,
    error: (message: string) => void,
    originalUserIds: string[],
    userGroupId: string,
    organisationId: string,
  ) =>
  async ({ userIds }: UpdateUserGroupModel) => {
    const newUserIds = userIds.split(',').filter(Boolean)
    const idsToRemmove = originalUserIds.filter((id) => !newUserIds.includes(id))
    const idsToAdd = newUserIds.filter((id) => !originalUserIds.includes(id))

    for (const user of idsToAdd) {
      const addUserRes = await addUserToGroup(userGroupId, user, organisationId)
      if (!addUserRes) {
        return error(toastMessages.FAILED_TO_EDIT_USER_GROUP)
      }
    }

    for (const user of idsToRemmove) {
      const removeUserRes = await removeUserFromGroup(userGroupId, user, organisationId)
      if (!removeUserRes) {
        return error(toastMessages.FAILED_TO_EDIT_USER_GROUP)
      }
    }

    success(toastMessages.CHANGES_SAVE_SUCCESS)

    onComplete()
    // Set timeout as a workaround for RDS replication error.
    setTimeout(() => {
      refetchMembers()
    }, 1000)
  }

export const EditUserGroupForm: FC<EditUserGroupFormProps> = ({ userGroup, onComplete, orgId }) => {
  const [search, setSearch] = useState<string>('')
  const [options, setOptions] = useState<MultiSelectOption[]>([])
  const { success, error } = useSnack()
  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value), 500),
    [500],
  )
  const id = userGroup?.id
  const { data } = useSWR<UserModelPagedResult | undefined>(
    !orgId || !search ? null : `${URLS.USERS}?pageSize=999&organisationId=${orgId}&name=${search}`,
  )

  const { data: members, mutate: refetchMembers } = useSWR<GroupMembershipModelPagedResult | undefined>(
    id && orgId ? `${URLS.USERS_GROUPS}/${id}/members?pageSize=999&organisationId=${orgId}` : null,
  )

  const groupMembers = members?._embedded ?? []
  const users = data?._embedded ?? []

  const userIds = groupMembers.map((member) => member.id ?? '').filter(Boolean)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<EditUserGroupSchema>({
    defaultValues: {
      userIds: userIds.join(','),
    },
  })

  const onSubmit = onHandleSubmit(onComplete, refetchMembers, success, error, userIds, userGroup.id ?? '', orgId)

  useEffect(handleSetOptions(userIds, users, groupMembers, setOptions, getValues), [members, data])

  if (!members) return <Loader />

  return (
    <form className={elP8} onSubmit={handleSubmit(onSubmit)}>
      <Subtitle>Edit User Group</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        The list below contains all available member groups for your organisation. You can manage users associated to
        each group by selecting them from the list below.
      </BodyText>
      <FormLayout hasMargin className={elFadeIn}>
        <InputWrapFull>
          <InputGroup onChange={debouncedSearch} icon="searchSystem" placeholder="Search" label="Users" />
          <MultiSelectInput
            id={`user-groups-ids-${userGroup.id}`}
            noneSelectedLabel="No users selected for this group"
            defaultValues={[...new Set(userIds)]}
            options={options}
            {...register('userIds')}
          />
          {errors.userIds && (
            <PersistentNotification isFullWidth isExpanded intent="danger" isInline>
              {errors.userIds.message}
            </PersistentNotification>
          )}
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="right">
        <Button intent="secondary" onClick={onComplete} type="button">
          Cancel
        </Button>
        <Button intent="primary" type="submit">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
}

export default EditUserGroupForm

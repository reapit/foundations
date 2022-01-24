import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
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
  InputGroup,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
  PersistantNotification,
  Subtitle,
  useSnack,
} from '@reapit/elements'
import { cx } from '@linaria/core'
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

interface EditUserGroupSchema {
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

export const handleSetOptions =
  (
    defaultUserIds: string[],
    users: UserModel[],
    search: string,
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
    getValues: UseFormGetValues<EditUserGroupSchema>,
  ) =>
  () => {
    const userIds = getValues().userIds ?? defaultUserIds.join(',')
    if (userIds && users) {
      const options = users.filter((user) => {
        const isSelectedUser = user.id && userIds.includes(user.id)
        const isSearchedUser = search && user.name?.toLowerCase().includes(search.toLowerCase())

        return isSelectedUser || isSearchedUser
      })

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
  ) =>
  async ({ userIds }: UpdateUserGroupModel) => {
    const newUserIds = userIds.split(',').filter(Boolean)
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
  const [search, setSearch] = useState<string>('')
  const [options, setOptions] = useState<MultiSelectOption[]>([])
  const { success, error } = useSnack()
  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value), 500),
    [500],
  )
  const id = userGroup?.id
  const { data } = useSWR<UserModelPagedResult | undefined>(
    !orgId ? null : `${URLS.USERS}?pageSize=999&organisationId=${orgId}`,
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

  const onSubmit = onHandleSubmit(onComplete, refetchMembers, success, error, userIds, userGroup.id ?? '')

  useEffect(handleSetOptions(userIds, users, search, setOptions, getValues), [members, data, search])

  if (!members || !data) return <Loader label="Loading" />

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
          <InputGroup onChange={debouncedSearch} icon="searchSystem" placeholder="Search" label="Users" />
          <MultiSelectInput
            id={`user-groups-ids-${userGroup.id}`}
            noneSelectedLabel="No users selected for this group"
            defaultValues={[...new Set(userIds)]}
            options={options}
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

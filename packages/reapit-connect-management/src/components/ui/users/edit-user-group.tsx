import React from 'react'
import useSWR from 'swr'
import { FormFieldInfo } from '@reapit/utils'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  DropdownSelect,
  Loader,
  SelectOption,
  notification,
} from '@reapit/elements'
import {
  GroupMembershipModelPagedResult,
  GroupModel,
  UserModel,
  UserModelPagedResult,
} from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { addMemberToGroup, removeMemberFromGroup } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'

export interface UpdateUserGroupModalProps {
  editingUserGroup: GroupModel | undefined
  setEditingUserGroup: React.Dispatch<React.SetStateAction<GroupModel | undefined>>
  onRefetchData: () => void
}

interface UpdateUserGroupModel {
  userId: string[]
}

type FieldType = 'groupIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  groupIds: {
    name: 'userId',
    label: 'Group Members',
  },
}

export const prepareGroupOptions: (data: GroupModel[]) => SelectOption[] = (data: UserModel[]) =>
  data.map((userGroupGroup: UserModel) => {
    const { id, name } = userGroupGroup

    return {
      label: name,
      value: id,
      description: userGroupGroup.name,
    } as SelectOption
  })

const addUserToGroup = async (id: string, userId: string) => {
  const addUserRes = await addMemberToGroup({ id, userId })
  return addUserRes
}

const removeUserFromGroup = async (id: string, userId: string) => {
  const removeUserRes = await removeMemberFromGroup({ id, userId })
  return removeUserRes
}

export const onHandleSubmit = (
  handleOnClose: () => void,
  onRefetchData: () => void,
  mutate: () => void,
  editingUserGroup?: GroupModel,
  initMembers?: string[],
) => async (params: UpdateUserGroupModel) => {
  const id = editingUserGroup?.id || ''
  const userId = params.userId
  const members = initMembers ?? []
  const newUserIds: string[] = userId.filter((item: string) => !members.includes(item))
  const removeUser: string[] = members.filter((item: string) => !userId.includes(item))

  for (const user of newUserIds) {
    const addUserRes = await addUserToGroup(id, user)
    if (!addUserRes) {
      return notification.error({
        message: toastMessages.FAILED_TO_EDIT_USER_GROUP,
        placement: 'bottomRight',
      })
    }
  }

  for (const user of removeUser) {
    const removeUserRes = await removeUserFromGroup(id, user)
    if (!removeUserRes) {
      return notification.error({
        message: toastMessages.FAILED_TO_EDIT_USER_GROUP,
        placement: 'bottomRight',
      })
    }
  }

  notification.success({
    message: toastMessages.CHANGES_SAVE_SUCCESS,
    placement: 'bottomRight',
  })
  handleOnClose()
  mutate()
  return onRefetchData()
}

export const UpdateUserGroupModal: React.FC<UpdateUserGroupModalProps> = ({
  editingUserGroup,
  setEditingUserGroup,
  onRefetchData,
}) => {
  const id = editingUserGroup?.id
  const handleOnClose = () => setEditingUserGroup(undefined)
  const { groupIds } = formFields

  const { data } = useSWR<UserModelPagedResult | undefined>(`${URLS.USERS}`)

  const { data: groupMembers, mutate } = useSWR<GroupMembershipModelPagedResult | undefined>(
    id ? `${URLS.USERS_GROUPS}/${id}/members` : null,
  )

  if (!editingUserGroup) return null
  if (!data) return <Loader />
  if (!groupMembers) return <Loader />
  const { _embedded: listUserGroup } = data
  const { _embedded: listUserGroupMember } = groupMembers
  const initMembers = listUserGroupMember?.map((member: UserModel) => member.id).filter(member => !!member) as string[]
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, mutate, editingUserGroup, initMembers)

  const UserGroupGroupOptions = prepareGroupOptions(listUserGroup ?? [])

  return (
    <ModalV2
      visible={!!editingUserGroup}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingUserGroup.id}`}
      zIndex={90}
    >
      <p>
        <i>
          The list below contains all available member groups for your organisation. You can manage users associated to
          each group by selecting ‘Manage’
        </i>
      </p>
      <Formik
        initialValues={{
          userId: initMembers,
        }}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <DropdownSelect
                  mode="multiple"
                  id={groupIds.name}
                  placeholder="Please select"
                  name={groupIds.name}
                  labelText={groupIds.label}
                  options={UserGroupGroupOptions}
                  filterOption={true}
                  optionFilterProp="children"
                />
              </Section>
              <Section isFlex hasPadding={false} hasMargin={false}>
                <Button variant="info" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="info" loading={false} type="submit">
                  Save
                </Button>
              </Section>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default UpdateUserGroupModal
